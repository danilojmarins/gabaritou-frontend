import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Cabecalho from "../../../components/Cabecalho";
import CarregamentoWidget from "../../../components/CarregamentoWidget";
import ResponseWidget from "../../../components/ResponseWidget";
import Rodape from "../../../components/Rodape";
import { api } from "../../../services/api";
import { getApiClient } from "../../../services/axios";
import { Button, Form, Input, Label, Select } from "../../../styles/components/MinimalComponents.style";
import { DashboardStyle } from "../../../styles/pages/Dashboard.style";
import { Concurso } from "../../../types/Concurso";
import { Escolaridade } from "../../../types/Escolaridade";
import { User } from "../../../types/User";


const CargosEdit: NextPage<User> = (user) => {

    const router = useRouter();
    const { cargo_id } = router.query;

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [concursos, setConcursos] = useState<Concurso[]>();
    const [escolaridades, setEscolaridades] = useState<Escolaridade[]>();

    const [id, setId] = useState<string>('');
    const [concursoId, setConcursoId] = useState<string>('');
    const [escolaridadeId, setEscolaridadeId] = useState<string>('');
    const [cargo, setCargo] = useState<string>('');

    useEffect(() => {
        const getConcursos = async () => {
            await api.get('concursos/get/todosConcursos')
            .then((response) => {
                setConcursos(response.data);
            })
        }

        const getEscolaridades = async () => {
            await api.get('escolaridades/get/todasEscolaridades')
            .then((response) => {
                setEscolaridades(response.data);
            })
        }

        getConcursos();
        getEscolaridades();
    }, []);

    useEffect(() => {
        const getCargoPorId = async () => {
            await api.get('/cargos/get/cargoPorId', {
                params: {
                    id: cargo_id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                setId(response.data.id);
                setCargo(response.data.descricao);
                setConcursoId(response.data.concurso.id);
                setEscolaridadeId(response.data.escolaridade.id);
            })
        }

        getCargoPorId();
    }, [cargo_id, user.cargo_id]);

    const handleEdit = async () => {
        if (concursoId && escolaridadeId && cargo) {
            setCarregando(true);
            setSuccess(false);

            await api.put('/cargos/update/cargoPorId', {
                descricao: cargo,
                concurso: concursoId,
                escolaridade: escolaridadeId
            }, {
                params: {
                    id: cargo_id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then(() => {
                setConcursoId('');
                setEscolaridadeId('');
                setCargo('');
                setSuccess(true);
                router.push('/cargos');
            })
            .catch(() => {
                setCadastroError('Erro ao editar Cargo.');
            })
            
            setCarregando(false);
        }
    }

    return (
        <>
            <Head>
                <title>Gabaritou TI - Cargos</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {carregando && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <DashboardStyle>

                <h3>Editar Cargo</h3>

                <Form>

                    <Label>Concurso</Label>
                    <Select onChange={(e) => setConcursoId(e.target.value)}>
                        <option>Selecione um Concurso</option>
                        {concursos && concursos.map((concurso) => {
                            return <option value={concurso.id} key={concurso.id} selected={concurso.id === parseInt(concursoId)}>{concurso.orgao.sigla} - {concurso.ano}</option>
                        })}
                    </Select>

                    <Label>Escolaridade</Label>
                    <Select onChange={(e) => setEscolaridadeId(e.target.value)}>
                        <option>Selecione uma Escolaridade</option>
                        {escolaridades && escolaridades.map((escolaridade) => {
                            return <option value={escolaridade.id} key={escolaridade.id} selected={escolaridade.id === parseInt(escolaridadeId)}>{escolaridade.descricao}</option>
                        })}
                    </Select>

                    <Label>Cargo</Label>
                    <Input type='text' value={cargo} onChange={(e) => setCargo(e.target.value)}></Input>

                    {cadastroError &&
                        <p className="error">
                            <FontAwesomeIcon className="error-icon" icon={faTriangleExclamation} />
                            {cadastroError}
                        </p>
                    }
                </Form>

                <Button className="button" onClick={handleEdit}>Cadastrar</Button>

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

export default CargosEdit;