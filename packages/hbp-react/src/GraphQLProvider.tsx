import { Auth } from '@raftlabs/hbp-sdk';
import React, { useEffect, useRef, useState } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {
  Client,
  createClient,
  defaultExchanges,
  errorExchange,
  Provider,
  subscriptionExchange,
} from 'urql';
import { useAuth } from './hooks/use-auth.hook';

const createGQLClient = (
  url: string,
  auth: Auth,
  errorHandler,
  additionalHeaders = {}
) => {
  const subscriptionClient = (process as any).browser
    ? new SubscriptionClient(
        url.replace('http://', 'ws://').replace('https://', 'wss://'),
        {
          connectionParams: () => {
            const token = auth.getJWTToken();

            const headers = {
              ...additionalHeaders,
            };

            if (token) {
              headers['authorization'] = `Bearer ${token}`;
            }
            return {
              headers,
            };
          },
          reconnect: true,
        }
      )
    : null;

  const [dedupExchange, cacheExchange, fetchExchange] = defaultExchanges;

  return {
    client: createClient({
      url,
      exchanges: [
        dedupExchange,
        cacheExchange,
        // order of exchange is important, error exhange should come before fetchExchange
        errorExchange({
          onError(error, operation) {
            if (errorHandler) {
              errorHandler(error, operation);
            }
          },
        }),
        fetchExchange,
        subscriptionExchange({
          forwardSubscription(operation) {
            return subscriptionClient.request(operation);
          },
        }),
      ],
      fetchOptions: () => {
        const token = auth.getJWTToken();

        const headers = {
          ...additionalHeaders,
        };

        if (token) {
          headers['authorization'] = `Bearer ${token}`;
        }
        return {
          headers,
        };
      },
    }),
    _sub: subscriptionClient,
  };
};

interface GraphQLProviderProps {
  children: React.ReactNode;
  auth: Auth;
  url: string;
  errorHandler?: (arg1: any, arg2: any) => void;
  additionalHeaders?: Record<string, unknown>;
}

export const GraphQLProvider = ({
  children,
  auth,
  url,
  errorHandler,
  additionalHeaders,
}: GraphQLProviderProps) => {
  const ref = useRef<{ client: Client; _sub: SubscriptionClient }>();
  const { client } = ref.current || ({} as any);
  const [, render] = useState({});
  const { signedIn } = useAuth();

  useEffect(() => {
    const r = createGQLClient(url, auth, errorHandler, additionalHeaders);
    ref.current = r;
    const { _sub } = r;
    render({});
    return () => {
      _sub?.close();
    };
  }, [signedIn, auth, url, additionalHeaders]);

  if (!client) return null;

  return <Provider value={client}>{children}</Provider>;
};
