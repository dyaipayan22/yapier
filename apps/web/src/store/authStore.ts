import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  setRefreshedToken: (token: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user: user, token: token });
      },
      setRefreshedToken: (token) => {
        set({ token: token });
      },
      resetAuth: () => {
        set({ user: null, token: null });
      },
    }),
    { name: "authStatus" }
  )
);
