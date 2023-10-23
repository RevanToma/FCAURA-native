import AsyncStorage from "@react-native-async-storage/async-storage";

import { ReactNode, createContext, useState } from "react";

type AuthContextType = {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
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

  function authenticate(token: string) {
    setAuthToken(token);

    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  }

  const value: AuthContextType = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
