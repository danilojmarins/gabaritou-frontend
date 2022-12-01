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
    const [disciplinaId, setDisciplinaId] = useState<string | null>(null);
    const [orgaoId, setOrgaoId] = useState<string | null>(null);
    const [bancaId, setBancaId] = useState<string | null>(null);
    const [ano, setAno] = useState<string | null>(null);
    const [texto, setTexto] = useState<string>('');
    const [tipo, setTipo] = useState<string | null>(null);
    const [alternativas, setAlternativas] = useState<Array<object>>([{}]);
    const [gabarito, setGabarito] = useState<string | null>(null);


    const [areas, setAreas] = useState<AreaConhecimento[]>();
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();
    const [orgaos, setOrgaos] = useState<Orgao[]>();
    const [bancas, setBancas] = useState<Banca[]>();

    const anos = [];

    let currentYear = new Date().getFullYear();

    while (currentYear >= 2000) {
        anos.push(currentYear);
        currentYear = currentYear - 1;
    }

    const [letrasIndex, setLetrasIndex] = useState<number>(2);
    const [letras, setLetras] = useState<string[]>(['A']);

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

    const handleCadastro = async (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (areaId && disciplinaId && orgaoId && bancaId && ano && texto && tipo && alternativas && gabarito) {
            setSuccess(false);
            setCarregando(true);
            await api.post('/questoes/post/salvaQuestao', {
                area_conhecimento_id: areaId,
                disciplina_id: disciplinaId,
                orgao_id: orgaoId,
                banca_id: bancaId,
                ano: ano,
                texto: texto,
                tipo_id: tipo,
                alternativas: alternativas,
                gabarito: gabarito
            }, {
                params: {
                    user_cargo_id: user.cargo_id
                }
            })
            .then(() => {
                setAreaId(null);
                setDisciplinaId(null);
                setOrgaoId(null);
                setBancaId(null);
                setAno(null);
                setTexto('');
                setTipo(null);
                setAlternativas([{}]);
                setGabarito(null);
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
                            <option selected>Selecione uma Área de Conhecimento</option>
                            {areas && areas.map((area) => {
                                return <option key={area.id} value={area.id}>{area.nome}</option>
                            })}
                        </Select>

                        <Label>Disciplina</Label>
                        <Select onChange={(e) => setDisciplinaId(e.target.value)}>
                            <option selected value={undefined}>Selecione uma Disciplina</option>
                            {disciplinas && disciplinas.map((disciplina) => {
                                if (parseInt(areaId!) === disciplina.area_id)
                                return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                            })}
                        </Select>

                        <Label>Órgão</Label>
                        <Select onChange={(e) => setOrgaoId(e.target.value)}>
                            <option selected value={undefined}>Selecione um Órgão</option>
                            {orgaos && orgaos.map((orgao) => {
                                return <option key={orgao.id} value={orgao.id}>{orgao.sigla}</option>
                            })}
                        </Select>

                        <Label>Banca</Label>
                        <Select onChange={(e) => setBancaId(e.target.value)}>
                            <option selected value={undefined}>Selecione uma Banca</option>
                            {bancas && bancas.map((banca) => {
                                return <option key={banca.id} value={banca.id}>{banca.sigla}</option>
                            })}
                        </Select>

                        <Label>Ano</Label>
                        <Select onChange={(e) => setAno(e.target.value)}>
                            <option selected value={undefined}>Selecione um Ano</option>
                            {anos && anos.map((ano) => {
                                return <option key={ano} value={ano}>{ano}</option>
                            })}
                        </Select>

                        <Label>Texto</Label>
                        <Input as='textarea' value={texto} onChange={(e) => setTexto(e.target.value)}></Input>

                        <Label>Tipo da Questão</Label>
                        <Select onChange={(e) => {
                            setTipo(e.target.value)
                            if (e.target.value === '1') {
                                setAlternativas([{}]);
                                setLetras(['A']);
                                setLetrasIndex(2);
                            }
                            else if (e.target.value === '2') {
                                setAlternativas([{ letra: 'Certo', texto: 'Certo' }, { letra: 'Errado', texto: 'Errado' }])
                            }
                        }}>
                            <option selected value={undefined}>Tipo</option>
                            <option value={1}>Múltipla-Escolha</option>
                            <option value={2}>Certo ou Errado</option>
                        </Select>

                        {(tipo ===  '1') && <>
                            <Label>
                                Alternativas
                                <FontAwesomeIcon className="alternativa-btn" width={'20px'} icon={faMinus} onClick={() => {
                                    if (letrasIndex > 2) {
                                        setLetrasIndex(letrasIndex - 1);
                                        letras.pop();
                                        alternativas.pop();
                                    }
                                }} />
                                <FontAwesomeIcon className="alternativa-btn" width={'20px'} icon={faPlus} onClick={() => {
                                    if (letrasIndex > 1) {
                                        setLetrasIndex(letrasIndex + 1);
                                        letras.push(String.fromCharCode(letrasIndex + 64));
                                        alternativas.push({});
                                    }
                                }} />
                            </Label>

                            {letras.map((letra, i) => {
                                return (
                                    <Label key={letra}>
                                        {letra}
                                        <Input className="alternativa" type={'text'} onChange={(e) => {
                                            const texto = e.target.value;
                                            alternativas[i] = { letra, texto };
                                        }}></Input>
                                    </Label>
                                )   
                            })}
                        </>}

                        {(tipo === '1') && <>
                            <Label>Gabarito</Label>
                            <Select onChange={(e) => setGabarito(e.target.value)}>
                                {letras.map((letra) => {
                                    return <option key={letra} value={letra}>{letra}</option>
                                })}
                            </Select>
                        </>}

                        {(tipo === '2') && <>
                            <Label>Gabarito</Label>
                            <Select onChange={(e) => setGabarito(e.target.value)}>
                                <option value={'Certo'}>Certo</option>
                                <option value={'Errado'}>Errado</option>
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