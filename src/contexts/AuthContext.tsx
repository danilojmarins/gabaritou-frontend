import { createContext, useState } from 'react';
import axios from 'axios';

interface User {
    id: string,
    nome: string,
    email: string
}

interface AuthContextTypes {
    isAuthenticated: boolean;
    login: (loginEmail: string, loginSenha: string) => Promise<void>;
    user: User | null;
}

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: any) {

    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = false;

    async function login(loginEmail: string, loginSenha: string) {
        await axios.post('http://localhost:5000/auth', {
            email: loginEmail,
            senha: loginSenha
        })
        .then(response => {
            setUser(response.data);
            console.log(response.data);
        })
        .catch(function(error) {
            console.log('erro ao obter dados');
        })
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, user }}>
            {children}
        </AuthContext.Provider>
    )
}