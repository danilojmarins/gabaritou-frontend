import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

interface User {
    email: string,
    id: string,
    nome: string
}

interface AuthContextTypes {
    isAuthenticated: boolean;
    login: (loginEmail: string, loginSenha: string) => Promise<void>;
    user: User | null;
    loginError: boolean;
}

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: any) {

    const [user, setUser] = useState<User | null>(null);
    const [loginError, setLoginError] = useState<boolean>(false);
    const [tokenSet, setTokenSet] = useState<boolean>(false);

    const isAuthenticated = !!user;

    useEffect(() => {
        const { token } = parseCookies();

        if (token) {
            axios.get('http://localhost:5000/usuarios', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data);
            })
        }
    }, [tokenSet, isAuthenticated]);

    async function login(loginEmail: string, loginSenha: string) {
        await axios.post('http://localhost:5000/auth', {
            email: loginEmail,
            senha: loginSenha
        })
        .then(response => {
            setCookie(undefined, 'token', response.data.token, {
                maxAge: 60 * 60 * 24, // 1 dia
            });
            setTokenSet(true);
        })
        .then(() => {
            Router.push('/dashboard');
        })
        .catch(function() {
            setLoginError(true);
        })
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, user, loginError }}>
            {children}
        </AuthContext.Provider>
    )
}