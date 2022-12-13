import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
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
import { Banca } from "../../../types/Banca";
import { Orgao } from "../../../types/Orgao";
import { User } from "../../../types/User";
import { Status } from "../../../types/ConcursoStatus";
import { Regiao } from "../../../types/Regiao";
import { Estado } from "../../../types/Estado";

const ConcursosAdd: NextPage<User> = (user) => {

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [bancas, setBancas] = useState<Banca[]>();
    const [orgaos, setOrgaos] = useState<Orgao[]>();
    const [status, setStatus] = useState<Status[]>();
    const [regioes, setRegioes] = useState<Regiao[]>();
    const [estados, setEstados] = useState<Estado[]>();

    const [ano, setAno] = useState<string>();
    const [bancaId, setBancaId] = useState<string>();
    const [orgaoId, setOrgaoId] = useState<string>();
    const [statusId, setStatusId] = useState<string>();
    const [regiaoId, setRegiaoId] = useState<string>();
    const [estadoId, setEstadoId] = useState<string>();

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

    const handleCadastro = async () => {
        if (ano && bancaId && orgaoId && statusId && regiaoId && estadoId) {
            setCarregando(true);
            setSuccess(false);

            await api.post('/concursos/post/salvaConcurso', {
                ano: ano,
                banca: bancaId,
                orgao: orgaoId,
                status: statusId,
                estado: estadoId
            }, {
                params: {
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
                setSuccess(true);
                setCadastroError(null);
            })
            .catch(() => {
                setCadastroError('Erro ao cadastrar concurso.');
            })

            setCarregando(false);
        }
    }

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

                <h3>Cadastrar Concurso</h3>

                <Form>
                    <Label>Ano</Label>
                    <Input type='text' value={ano} onChange={(e) => setAno(e.target.value)}></Input>

                    <Label>Banca</Label>
                    <Select onChange={(e) => setBancaId(e.target.value)}>
                        <option>Selecione uma Banca</option>
                        {bancas && bancas.map((banca) => {
                            return <option value={banca.id} key={banca.id}>{banca.sigla}</option>
                        })}
                    </Select>

                    <Label>Órgão</Label>
                    <Select onChange={(e) => setOrgaoId(e.target.value)}>
                        <option>Selecione um Órgão</option>
                        {orgaos && orgaos.map((orgao) => {
                            return <option value={orgao.id} key={orgao.id}>{orgao.sigla}</option>
                        })}
                    </Select>

                    <Label>Status</Label>
                    <Select onChange={(e) => setStatusId(e.target.value)}>
                        <option>Selecione um Status</option>
                        {status && status.map((status) => {
                            return <option value={status.id} key={status.id}>{status.descricao}</option>
                        })}
                    </Select>

                    <Label>Região</Label>
                    <Select onChange={(e) => setRegiaoId(e.target.value)}>
                        <option>Selecione uma Região</option>
                        {regioes && regioes.map((regiao) => {
                            return <option value={regiao.id} key={regiao.id}>{regiao.descricao}</option>
                        })}
                    </Select>

                    <Label>Estado</Label>
                    <Select onChange={(e) => setEstadoId(e.target.value)}>
                        <option>Selecione um Estado</option>
                        {estados && estados.map((estado) => {
                            if (regiaoId === estado.regiao.toString()) {
                                return <option value={estado.id} key={estado.id}>{estado.nome}</option>
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

                <Button className="button" onClick={handleCadastro}>Cadastrar</Button>

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

export default ConcursosAdd;