import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import Cabecalho from "../../components/Cabecalho";
import CardInfo from "../../components/CardInfo"
import PesquisaSimples from "../../components/PesquisaSimples";
import Rodape from "../../components/Rodape";
import { getApiClient } from "../../services/axios";
import { User } from "../../types/User";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Banca } from "../../types/Banca";

const Disciplinas: NextPage<User> = (user) => {

    const [bancas, setBancas] = useState<Banca[]>([]);

    useEffect(() => {
        const getBancas = async () => {
            await api.get('/bancas/get/todasBancas')
            .then((response) => {
                setBancas(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getBancas();
    }, []);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Disciplinas</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <BancasStyle>
                <h2>Disciplinas</h2>
                <PesquisaSimples user={user} page={'bancas'} />
                {bancas && bancas.map((banca) => {
                    return (
                        <React.Fragment key={banca.id}>
                            <CardInfo data={banca} user={user} page={'bancas'} />
                        </React.Fragment>
                    )
                })}
            </BancasStyle>

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

export default Disciplinas;