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
import { User } from "../../../types/User";
import axios from "axios";
import { Concurso } from "../../../types/Concurso";
import { ConcursoCargo } from "../../../types/ConcursoCargo";
import { Especialidade } from "../../../types/Especialidade";
import { Escolaridade } from "../../../types/Escolaridade";
import { TipoQuestao } from "../../../types/TipoQuestao";
import { TipoEspecialidade } from "../../../types/TipoEspecialidade";

const ProvasAdd: NextPage<User> = (user) => {

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [concursos, setConcursos] = useState<Concurso[]>();
    const [cargos, setCargos] = useState<ConcursoCargo[]>();
    const [especialidades, setEspecialidades] = useState<Especialidade[]>();
    const [escolaridades, setEscolaridades] = useState<Escolaridade[]>();
    const [tiposQuestao, setTiposQuestao] = useState<TipoQuestao[]>();
    const [tiposEspecialidade, setTiposEspecialidade] = useState<TipoEspecialidade[]>();


    const [concursoId, setConcursoId] = useState<string>();
    const [cargoId, setCargoId] = useState<string>();
    const [especialidadeId, setEspecialidadeId] = useState<string>();
    const [escolaridadeId, setEscolaridadeId] = useState<string>();
    const [tipoQuestaoId, setTipoQuestaoId] = useState<string>();
    const [tipoEspecialidadeId, setTipoEspecialidadeId] = useState<string>();
    const [prova, setProva] = useState<File | null>(null);
    const [gabarito, setGabarito] = useState<File | null>(null);
    const [gabaritoDefinitivo, setGabaritoDefinitivo] = useState<File | null>(null);
    const [alunoPremium, setAlunoPremium] = useState<boolean>(false);

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

        const getEspecialidades = async () => {
            await api.get('especialidades/get/todasEspecialidades')
            .then((response) => {
                setEspecialidades(response.data);
            })
        }

        const getEscolaridades = async () => {
            await api.get('escolaridades/get/todasEscolaridades')
            .then((response) => {
                setEscolaridades(response.data);
            })
        }

        const getTiposQuestao = async () => {
            await api.get('tiposQuestao/get/todosTipos')
            .then((response) => {
                setTiposQuestao(response.data);
            })
        }

        const getTiposEspecialidade = async () => {
            await api.get('tiposEspecialidade/get/todosTipos')
            .then((response) => {
                setTiposEspecialidade(response.data);
            })
        }

        getConcursos();
        getCargos();
        getEspecialidades();
        getEscolaridades();
        getTiposQuestao();
        getTiposEspecialidade();
    }, []);

    const handleCadastro = async () => {
        if (concursoId && cargoId && especialidadeId && escolaridadeId && tipoQuestaoId && tipoEspecialidadeId && alunoPremium) {

            try {
                const formData = new FormData();

                if (prova)
                formData.append('prova', prova);

                if (gabarito)
                formData.append('gabarito', gabarito);

                setCarregando(true);
                setSuccess(false);

                console.log(formData)

                await axios.post('/api/concursos', formData, {
                    params: {
                        cargo_id: user.cargo_id,
                        file_name: concursoId + cargoId + especialidadeId
                    }
                })
                .then(() => {
                    api.post('/concursos/post/salvaConcurso', {
                        concurso: concursoId,
                        cargo: cargoId,
                        especialidade: especialidadeId,
                        escolaridade: escolaridadeId,
                        tipo_questao: tipoQuestaoId,
                        prova_url: concursoId + cargoId + especialidadeId + prova?.name.substring(prova.name.length, prova.name.lastIndexOf('.')),
                        aluno_premium: alunoPremium
                    }, {
                        params: {
                            user_cargo_id: user.cargo_id
                        }
                    })
                    .then(() => {
                        setConcursoId('');
                        setCargoId('');
                        setEspecialidadeId('');
                        setEscolaridadeId('');
                        setTipoQuestaoId('');
                        setTipoEspecialidadeId('');

                        setSuccess(true);
                        setCadastroError(null);

                        const edital: any = document.getElementById('edital-input');

                        edital.value = '';
                        setProva(null);
                        setGabarito(null);
                        setGabaritoDefinitivo(null);
                    })
                    .catch(() => {
                        setCadastroError('Erro ao cadastrar Prova.');
                    })
                })
                setCarregando(false);
            } catch (error: any) {
                setCadastroError('Erro ao Cadastrar Prova');
            }
        }
    }

    const handleProvaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files){
            setProva(event.target.files[0]);
        }
    };

    const handleGabaritoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files){
            setGabarito(event.target.files[0]);
        }
    };

    const handleGabaritoDefinitivoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files){
            setGabaritoDefinitivo(event.target.files[0]);
        }
    };

    return (
        <>
            <Head>
                <title>Gabaritou TI - Provas</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {carregando && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <DashboardStyle>

                <h3>Cadastrar Concurso</h3>

                <Form>
                    <Label>Concurso</Label>
                    <Select onChange={(e) => setConcursoId(e.target.value)}>
                        <option>Selecione um Concurso</option>
                        {concursos && concursos.map((concurso) => {
                            return <option
                                        value={concurso.id}
                                        key={concurso.id}
                                        selected={concurso.id.toString() === concursoId}>
                                            {concurso.orgao.sigla} - {concurso.ano}
                                    </option>
                        })}
                    </Select>

                    <Label>Cargo</Label>
                    <Select onChange={(e) => setCargoId(e.target.value)}>
                        <option>Selecione um Cargo</option>
                        {cargos && cargos.map((cargo) => {
                            return <option
                                        value={cargo.id}
                                        key={cargo.id}
                                        selected={cargo.id.toString() === cargoId}>
                                            {cargo.descricao}
                                    </option>
                        })}
                    </Select>

                    <Label>Especialidade</Label>
                    <Select onChange={(e) => setEspecialidadeId(e.target.value)}>
                        <option>Selecione uma Especialidade</option>
                        {especialidades && especialidades.map((especialidade) => {
                            return <option
                                        value={especialidade.id}
                                        key={especialidade.id} 
                                        selected={especialidade.id.toString() === especialidadeId}>
                                            {especialidade.descricao}
                                    </option>
                        })}
                    </Select>

                    <Label>Escolaridade</Label>
                    <Select onChange={(e) => setEscolaridadeId(e.target.value)}>
                        <option>Selecione uma Escolaridade</option>
                        {escolaridades && escolaridades.map((escolaridade) => {
                            return <option
                                        value={escolaridade.id}
                                        key={escolaridade.id}
                                        selected={escolaridade.id.toString() === escolaridadeId}>
                                            {escolaridade.descricao}
                                    </option>
                        })}
                    </Select>

                    <Label>Tipo de Questão</Label>
                    <Select onChange={(e) => setEscolaridadeId(e.target.value)}>
                        <option>Selecione o Tipo da Questão</option>
                        {tiposQuestao && tiposQuestao.map((tipo) => {
                            return <option
                                        value={tipo.id}
                                        key={tipo.id}
                                        selected={tipo.id.toString() === tipoQuestaoId}>
                                            {tipo.descricao}
                                    </option>
                        })}
                    </Select>

                    <Label>Tipo de Especialidade</Label>
                    <Select onChange={(e) => setEscolaridadeId(e.target.value)}>
                        <option>Selecione o Tipo de Especialidade</option>
                        {tiposEspecialidade && tiposEspecialidade.map((tipo) => {
                            return <option
                                        value={tipo.id}
                                        key={tipo.id}
                                        selected={tipo.id.toString() === tipoEspecialidadeId}>
                                            {tipo.descricao}
                                    </option>
                        })}
                    </Select>

                    <Label>Prova</Label>
                    <Input type='file' id="edital-input" onChange={handleProvaChange}></Input>

                    <Label>Gabarito</Label>
                    <Input type='file' id="edital-input" onChange={handleGabaritoChange}></Input>

                    <Label>Gabarito Definitivo</Label>
                    <Input type='file' id="edital-input" onChange={handleGabaritoDefinitivoChange}></Input>

                    <Label>Somente Alunos Premium</Label>
                    <Input type='checkbox' onChange={() => setAlunoPremium(!alunoPremium)}></Input>

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

export default ProvasAdd;