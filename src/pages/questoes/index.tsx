import type { GetServerSideProps, NextPage } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { getApiClient } from '../../services/axios';
import Head from 'next/head';
import Cabecalho from '../../components/Cabecalho';
import { DashboardStyle } from '../../styles/pages/Dashboard.style';
import Rodape from '../../components/Rodape';
import QuestaoCard from '../../components/QuestaoCard';
import QuestoesFiltro from '../../components/QuestoesFiltro';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Questao } from '../../types/Questão';
 
const Questoes: NextPage<User> = (user) => {

    const [questoes, setQuestoes] = useState<Questao[]>();

    useEffect(() => {
        const getQuestoes = async () => {
            await api.get('/questoes/get/todasQuestoes')
            .then((response) => {
                setQuestoes(response.data);
            })
        }

        getQuestoes();
    }, []);

    return (
        <>
            <Head>
                <title>Gabaritou TI | Questões</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <DashboardStyle>
                <QuestoesFiltro user={user} />

                {questoes && questoes.map((questao) => {
                    return <QuestaoCard key={questao.id} questao={questao} />
                })}

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

    await apiClient.get('/usuarios/get/usuarioPorId').then(response => {
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