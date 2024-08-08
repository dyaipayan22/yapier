import { createContext, ReactNode, useState } from "react";

export interface AuthContextType {
  token: string | null;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const setAccessToken = (token: string) => {
    setToken(token);
  };

  const removeAccessToken = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setAccessToken, removeAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
