import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '../services/api';

interface AuthContextTypes {
    login: (loginEmail: string, loginSenha: string) => Promise<void>;
    loginError: boolean;
    emailNaoConfirmado: boolean;
}

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }:any) {

    const [loginError, setLoginError] = useState<boolean>(false);
    const [emailNaoConfirmado, setEmailNaoConfirmado] = useState<boolean>(false);

    async function login(loginEmail: string, loginSenha: string) {
        await api.post('/auth', {
            email: loginEmail,
            senha: loginSenha
        })
        .then(response => {
            setCookie(undefined, 'gabaritou.token', response.data.token, {
                maxAge: 60 * 60 * 24, // 1 dia
            });
            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
        })
        .then(() => {
            Router.push('/dashboard');
        })
        .catch(function(response) {
            if (response.response.data && response.response.data === 'email not confirmed') {
                setEmailNaoConfirmado(true);
            } else {
                setLoginError(true);
            }
        })
    }

    return (
        <AuthContext.Provider value={{ login, loginError, emailNaoConfirmado }}>
            {children}
        </AuthContext.Provider>
    )
}