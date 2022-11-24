import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import { api } from "../../services/api";
import { getApiClient } from "../../services/axios";
import { destroyCookie, parseCookies } from "nookies";
import Head from "next/head";
import { User } from "../../types/User";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import { CardInfoStyle } from "../../styles/components/CardInfo.style";
import { AreaConhecimento } from "../../types/AreaConhecimento";
import { Disciplina } from "../../types/Disciplina";
import Link from "next/link";
import React from "react";
import PesquisaSimples from "../../components/PesquisaSimples";
import CarregamentoWidget from "../../components/CarregamentoWidget";
import ResponseWidget from "../../components/ResponseWidget";

const Disciplinas: NextPage<User> = (user) => {

    const [areas, setAreas] = useState<AreaConhecimento[]>();
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();

    const [deletedDisciplina, setDeletedDisciplina] = useState<Disciplina>();

    const [success, setSuccess] = useState<boolean>(false);

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
    }, [deletedDisciplina]);

    const handleDelete = async (id: number) => {
        setSuccess(false);
        await api.delete('/disciplinas/delete/disciplinaPorId', {
            params: {
                id: id,
                user_cargo_id: user.cargo_id
            }
        })
        .then((response) => {
            setDeletedDisciplina(response.data);
            setSuccess(true);
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    return (
        <>
            <Head>
                <title>Gabaritou TI - Bancas Organizadoras</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!areas && !disciplinas && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <BancasStyle>

                <h2>Disciplinas por Área</h2>

                <PesquisaSimples
                    user={user}
                    page={'disciplinas'}
                    getTermoPesquisa={() => {}}
                    getNumResultados={() => {}}
                />

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
                                                <div className={disciplinas[i + 1] && (disciplinas[i + 1].area_id === disciplina.area_id) ? "row" : "row last"} key={disciplina.id}>
                                                    <p className="left">{disciplina.nome}</p>
                                                    <p className={(user && user.cargo_id === 3) ? "link center" : "link right"}>{'123'} questões</p>
                                                    {user.cargo_id === 3 ? <Link href={`/disciplinas/add/${disciplina.id}`}><p className="link center option">Editar</p></Link> : <></>}
                                                    {user.cargo_id === 3 ? <p className="link right option" onClick={() => {handleDelete(disciplina.id)}}>Excluir</p> : <></>}
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