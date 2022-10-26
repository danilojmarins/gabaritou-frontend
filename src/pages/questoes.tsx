import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { getApiClient } from '../services/axios';
import Head from 'next/head';
import Cabecalho from '../components/Cabecalho';
import { DashboardStyle } from '../styles/pages/Dashboard.style';
import Rodape from '../components/Rodape';
import QuestaoCard from '../components/QuestaoCard';

interface User {
    id: string;
    nome: string;
    email: string;
    email_confirmado: boolean;
    cargo_id: number;
}
 
const Questoes: NextPage<User> = (user) => {

    return (
        <>
            <Head>
                <title>Gabaritou TI | Questões</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <DashboardStyle>
                <div>Olá {user?.nome}</div>

                <QuestaoCard />
            </DashboardStyle>

            <Rodape />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const apiClient = getApiClient(ctx);

    const { ['gabaritou.token']: token } = parseCookies(ctx);

    if (!token) {
        return {
            props: {}
        }
    }

    let user: User | undefined;

    await apiClient.get('/usuarios').then(response => {
        user = response.data;
    }).catch(function() {
        destroyCookie(ctx, 'gabaritou.token');
    });

    if (!user) {
        return {
            props: {}
        }
    }

    return {
        props: user
    }
}

export default Questoes;