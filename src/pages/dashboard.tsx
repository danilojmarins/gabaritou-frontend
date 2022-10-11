import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/router';

const Dashboard: NextPage = () => {

    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            Router.push('/');
        }
    }, [isAuthenticated]);

    return (
        <div>Olá {user?.nome}</div>
    )
}

export default Dashboard;