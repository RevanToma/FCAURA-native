import axios from "axios";
import {
  createUserDocumentFromAuth,
  fetchUserFromFirebase,
} from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

type Auth = {
  mode?: "signUp" | "signInWithPassword";
  email: string;
  password: string;
};

export const authenticate = async ({ mode, email, password }: Auth) => {
  const auth = getAuth();
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.EXPO_PUBLIC_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    // const token = response.data.idToken;
    const uid = response.data.localId;
    const user = await fetchUserFromFirebase(uid);

    return { uid, user: { ...user, email: response.data.email } };
  } catch (error: any) {
    throw new Error(error.response?.data.error.message || "UNKNOWN_ERROR");
  }
};

export const createUser = (email: string, password: string) => {
  return authenticate({ mode: "signUp", email, password });
};

export function logIn(email: string, password: string) {
  return authenticate({ mode: "signInWithPassword", email, password });
}
export const sendVerificationEmail = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      await sendEmailVerification(user); // This sends a verification email to the user
      console.log("Verification email sent.");
    } catch (error: any) {
      console.error("Error sending verification email: ", error);
      throw new Error(error.message);
    }
  } else {
    throw new Error("User is not signed in.");
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  if (!email || !password) return;

  const auth = getAuth();
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(user);

    return createUserDocumentFromAuth(user);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  if (!email || !password) return;

  const auth = getAuth();
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return await createUserDocumentFromAuth(user);
  } catch (error: any) {
    throw new Error(error);
  }
};
