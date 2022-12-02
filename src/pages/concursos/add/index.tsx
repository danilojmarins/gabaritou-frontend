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

const ConcursosAdd: NextPage<User> = (user) => {

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [bancas, setBancas] = useState<Banca[]>();
    const [orgaos, setOrgaos] = useState<Orgao[]>();

    const [ano, setAno] = useState<string>();
    const [bancaId, setBancaId] = useState<string>();
    const [orgaoId, setOrgaoId] = useState<string>();

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

    const handleCadastro = async () => {
        if (ano && bancaId && orgaoId) {
            setCarregando(true);
            setSuccess(false);

            await api.post('/concursos/post/salvaConcurso', {
                ano: ano,
                banca_id: bancaId,
                orgao_id: orgaoId
            }, {
                params: {
                    user_cargo_id: user.cargo_id
                }
            })
            .then(() => {
                setAno('');
                setBancaId('');
                setOrgaoId('');
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
                        {bancas && bancas.map((banca) => {
                            return <option value={banca.id} key={banca.id}>{banca.sigla}</option>
                        })}
                    </Select>

                    <Label>Órgão</Label>
                    <Select onChange={(e) => setOrgaoId(e.target.value)}>
                        {orgaos && orgaos.map((orgao) => {
                            return <option value={orgao.id} key={orgao.id}>{orgao.sigla}</option>
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