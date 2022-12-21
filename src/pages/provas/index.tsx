import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import React from "react";
import { useEffect, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import CardInfo from "../../components/CardInfo";
import CarregamentoWidget from "../../components/CarregamentoWidget";
import PesquisaSimples from "../../components/PesquisaSimples";
import ResponseWidget from "../../components/ResponseWidget";
import { api } from "../../services/api";
import { getApiClient } from "../../services/axios";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import { Prova } from "../../types/Prova";
import { User } from "../../types/User";

const Provas: NextPage<User> = (user) => {

    const [provas, setProvas] = useState<Prova[]>();
    const [termoPesquisa, setTermoPesquisa] = useState<string>('');
    const [numResultados, setNumResultados] = useState<number>();

    const [success, setSuccess] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<Prova>();

    const getTermoPesquisa = (termoPesquisa: string) => {
        setTermoPesquisa(termoPesquisa);
    }

    const getNumResultados = (numResultados: number) => {
        setNumResultados(numResultados);
    }

    useEffect(() => {
        const getProvas = async () => {
            await api.get('/provas/get/todasProvas')
            .then((response) => {
                setProvas(response.data);
            })
        }

        getProvas();
    }, []);

    const getSuccess = (success: boolean) => {
        setSuccess(success);
    }

    const getDeleted = (deleted: Prova) => {
        setDeleted(deleted);
    }

    return (
        <>
            <Head>
                <title>Gabaritou TI - Provas de Concursos</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!provas && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <BancasStyle>
                <div className="title">
                    <h2>Provas</h2>
                    <h2>Total de Provas Encontradas: {provas?.length}</h2>
                </div>

                <PesquisaSimples
                    user={user}
                    page={'provas'}
                    getTermoPesquisa={getTermoPesquisa}
                    getNumResultados={getNumResultados}
                />

                {provas && provas.map((prova) => {
                    return (
                        <React.Fragment key={prova.id}>
                            <CardInfo
                                bancaOrgao={null}
                                user={user}
                                page={'provas'}
                                disciplina={null}
                                concurso={null}
                                prova={prova}
                                getDeleted={getDeleted}
                                getSuccess={getSuccess}
                            />
                        </React.Fragment>
                    )
                })}

            </BancasStyle>
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

export default Provas;