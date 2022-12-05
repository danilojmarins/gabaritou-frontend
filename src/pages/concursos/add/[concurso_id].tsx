import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Cabecalho from "../../../components/Cabecalho";
import Rodape from "../../../components/Rodape";
import { api } from "../../../services/api";
import { Button, Form, Input, Label, Select } from "../../../styles/components/MinimalComponents.style";
import { QuestaoCardStyle } from "../../../styles/components/QuestaoCard.style";
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

const EditConcurso: NextPage<User> = (user) => {

    const router = useRouter();
    const { concurso_id } = router.query;

    const [id, setId] = useState<string>('');
    const [ano, setAno] = useState<string>('');
    const [bancaId, setBancaId] = useState<string>('');
    const [orgaoId, setOrgaoId] = useState<string>('');

    const [bancas, setBancas] = useState<Banca[]>();
    const [orgaos, setOrgaos] = useState<Orgao[]>();

    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleEdit = async () => {

        if (ano && bancaId && orgaoId) {
        
            setCarregando(true);
            setSuccess(false);

            await api.put('/concursos/update/concursoPorId', {
                ano: ano,
                banca: bancaId,
                orgao: orgaoId,
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

        getBancas();
        getOrgaos();
    }, []);

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

                <QuestaoCardStyle width='60%'>
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

                        {cadastroError &&
                            <p className="error">
                                <FontAwesomeIcon className="error-icon" icon={faTriangleExclamation} />
                                {cadastroError}
                            </p>
                        }
                    </Form>

                    <Button className="button" onClick={handleEdit}>Salvar</Button>

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

export default EditConcurso;