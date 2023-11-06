import axios from "axios";
import { fetchUserFromFirebase } from "../firebase/firebase";

type Auth = {
  mode?: "signUp" | "signInWithPassword";
  email: string;
  password: string;
};

export const authenticate = async ({ mode, email, password }: Auth) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.EXPO_PUBLIC_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const token = response.data.idToken;
    const uid = response.data.localId;
    const user = await fetchUserFromFirebase(uid);

    return { token, uid, user: { ...user, email: response.data.email } };
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
