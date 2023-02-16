import { User } from '../../types/user';
import { createContext } from 'react';

interface AuthContextType {
    accessToken: string,
    user: User | null,
    reLogin: (refreshToken: string) => void;
    login: (refreshToken: string) => void;
    logout: () => void;
    loading: Boolean,
  };


export const AuthContext = createContext<AuthContextType>({} as AuthContextType);