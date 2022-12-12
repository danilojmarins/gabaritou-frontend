import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Cabecalho from "../../../components/Cabecalho";
import CarregamentoWidget from "../../../components/CarregamentoWidget";
import { api } from "../../../services/api";
import { getApiClient } from "../../../services/axios";
import { CardInfoStyle } from "../../../styles/components/CardInfo.style";
import { BancasStyle } from "../../../styles/pages/Bancas.style";
import { Concurso } from "../../../types/Concurso";
import { User } from "../../../types/User";

const DetalhesConcurso: NextPage<User> = (user) => {

    const [carregando, setCarregando] = useState<boolean>(false);
    const [concurso, setConcurso] = useState<Concurso>();

    const router = useRouter();
    const { concurso_id } = router.query;

    useEffect(() => {
        const getConcursoPorId = async () => {
            await api.get('/concursos/get/concursoPorId', {
                params: {
                    id: concurso_id
                }
            })
            .then((response) => {
                setConcurso(response.data);
            })
        }

        getConcursoPorId();
    }, [concurso_id]);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Concurso Público</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {carregando && <CarregamentoWidget />}

            <Cabecalho user={user} />

            <BancasStyle>
                
                <h2>Concurso {concurso?.orgao.sigla} - {concurso?.ano}</h2>

                <CardInfoStyle rowBack='#F3F3F3' text='#515151'>

                    <div className="head bottom">
                        <h4 className="dado">Total de Questões Cadastradas: </h4>
                        <h4 className="link">Resolver as {} do Concurso</h4>
                    </div>

                    <div className="head">
                        <h4>Detalhes do Concurso</h4>
                    </div>

                    <div className="row">
                        <p>Banca: {concurso?.banca.sigla}</p>
                        <p>Taxa de Inscrição:</p>
                    </div>

                    <div className="row">
                        <p>Região: {}</p>
                        <p>Estado: {}</p>
                    </div>

                    <div className="row">
                        <p>Número de Vagas: {}</p>
                        <p>Salário: {}</p>
                    </div>

                    <div className="row last">
                        <p>Provas Cadastradas: {}</p>
                        <p>Questões Disponibilizadas: {}</p>
                    </div>
                
                </CardInfoStyle>

                <CardInfoStyle rowBack='#F3F3F3' text='#515151'>
                    <div className="head">
                        <h4>Análise Estatística dos Concursos da {concurso?.orgao.sigla}</h4>
                        <h4>Cargo/ Especialidade:</h4>
                    </div>

                    <div className="row last"></div>
                </CardInfoStyle>

                <CardInfoStyle rowBack='#F3F3F3' text='#515151'>
                    <div className="head">
                        <h4>Provas Cadastradas</h4>
                    </div>

                    <div className="row last"></div>
                </CardInfoStyle>

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

export default DetalhesConcurso;