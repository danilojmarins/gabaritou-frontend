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
import axios from "axios";

const EditConcurso: NextPage<User> = (user) => {

    const router = useRouter();
    const { concurso_id } = router.query;

    const [id, setId] = useState<string>('');
    const [ano, setAno] = useState<string>();
    const [bancaId, setBancaId] = useState<string>('');
    const [orgaoId, setOrgaoId] = useState<string>('');
    const [statusId, setStatusId] = useState<string>('');
    const [regiaoId, setRegiaoId] = useState<string>('');
    const [estadoId, setEstadoId] = useState<string>('');
    const [edital, setEdital] = useState<File | null>(null);
    const [inicioInscricao, setInicioInscricao] = useState<string>();
    const [fimInscricao, setFimInscricao] = useState<string>();
    const [taxaInscricao, setTaxaInscricao] = useState<number>();
    const [numVagas, setNumVagas] = useState<number>();
    const [dataProva, setDataProva] = useState<string>();
    const [minSalario, setMinSalario] = useState<number>();
    const [maxSalario, setMaxSalario] = useState<number>();

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

            try {
                const formData = new FormData();

                if (edital)
                formData.append('edital', edital);

                setCarregando(true);
                setSuccess(false);

                await axios.post('/api/concursos', formData, {
                    params: {
                        cargo_id: user.cargo_id,
                        file_name: orgaoId + '-' + ano
                    }
                })
                .then(() => {
                    api.put('/concursos/update/concursoPorId', {
                        ano: ano,
                        banca: bancaId,
                        orgao: orgaoId,
                        status: statusId,
                        estado: estadoId,
                        edital_url: orgaoId + '-' + ano + edital?.name.substring(edital.name.length, edital.name.lastIndexOf('.')),
                        inicio_inscricao: inicioInscricao,
                        fim_inscricao: fimInscricao,
                        taxa_inscricao: taxaInscricao,
                        num_vagas: numVagas,
                        data_prova: dataProva,
                        min_salario: minSalario,
                        max_salario: maxSalario
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
                        setInicioInscricao('');
                        setFimInscricao('');
                        setTaxaInscricao(0);
                        setNumVagas(0);
                        setDataProva('');
                        setMinSalario(0);
                        setMaxSalario(0);
                        setSuccess(true);
                        setCadastroError(null);

                        const edital: any = document.getElementById('edital-input');

                        edital.value = '';
                        setEdital(null);
                    })
                    .catch(() => {
                        setCadastroError('Erro ao cadastrar Concurso.');
                    })
                })
                setCarregando(false);
            } catch (error: any) {
                setCadastroError('Erro ao Cadastrar Concurso');
            }
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
                setBancaId(response.data.banca.id);
                setOrgaoId(response.data.orgao.id);
                setStatusId(response.data.status);
                setRegiaoId(response.data.estado.regiao.id)
                setEstadoId(response.data.estado.id)
                setInicioInscricao(response.data.inicio_inscricao)
                setFimInscricao(response.data.fim_inscricao)
                setTaxaInscricao(response.data.taxa_inscricao)
                setNumVagas(response.data.num_vagas)
                setDataProva(response.data.data_prova)
                setMinSalario(response.data.min_salario)
                setMaxSalario(response.data.max_salario)
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files){
            setEdital(event.target.files[0]);
        }
    };

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
                            return <option value={banca.id} key={banca.id} selected={banca.id === parseInt(bancaId)}>{banca.sigla}</option>
                        })}
                    </Select>

                    <Label>Órgão</Label>
                    <Select onChange={(e) => setOrgaoId(e.target.value)}>
                        {orgaos && orgaos.map((orgao) => {
                            return <option value={orgao.id} key={orgao.id} selected={orgao.id === parseInt(orgaoId)}>{orgao.sigla}</option>
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

                    <Label>Edital</Label>
                    <Input type='file' id="edital-input" onChange={handleFileChange}></Input>

                    <Label>Início das Inscrições</Label>
                    <Input type='date' value={inicioInscricao} onChange={(e) => setInicioInscricao(e.target.value)}></Input>

                    <Label>Término das Inscrições</Label>
                    <Input type='date' value={fimInscricao} onChange={(e) => setFimInscricao(e.target.value)}></Input>

                    <Label>Taxa de Inscrição</Label>
                    <Input type='number' value={taxaInscricao} onChange={(e) => setTaxaInscricao(parseFloat(e.target.value))}></Input>

                    <Label>Número Total de Vagas</Label>
                    <Input type='number' value={numVagas} onChange={(e) => setNumVagas(parseInt(e.target.value))}></Input>

                    <Label>Data da Prova</Label>
                    <Input type='date' value={dataProva} onChange={(e) => setDataProva(e.target.value)}></Input>

                    <Label>Menor Salário</Label>
                    <Input type='number' value={minSalario} onChange={(e) => setMinSalario(parseFloat(e.target.value))}></Input>

                    <Label>Maior Salário</Label>
                    <Input type='number' value={maxSalario} onChange={(e) => setMaxSalario(parseFloat(e.target.value))}></Input>

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