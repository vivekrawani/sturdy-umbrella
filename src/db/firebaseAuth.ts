import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";
import { initFirebase } from "./firebaseSDK";
const app = initFirebase();
const auth = getAuth(app);
export async function googleAuth() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    const {
      email,
      emailVerified,
      displayName,
      phoneNumber,
      photoURL,
      uid,
    } = result.user;
    const data = {
      email,
      emailVerified,
      displayName,
      phoneNumber,
      photoURL,
      uid,
    };
    return { data, error: false };
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    const email = e.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(e);
    const data = { errorCode, errorMessage, email, credential };
    return  Promise.reject(new Error(errorMessage));
  }
}

export const signout = async () => {
  try {
    await signOut(auth);
    return { user: null, error: false };
  } catch (error) {
    return { error };
  }
};
