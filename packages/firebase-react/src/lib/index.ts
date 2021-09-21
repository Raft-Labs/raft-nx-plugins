import { FirebaseOptions } from 'firebase/app';
import FirebaseClient from './FirebaseClient';

export const createFirebaseClient = (config: FirebaseOptions) => {
  const client = new FirebaseClient(config);
  return client;
};
