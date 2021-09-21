import { FirebaseApp } from 'firebase/app';
import {
  applyActionCode,
  Auth as IAuth,
  checkActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  verifyBeforeUpdateEmail,
  verifyPasswordResetCode,
} from 'firebase/auth';

export default class Auth {
  private auth: IAuth;
  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
  }
  /**
   * @param  {string} email
   * @param  {string} password
   */
  public register = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  };
  /**
   * @param  {string} email
   * @param  {string} password
   */
  public login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(this.auth, email, password);
  };

  public logout = async () => {
    return await signOut(this.auth);
  };
  /**
   * @param  {string} email
   */
  public forgotPassword = async (email: string) => {
    return await sendPasswordResetEmail(this.auth, email);
  };
  /**
   * @param  {string} code
   */
  public verifyPasswordResetCode = async (code: string) => {
    return await verifyPasswordResetCode(this.auth, code);
  };
  /**
   * @param  {string} code
   */
  public verifyEmail = async (code: string) => {
    return await applyActionCode(this.auth, code);
  };

  public sendVerificationEmail = sendEmailVerification;
  /**
   * @param  {string} code
   * @param  {string} password
   */
  public changePassword = (code: string, password: string) => {
    return confirmPasswordReset(this.auth, code, password);
  };

  public updateUserPassword = updatePassword;

  public changeEmail = verifyBeforeUpdateEmail;
  /**
   * @param  {string} oobCode
   */
  public confirmChangeEmail = async (oobCode: string) => {
    const response = await checkActionCode(this.auth, oobCode);

    await applyActionCode(this.auth, oobCode);

    return response;
  };
}
