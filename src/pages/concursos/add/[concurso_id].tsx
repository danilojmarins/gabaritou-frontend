import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Cabecalho from "../../../components/Cabecalho";
import Rodape from "../../../components/Rodape";
import { api } from "../../../services/api";
import { Button, Form, Input, Label, Select } from "../../../styles/components/MinimalComponents.style";
import { DashboardStyle } from "../../../styles/pages/Dashboard.style";
import { getApiClient } from "../../../services/axios";
import { destroyCookie, parseCookies } from "nookies";
import Head from "next/head";
import { User } from "../../../types/User";
import { useRouter } from "next/router";
import { Banca } from "../../../types/Banca";
import CarregamentoWidget from "../../../components/CarregamentoWidget";
import ResponseWidget from "../../../components/ResponseWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Orgao } from "../../../types/Orgao";
import { Status } from "../../../types/ConcursoStatus";
import { Regiao } from "../../../types/Regiao";
import { Estado } from "../../../types/Estado";

const EditConcurso: NextPage<User> = (user) => {

    const router = useRouter();
    const { concurso_id } = router.query;

    const [id, setId] = useState<string>('');
    const [ano, setAno] = useState<string>('');
    const [bancaId, setBancaId] = useState<string>('');
    const [orgaoId, setOrgaoId] = useState<string>('');
    const [statusId, setStatusId] = useState<string>('');
    const [regiaoId, setRegiaoId] = useState<string>('');
    const [estadoId, setEstadoId] = useState<string>('');

    const [bancas, setBancas] = useState<Banca[]>();
    const [orgaos, setOrgaos] = useState<Orgao[]>();
    const [status, setStatus] = useState<Status[]>();
    const [regioes, setRegioes] = useState<Regiao[]>();
    const [estados, setEstados] = useState<Estado[]>();

    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleEdit = async () => {

        if (ano && bancaId && orgaoId && statusId && regiaoId && estadoId) {
        
            setCarregando(true);
            setSuccess(false);

            await api.put('/concursos/update/concursoPorId', {
                ano: ano,
                banca: bancaId,
                orgao: orgaoId,
                status: statusId,
                estado: estadoId
            }, {
                params: {
                    id: id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then(() => {
                setAno('');
                setBancaId('');
                setOrgaoId('');
                setStatusId('');
                setRegiaoId('');
                setEstadoId('');
                setCadastroError(null);
                setSuccess(true);
                router.push('/concursos');
            })
            .catch(() => {
                setCadastroError('Erro ao editar concurso.');
            })

            setCarregando(false);
            
        }
    }

    useEffect(() => {
        const getBanca = async () => {
            setCarregando(true);
            await api.get('/concursos/get/concursoPorId', {
                params: {
                    id: concurso_id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                setId(response.data.id);
                setAno(response.data.ano);
                setBancaId(response.data.banca);
                setOrgaoId(response.data.orgao);
                setStatusId(response.data.status);
                setRegiaoId(response.data.estado.regiao.id)
                setEstadoId(response.data.estado.id)
                setCarregando(false);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getBanca();
    }, [concurso_id, user.cargo_id]);

    useEffect(() => {
        const getBancas = async () => {
            await api.get('bancas/get/todasBancas')
            .then((response) => {
                setBancas(response.data);
            })
        }

        const getOrgaos = async () => {
            await api.get('orgaos/get/todosOrgaos')
            .then((response) => {
                setOrgaos(response.data);
            })
        }

        const getStatus = async () => {
            await api.get('status/get/todosStatus')
            .then((response) => {
                setStatus(response.data)
            })
        }

        const getRegioes = async () => {
            await api.get('regioes/get/todasRegioes')
            .then((response) => {
                setRegioes(response.data)
            })
        }

        const getEstados = async () => {
            await api.get('estados/get/todosEstados')
            .then((response) => {
                setEstados(response.data)
            })
        }

        getBancas();
        getOrgaos();
        getStatus();
        getRegioes();
        getEstados();
    }, []);

    console.log(statusId, regiaoId, estadoId)

    return (
        <>
            <Head>
                <title>Gabaritou TI - Concursos Públicos</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {carregando && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <DashboardStyle>

                <h3>Editar Concurso</h3>

                <Form>
                    <Label>Ano</Label>
                    <Input type='text' value={ano} onChange={(e) => setAno(e.target.value)}></Input>

                    <Label>Banca</Label>
                    <Select onChange={(e) => setBancaId(e.target.value)}>
                        {bancas && bancas.map((banca) => {
                            return <option value={banca.id} key={banca.id} selected={banca.id.toString() === bancaId}>{banca.sigla}</option>
                        })}
                    </Select>

                    <Label>Órgão</Label>
                    <Select onChange={(e) => setOrgaoId(e.target.value)}>
                        {orgaos && orgaos.map((orgao) => {
                            return <option value={orgao.id} key={orgao.id} selected={orgao.id.toString() === orgaoId}>{orgao.sigla}</option>
                        })}
                    </Select>

                    <Label>Status</Label>
                    <Select onChange={(e) => setStatusId(e.target.value)}>
                        {status && status.map((status) => {
                            return <option value={status.id} key={status.id} selected={status.id === parseInt(statusId)}>{status.descricao}</option>
                        })}
                    </Select>

                    <Label>Região</Label>
                    <Select onChange={(e) => setRegiaoId(e.target.value)}>
                        <option>Selecione uma Região</option>
                        {regioes && regioes.map((regiao) => {
                            return <option value={regiao.id} key={regiao.id} selected={regiao.id === parseInt(regiaoId)}>{regiao.descricao}</option>
                        })}
                    </Select>

                    <Label>Estado</Label>
                    <Select onChange={(e) => setEstadoId(e.target.value)}>
                        <option>Selecione um Estado</option>
                        {estados && estados.map((estado) => {
                            if (parseInt(regiaoId) === estado.regiao.id) {
                                return <option value={estado.id} key={estado.id} selected={estado.id === parseInt(estadoId)}>{estado.nome}</option>
                            }
                            else return null;
                        })}
                    </Select>

                    {cadastroError &&
                        <p className="error">
                            <FontAwesomeIcon className="error-icon" icon={faTriangleExclamation} />
                            {cadastroError}
                        </p>
                    }
                </Form>

                <Button className="button" onClick={handleEdit}>Salvar</Button>

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

export default EditConcurso;