export interface UserConfig {
  baseURL: string;
  useCookies?: boolean;
  refreshIntervalTime?: number | null;
  clientStorage?: ClientStorage;
  clientStorageType?: string;
  autoLogin?: boolean;
  ssr?: boolean;
  refreshTokenName?: string;
}

export interface AuthConfig {
  baseURL: string;
  useCookies: boolean;
  refreshIntervalTime: number | null;
  clientStorage: ClientStorage;
  clientStorageType: string;
  ssr?: boolean;
  autoLogin: boolean;
  refreshTokenName: string;
}

export interface StorageConfig {
  baseURL: string;
  useCookies: boolean;
}

export interface ClientStorage {
  // custom
  // localStorage
  // AsyncStorage
  // https://react-native-community.github.io/async-storage/docs/usage
  setItem?: (key: string, value: string) => void;
  getItem?: (key: string) => any;
  removeItem?: (key: string) => void;

  // capacitor
  set?: (options: { key: string; value: string }) => void;
  get?: (options: { key: string }) => any;
  remove?: (options: { key: string }) => void;

  // expo-secure-storage
  setItemAsync?: (key: string, value: string) => void;
  getItemAsync?: (key: string) => any;
  deleteItemAsync?: (key: string) => void;
}

// supported client storage types
export type ClientStorageType =
  | 'web'
  | 'react-native'
  | 'capacitor'
  | 'expo-secure-storage'
  | 'custom';

export interface LoginData {
  mfa?: boolean;
  ticket?: string;
}

export interface Headers {
  Authorization?: string;
}

export type Provider =
  | 'apple'
  | 'facebook'
  | 'github'
  | 'google'
  | 'linkedin'
  | 'spotify'
  | 'twitter'
  | 'windowslive';

export interface UserCredentials {
  email?: string;
  password?: string;
  provider?: Provider;
  options?: {
    userData?: any;
    defaultRole?: string;
    allowedRoles?: string[];
  };
}
export interface Session {
  jwt_token: string;
  jwt_expires_in: number;
  user: User;
  refresh_token?: string; // not present if useCookie
}

export interface User {
  id: string;
  email?: string;
  display_name?: string;
  avatar_url?: string;
}
export interface JWTHasuraClaims {
  [claim: string]: string | string[];
  'x-hasura-allowed-roles': string[];
  'x-hasura-default-role': string;
  'x-hasura-user-id': string;
}

// https://hasura.io/docs/1.0/graphql/core/auth/authentication/jwt.html#the-spec
export interface JWTClaims {
  sub?: string;
  iat?: number;
  'https://hasura.io/jwt/claims': JWTHasuraClaims;
}
