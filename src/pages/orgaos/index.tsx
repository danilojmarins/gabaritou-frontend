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
import { Orgao } from "../../types/Orgao";

const Orgaos: NextPage<User> = (user) => {

    const [orgaos, setOrgaos] = useState<Orgao[]>([]);

    useEffect(() => {
        const getOrgaos = async () => {
            await api.get('/orgaos/get/todosOrgaos')
            .then((response) => {
                setOrgaos(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getOrgaos();
    }, []);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Órgãos e Entidades</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <BancasStyle>
                <h2>Órgãos / Entidades</h2>
                <PesquisaSimples user={user} page={'orgaos'} />
                {orgaos && orgaos.map((orgao) => {
                    return (
                        <React.Fragment key={orgao.id}>
                            <CardInfo bancaOrgao={orgao} user={user} page={'orgaos'} area={null} />
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

export default Orgaos;