import { createContext, useState } from 'react';
import axios from 'axios';

interface AuthContextTypes {
    isAuthenticated: boolean;
    login: (loginEmail: string, loginSenha: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: any) {

    const isAuthenticated = false;

    async function login(loginEmail: string, loginSenha: string) {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const url = 'http://localhost:5000/auth';

        const data = {
            email: loginEmail,
            senha: loginSenha
        }

        const response = await axios.post(url, data, config)
        console.log(response);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    )
}