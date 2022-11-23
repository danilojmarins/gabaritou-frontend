import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import { api } from "../../services/api";
import { getApiClient } from "../../services/axios";
import { destroyCookie, parseCookies } from "nookies";
import Head from "next/head";
import { User } from "../../types/User";
import { useRouter } from "next/router";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import { CardInfoStyle } from "../../styles/components/CardInfo.style";
import { AreaConhecimento } from "../../types/AreaConhecimento";
import { Disciplina } from "../../types/Disciplina";
import Link from "next/link";
import React from "react";

const Disciplinas: NextPage<User> = (user) => {

    const [areas, setAreas] = useState<AreaConhecimento[]>();
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();

    useEffect(() => {
        const getAreas = async () => {
            await api.get('/areas/get/todasAreas')
            .then((response) => {
                setAreas(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getAreas();

        const getDisciplinas = async () => {
            await api.get('/disciplinas/get/todasDisciplinas')
            .then((response) => {
                setDisciplinas(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getDisciplinas();
    }, []);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Bancas Organizadoras</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <BancasStyle>

                <h2>Disciplinas por Área</h2>

                        <div className="flex">

                        {areas && areas.map((area) => {
                            return (
                                <CardInfoStyle key={area.id}>
                                    <div className="head">
                                        <h4>{area.nome}</h4>
                                    </div>

                                    {disciplinas && disciplinas.map((disciplina, i) => {

                                        if (disciplina.area_id === area.id) {
                                            return (
                                                <div className={(i !== (disciplinas.length - 1)) ? "row" : "row last"} key={disciplina.id}>
                                                    <p className="left">{disciplina.nome}</p>
                                                    <p className="link center">{'123'} questões</p>
                                                    {user.cargo_id === 3 ? <Link href={'/disciplinas/add/2'}><p className="link center option">Editar</p></Link> : <></>}
                                                    {user.cargo_id === 3 ? <p className="link right option">Excluir</p> : <></>}
                                                </div>
                                            )
                                        }
                                        else return null;
                                    })}
                                </CardInfoStyle>
                            )
                        })}

                        </div>

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
            redirect: {
                destination: '/',
                permanent: false
            }
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
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: user
    }
}

export default Disciplinas;