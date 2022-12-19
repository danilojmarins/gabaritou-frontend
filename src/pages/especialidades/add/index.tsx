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
import { Concurso } from "../../../types/Concurso";
import { ConcursoCargo } from "../../../types/ConcursoCargo";
import { User } from "../../../types/User";


const EspecialidadesAdd: NextPage<User> = (user) => {

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [concursos, setConcursos] = useState<Concurso[]>();
    const [cargos, setCargos] = useState<ConcursoCargo[]>();

    const [concursoId, setConcursoId] = useState<string>('');
    const [cargoId, setCargoId] = useState<string>();
    const [especialidade, setEspecialidade] = useState<string>();

    useEffect(() => {
        const getConcursos = async () => {
            await api.get('concursos/get/todosConcursos')
            .then((response) => {
                setConcursos(response.data);
            })
        }

        const getCargos = async () => {
            await api.get('cargos/get/todosCargos')
            .then((response) => {
                setCargos(response.data);
            })
        }

        getConcursos();
        getCargos();
    }, []);

    const handleCadastro = async () => {
        if (concursoId && cargoId && especialidade) {
            setCarregando(true);
            setSuccess(false);

            await api.post('/especialidades/post/salvaEspecialidade', {
                descricao: especialidade,
                concurso: concursoId,
                cargo: cargoId
            }, {
                params: {
                    user_cargo_id: user.cargo_id
                }
            })
            .then(() => {
                setConcursoId('');
                setCargoId('');
                setEspecialidade('');
                setSuccess(true);
            })
            .catch(() => {
                setCadastroError('Erro ao cadastrar Especialidade.');
            })
            
            setCarregando(false);
        }
    }

    return (
        <>
            <Head>
                <title>Gabaritou TI - Especialidades</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {carregando && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <DashboardStyle>

                <h3>Cadastrar Especialidade</h3>

                <Form>

                    <Label>Concurso</Label>
                    <Select onChange={(e) => setConcursoId(e.target.value)}>
                        <option>Selecione um Concurso</option>
                        {concursos && concursos.map((concurso) => {
                            return <option value={concurso.id} key={concurso.id}>{concurso.orgao.sigla} - {concurso.ano}</option>
                        })}
                    </Select>

                    <Label>Cargo</Label>
                    <Select onChange={(e) => setCargoId(e.target.value)}>
                        <option>Selecione um Cargo</option>
                        {cargos && cargos.map((cargo) => {
                            if (parseInt(concursoId) === cargo.concurso.id)
                            return <option value={cargo.id} key={cargo.id}>{cargo.descricao}</option>
                        })}
                    </Select>

                    <Label>Especialidade</Label>
                    <Input type='text' value={especialidade} onChange={(e) => setEspecialidade(e.target.value)}></Input>

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

export default EspecialidadesAdd;