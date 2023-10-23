import axios from "axios";

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

    return token;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createUser = (email: string, password: string) => {
  return authenticate({ mode: "signUp", email, password });
};

export function logIn(email: string, password: string) {
  return authenticate({ mode: "signInWithPassword", email, password });
}
