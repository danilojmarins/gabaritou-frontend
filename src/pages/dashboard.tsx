import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { getApiClient } from '../services/axios';
import Head from 'next/head';
import Cabecalho from '../components/Cabecalho';
import { DashboardStyle } from '../styles/pages/Dashboard.style';
import Rodape from '../components/Rodape';
 
export default function Dashboard({ user }: any) {

    return (
        <>
            <Head>
                <title>Gabaritou | Dashboard</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho loggedIn={true} />

            <DashboardStyle>
                <div>Olá {user.nome}</div>
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
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    let user;

    await apiClient.get('/usuarios').then(response => {
        user = response.data;
    }).catch(function() {
        destroyCookie(ctx, 'gabaritou.token');
    });

    if (!user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: { user }
    }
}