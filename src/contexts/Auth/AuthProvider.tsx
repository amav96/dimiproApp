import { createContext, useState } from "react";
import { User } from '../../types/user';
import { AuthContext } from './AuthContext';

interface contextProps {
    children?: JSX.Element | JSX.Element[]
}

export function AuthProvider(props: contextProps){

    const { children } = props;
    const [accessToken, setAccessToken] = useState<string>('');
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<Boolean>(false)

    const reLogin = async (refreshToken : string) => {

    }

    const login = async (accessToken: string) => {

    }
    const logout = async () => {

    }

    if(loading) return null;
    
    return(
        <AuthContext.Provider value={{
            accessToken,
            user,
            reLogin,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}