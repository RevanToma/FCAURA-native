import AsyncStorage from "@react-native-async-storage/async-storage";

import { ReactNode, createContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
type AuthContextType = {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
  isProfileSetup: boolean;
  completeProfileSetup: () => void;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState("");
  const [profileSetup, setProfileSetup] = useState(false);

  useEffect(() => {
    async function fetchInitialData() {
      const token = await AsyncStorage.getItem("token");
      if (token) setAuthToken(token);

      // const profileSetup = await AsyncStorage.getItem("profileSetup");
      // await AsyncStorage.removeItem("profileSetup");
      // setProfileSetup(profileSetup === "true");
    }
    // setProfileSetup(true);
    fetchInitialData();
  }, []);

  const mutationAuthenticate = useMutation({
    mutationFn: async (token: string) => {
      await AsyncStorage.setItem("token", token);
      return token;
    },
    onSuccess: (token: string) => {
      setAuthToken(token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function authenticate(token: string) {
    // setAuthToken(token);
    // AsyncStorage.setItem("token", token);
    mutationAuthenticate.mutate(token);
  }

  function logout() {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  }
  function completeProfileSetup() {
    setProfileSetup(true);
    AsyncStorage.setItem("profileSetup", "true");
  }

  const value: AuthContextType = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    isProfileSetup: profileSetup,
    completeProfileSetup: completeProfileSetup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
