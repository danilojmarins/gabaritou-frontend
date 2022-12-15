import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import { useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import CarregamentoWidget from "../../components/CarregamentoWidget";
import PesquisaSimples from "../../components/PesquisaSimples";
import ResponseWidget from "../../components/ResponseWidget";
import { getApiClient } from "../../services/axios";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import { User } from "../../types/User";

const Provas: NextPage<User> = (user) => {

    const [provas, setProvas] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState<string>('');
    const [numResultados, setNumResultados] = useState<number>();

    const [success, setSuccess] = useState(false);

    const getTermoPesquisa = (termoPesquisa: string) => {
        setTermoPesquisa(termoPesquisa);
    }

    const getNumResultados = (numResultados: number) => {
        setNumResultados(numResultados);
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