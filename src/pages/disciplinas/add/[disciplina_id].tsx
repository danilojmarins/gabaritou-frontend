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
import { useRouter } from "next/router";
import CarregamentoWidget from "../../../components/CarregamentoWidget";
import ResponseWidget from "../../../components/ResponseWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const DisciplinasAdd: NextPage<User> = (user) => {

    const router = useRouter();
    const { disciplina_id } = router.query;

    const [areaId, setAreaId] = useState<string>('');
    const [disciplina, setDisciplina] = useState<string>('');

    const [validDisciplina, setValidDisciplina] = useState<string | null>(null);

    const [areas, setAreas] = useState<AreaConhecimento[]>([]);

    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [carregando, setCarregando] = useState<boolean>(false);
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

        const getDisciplinaPorId = async () => {
            await api.get('/disciplinas/get/disciplinaPorId', {
                params: {
                    disciplina_id: disciplina_id
                }
            })
            .then((response) => {
                setDisciplina(response.data.nome);
                setAreaId(response.data.area_id);
            })
            .catch((err) => {
                console.log(err);
            })
        }

        getDisciplinaPorId();
    }, [disciplina_id]);

    const disciplinaValidation = (nome: string) => {
        return /^.{3,}$/.test(nome);
    }

    const handleDisciplinaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!disciplinaValidation(event.target.value)) {
            setValidDisciplina('Nome deve ter ao menos 3 caracteres.');
        } else {
            setValidDisciplina(null);
        }
    
        setDisciplina(event.target.value);
    };

    const handleCadastro = async (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validDisciplina && areaId) {
            setSuccess(false);
            setCarregando(true);
            await api.put('/disciplinas/update/disciplinaPorId', {
                nome: disciplina,
                area_id: areaId,
            }, {
                params: {
                    user_cargo_id: user.cargo_id,
                    id: disciplina_id
                }
            })
            .then(() => {
                setDisciplina('');
                setAreaId('');
                setSuccess(true);
                router.push('/disciplinas');
            })
            .catch(function(err) {
                console.log(err);
                setCadastroError('Erro ao editar disciplina.');
            })
            setCarregando(false);
        }
    }

    return (
        <>
            <Head>
                <title>Gabaritou TI - Órgãos e Entidades</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!areas && !disciplina && <CarregamentoWidget />}

            {carregando && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <DashboardStyle>

                <QuestaoCardStyle width='60%'>
                    <h3>Cadastrar Disciplina</h3>

                    <Form>
                        <Label>Área de Conhecimento</Label>
                        <Select value={areaId} onChange={(e) => setAreaId(e.target.value)}>
                            <option selected value={undefined}>Selecione uma Área de Conhecimento</option>
                            {areas && areas.map((area) => {
                                return <option key={area.id} value={area.id}>{area.nome}</option>
                            })}
                        </Select>

                        <Label>Disciplina</Label>
                        <Input type='text' value={disciplina} onChange={handleDisciplinaChange}></Input>
                        {validDisciplina && <p className="error">{validDisciplina}</p>}

                        {cadastroError &&
                            <p className="error">
                                <FontAwesomeIcon className="error-icon" icon={faTriangleExclamation} />
                                {cadastroError}
                            </p>
                        }
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