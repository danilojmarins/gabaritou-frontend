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
import Rodape from "../../components/Rodape";
import { api } from "../../services/api";
import { getApiClient } from "../../services/axios";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import { Concurso } from "../../types/Concurso";
import { User } from "../../types/User";

const Concursos: NextPage<User> = (user) => {

    const [concursos, setConcursos] = useState<Concurso[]>();
    const [success, setSuccess] = useState<boolean>(false);
    const [termoPesquisa, setTermoPesquisa] = useState<string>('');
    const [numResultados, setNumResultados] = useState<number>(10); 
    const [deleted, setDeleted] = useState<Concurso>();

    useEffect(() => {
        const getConcursos = async () => {
            await api.get('/concursos/get/todosConcursos')
            .then((response) => {
                setConcursos(response.data);
            })
        }

        getConcursos();
    }, [deleted]);

    const getTermoPesquisa = (termoPesquisa: string) => {
        setTermoPesquisa(termoPesquisa);
    }

    const getNumResultados = (numResultados: number) => {
        setNumResultados(numResultados);
    }

    const getDeleted = (deleted: Concurso) => {
        setDeleted(deleted);
    }

    const getSuccess = (success: boolean) => {
        setSuccess(success);
    }
 
    return (
        <>
            <Head>
                <title>Gabaritou TI - Concursos Públicos</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!concursos && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <BancasStyle>
                <h2>Concursos Públicos</h2>

                <PesquisaSimples
                    user={user}
                    page={'concursos'}
                    getTermoPesquisa={getTermoPesquisa}
                    getNumResultados={getNumResultados}
                />

                {concursos && concursos.map((concurso) => {
                    return (
                        <React.Fragment key={concurso.id}>
                            <CardInfo
                                bancaOrgao={null}
                                user={user}
                                page={'concursos'}
                                disciplina={null}
                                concurso={concurso}
                                getDeleted={getDeleted}
                                getSuccess={getSuccess}
                            />
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

export default Concursos;