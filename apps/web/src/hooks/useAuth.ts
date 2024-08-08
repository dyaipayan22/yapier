import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth should be used within AuthProvider");
  }

  return context;
};
