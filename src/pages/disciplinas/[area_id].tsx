import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import { api } from "../../services/api";
import { Button, Form, Input, Label, Table } from "../../styles/components/MinimalComponents.style";
import { QuestaoCardStyle } from "../../styles/components/QuestaoCard.style";
import { DashboardStyle } from "../../styles/pages/Dashboard.style";
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

const EditDisciplina: NextPage<User> = (user) => {

    const router = useRouter();
    const { area_id } = router.query;

    const [area, setArea] = useState<AreaConhecimento>();
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();

    useEffect(() => {
        const getArea = async () => {
            await api.get('/areas/get/areaPorId', {
                params: {
                    id: area_id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                setArea(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getArea();

        const getDisciplinas = async () => {
            await api.get('/disciplinas/get/disciplinasPorArea', {
                params: {
                    area_id: area_id,
                }
            })
            .then((response) => {
                setDisciplinas(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getDisciplinas();
    }, [area_id, user.cargo_id]);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Bancas Organizadoras</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <BancasStyle>

                <h2>{'Área de Conhecimento'} para Concursos</h2>

                <CardInfoStyle>
                    <div className="head">
                        <h4>{area?.nome}</h4>
                    </div>

                    {disciplinas && disciplinas.map((disciplina, i) => {
                        return (
                            <div className={(i !== (disciplinas.length - 1)) ? "row" : "row last"} key={disciplina.id}>
                                <p className="left">{disciplina.nome}</p>
                                <p className="link center">{'123'} questões</p>
                                {user.cargo_id === 3 ? <Link href={'/disciplinas/add'}><p className="link center">Editar</p></Link> : <></>}
                                {user.cargo_id === 3 ? <p className="link right">Excluir</p> : <></>}
                            </div>
                        )
                    })}
                </CardInfoStyle>

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

export default EditDisciplina;