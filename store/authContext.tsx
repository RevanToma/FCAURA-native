import AsyncStorage from "@react-native-async-storage/async-storage";

import { ReactNode, createContext, useEffect, useState } from "react";

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
    async function fetchProfileSetup() {
      const storedProfileSetup = await AsyncStorage.getItem("profileSetup");

      if (storedProfileSetup === "true") {
        setProfileSetup(true);
      }
    }

    fetchProfileSetup();
  }, []);

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
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
