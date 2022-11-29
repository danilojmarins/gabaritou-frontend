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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import CarregamentoWidget from "../../../components/CarregamentoWidget";
import ResponseWidget from "../../../components/ResponseWidget";
import { Disciplina } from "../../../types/Disciplina";
import { Orgao } from "../../../types/Orgao";
import { Banca } from "../../../types/Banca";

const QuestoesAdd: NextPage<User> = (user) => {

    const [areaId, setAreaId] = useState<string | null>(null);
    const [disciplina, setDisciplina] = useState<string>('');

    const [validDisciplina, setValidDisciplina] = useState<string | null>(null);

    const [areas, setAreas] = useState<AreaConhecimento[]>();
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();
    const [orgaos, setOrgaos] = useState<Orgao[]>();
    const [bancas, setBancas] = useState<Banca[]>();
    const [ano, setAno] = useState<string | undefined>();
    const [tipo, setTipo] = useState<string | undefined>();

    const anos = [];

    let currentYear = new Date().getFullYear();

    while (currentYear >= 2000) {
        anos.push(currentYear);
        currentYear = currentYear - 1;
    }

    const [alternativasIndex, setAlternativasIndex] = useState<number>(2);
    const [alternativas, setAlternativas] = useState<string[]>(['A']);

    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const getAreas = async () => {
            await api.get('/areas/get/todasAreas')
            .then((response) => {
                setAreas(response.data);
            })
        }

        const getDisciplinas = async () => {
            await api.get('/disciplinas/get/todasDisciplinas')
            .then((response) => {
                setDisciplinas(response.data);
            })
        }

        const getOrgaos = async () => {
            await api.get('/orgaos/get/todosOrgaos')
            .then((response) => {
                setOrgaos(response.data);
            })
        }

        const getBancas = async () => {
            await api.get('/bancas/get/todasBancas')
            .then((response) => {
                setBancas(response.data);
            })
        }

        getAreas();
        getDisciplinas();
        getOrgaos();
        getBancas();
    }, []);

    console.log(alternativas);

    const disciplinaValidation = (nome: string) => {
        return /^.{3,}$/.test(nome);
    }

    const handleDisciplinaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            await api.post('/disciplinas/post/salvaDisciplina', {
                nome: disciplina,
                area_id: areaId,
            }, {
                params: {
                    user_cargo_id: user.cargo_id
                }
            })
            .then(() => {
                setDisciplina('');
                setAreaId(null);
                setSuccess(true);
            })
            .catch(function(err) {
                console.log(err);
                setCadastroError('Erro ao adicionar disciplina.')
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

            {!areas && !disciplinas && !orgaos && !bancas && <CarregamentoWidget />}

            {carregando && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <DashboardStyle>

                <QuestaoCardStyle width='60%'>
                    <h3>Cadastrar Questão</h3>

                    <Form>
                        <Label>Área de Conhecimento</Label>
                        <Select onChange={(e) => setAreaId(e.target.value)}>
                            <option selected value={undefined}>Selecione uma Área de Conhecimento</option>
                            {areas && areas.map((area) => {
                                return <option key={area.id} value={area.id}>{area.nome}</option>
                            })}
                        </Select>

                        <Label>Disciplina</Label>
                        <Select onChange={(e) => setAreaId(e.target.value)}>
                            <option selected value={undefined}>Selecione uma Disciplina</option>
                            {disciplinas && disciplinas.map((disciplina) => {
                                return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                            })}
                        </Select>

                        <Label>Órgão</Label>
                        <Select onChange={(e) => setAreaId(e.target.value)}>
                            <option selected value={undefined}>Selecione um Órgão</option>
                            {orgaos && orgaos.map((orgao) => {
                                return <option key={orgao.id} value={orgao.id}>{orgao.sigla}</option>
                            })}
                        </Select>

                        <Label>Banca</Label>
                        <Select onChange={(e) => setAreaId(e.target.value)}>
                            <option selected value={undefined}>Selecione uma Banca</option>
                            {bancas && bancas.map((banca) => {
                                return <option key={banca.id} value={banca.id}>{banca.sigla}</option>
                            })}
                        </Select>

                        <Label>Ano</Label>
                        <Select onChange={(e) => setAreaId(e.target.value)}>
                            <option selected value={undefined}>Selecione um Ano</option>
                            {anos && anos.map((ano) => {
                                return <option key={ano} value={ano}>{ano}</option>
                            })}
                        </Select>

                        <Label>Texto</Label>
                        <Input as='textarea' value={disciplina} onChange={handleDisciplinaChange}></Input>

                        <Label>Tipo da Questão</Label>
                        <Select onChange={(e) => setTipo(e.target.value)}>
                            <option selected value={0}>Tipo</option>
                            <option value={1}>Múltipla-Escolha</option>
                            <option value={2}>Certo ou Errado</option>
                        </Select>

                        {(tipo ===  '1') && <>
                            <Label>
                                Alternativas
                                <FontAwesomeIcon className="alternativa-btn" width={'20px'} icon={faMinus} onClick={() => {
                                    if (alternativasIndex > 2) {
                                        setAlternativasIndex(alternativasIndex - 1);
                                        alternativas.pop();
                                    }
                                }} />
                                <FontAwesomeIcon className="alternativa-btn" width={'20px'} icon={faPlus} onClick={() => {
                                    if (alternativasIndex > 1) {
                                        setAlternativasIndex(alternativasIndex + 1);
                                        alternativas.push(String.fromCharCode(alternativasIndex + 64));
                                    }
                                }} />
                            </Label>

                            {alternativas.map((alternativa) => {
                                return (
                                    <Label key={alternativa}>
                                        {alternativa}
                                        <Input className="alternativa" type={'text'}></Input>
                                    </Label>
                                )   
                            })}
                        </>}

                        {(tipo === '1') && <>
                            <Label>Gabarito</Label>
                            <Select>
                                {alternativas.map((alternativa) => {
                                    return <option key={alternativa}>{alternativa}</option>
                                })}
                            </Select>
                        </>}

                        {(tipo === '2') && <>
                            <Label>Gabarito</Label>
                            <Select>
                                <option>Certo</option>
                                <option>Errado</option>
                            </Select>
                        </>}
                         
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

export default QuestoesAdd;