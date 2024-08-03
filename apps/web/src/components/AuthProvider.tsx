import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { axiosPrivate } from '@/lib/axios';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext)
    throw new Error('useAuth must be used within an AuthProvider');

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {}, []);
};
