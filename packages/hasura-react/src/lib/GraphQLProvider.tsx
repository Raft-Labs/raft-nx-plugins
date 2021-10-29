import { useAuth } from '@raftlabs/hbp-react';
import { Auth } from '@raftlabs/hbp-sdk';
import { Client as WSClient, createClient as createWSClient } from 'graphql-ws';
import React, { useEffect, useRef, useState } from 'react';
import {
  Client,
  createClient,
  defaultExchanges,
  Provider,
  subscriptionExchange,
} from 'urql';

const createGQLClient = (url: string, auth: Auth) => {
  const subscriptionClient = createWSClient({
    url: url.replace('http://', 'ws://').replace('https://', 'wss://'),
    connectionParams: () => {
      const token = auth.getJWTToken();

      return {
        headers: token ? { authorization: `Bearer ${token}` } : undefined,
      };
    },
  });

  return {
    client: createClient({
      url,
      exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
          forwardSubscription: (operation) => {
            return {
              subscribe: (sink) => ({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                unsubscribe: subscriptionClient.subscribe(operation, sink),
              }),
            };
          },
        }),
      ],
      fetchOptions: () => {
        const token = auth.getJWTToken();
        return {
          headers: token ? { authorization: `Bearer ${token}` } : undefined,
        };
      },
    }),
    _sub: subscriptionClient,
  };
};

export interface GraphQLProviderProps {
  children: React.ReactNode;
  auth: Auth;
  url: string;
}

export const GraphQLProvider = ({
  children,
  auth,
  url,
}: GraphQLProviderProps) => {
  const ref = useRef<{ client: Client; _sub: WSClient }>();
  const { client } = ref.current || ({} as any);
  const [, render] = useState({});
  const { signedIn } = useAuth();

  useEffect(() => {
    const r = createGQLClient(url, auth);
    ref.current = r;
    const { _sub } = r;
    render({});
    return () => {
      _sub?.dispose();
    };
  }, [signedIn, auth, url]);

  if (!client) return null;

  return <Provider value={client}>{children}</Provider>;
};
