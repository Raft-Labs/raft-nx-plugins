import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import Auth from './Auth';

export default class FirebaseClient {
  app: FirebaseApp;
  auth: Auth;

  constructor(config: FirebaseOptions) {
    this.app = initializeApp(config);
    this.auth = new Auth(this.app);
  }
}
