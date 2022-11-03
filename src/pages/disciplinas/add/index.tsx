import { GetServerSideProps, NextPage } from "next";
import { useState, useEffect } from "react";
import Cabecalho from "../../../components/Cabecalho";
import Rodape from "../../../components/Rodape";
import { api } from "../../../services/api";
import { Button, Form, Input, Label, Select, Table } from "../../../styles/components/MinimalComponents.style";
import { QuestaoCardStyle } from "../../../styles/components/QuestaoCard.style";
import { DashboardStyle } from "../../../styles/pages/Dashboard.style";
import { getApiClient } from "../../../services/axios";
import { destroyCookie, parseCookies } from "nookies";
import Head from "next/head";
import { User } from "../../../types/User";
import { AreaConhecimento } from "../../../types/AreaConhecimento";

const DisciplinasAdd: NextPage<User> = (user) => {

    const [id, setId] = useState<number | null>(null);
    const [areaId, setAreaId] = useState<string | null>(null);
    const [disciplina, setDisciplina] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');

    const [validDisciplina, setValidDisciplina] = useState<string | null>(null);
    const [validDescricao, setValidDescricao] = useState<string | null>(null);

    const [areas, setAreas] = useState<AreaConhecimento[]>([]);

    useEffect(() => {
        const getAreas = async () => {
            await api.get('/disciplinas/get/todasAreas')
            .then((response) => {
                setAreas(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getAreas();
    }, []);

    const disciplinaValidation = (nome: string) => {
        return /^.{3,}$/.test(nome);
    }

    const descricaoValidation = (site: string) => {
        return /^.{3,}$/.test(site);
    }

    const handleDisciplinaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!disciplinaValidation(event.target.value)) {
            setValidDisciplina('Nome deve ter ao menos 3 caracteres.');
        } else {
            setValidDisciplina(null);
        }
    
        setDisciplina(event.target.value);
    };

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!descricaoValidation(event.target.value)) {
            setValidDescricao('Site deve ter ao menos 3 caracteres.');
        } else {
            setValidDescricao(null);
        }
    
        setDescricao(event.target.value);
    };

    const handleCadastro = async (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validDisciplina && !validDescricao && areaId) {
            await api.post('/disciplinas/post/salvaDisciplina', {
                nome: disciplina,
                descricao: descricao,
                area_id: areaId,
            }, {
                params: {
                    user_cargo_id: user.cargo_id
                }
            })
            .then(() => {
                setDisciplina('');
                setDescricao('');
                setId(null);
                setAreaId(null);
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    }

    return (
        <>
            <Head>
                <title>Gabaritou TI - Órgãos e Entidades</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <DashboardStyle>

                <QuestaoCardStyle width='60%'>
                    <h3>Cadastrar Disciplina</h3>

                    <Form>
                        <Label>Área de Conhecimento</Label>
                        <Select onChange={(e) => setAreaId(e.target.value)}>
                            <option selected value={undefined}>Selecione uma Área de Conhecimento</option>
                            {areas && areas.map((area) => {
                                return <option key={area.id} value={area.id}>{area.nome}</option>
                            })}
                        </Select>

                        <Label>Disciplina</Label>
                        <Input type='text' value={disciplina} onChange={handleDisciplinaChange}></Input>
                        {validDisciplina && <p className="error">{validDisciplina}</p>}

                        <Label>Descrição</Label>
                        <Input type='url' value={descricao} onChange={handleDescricaoChange}></Input>
                        {validDescricao && <p className="error">{validDescricao}</p>}
                    </Form>

                    <Button className="button" onClick={(e) => handleCadastro(e)}>Cadastrar</Button>

                </QuestaoCardStyle>

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

    if (user.cargo_id !== 3) {
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

export default DisciplinasAdd;