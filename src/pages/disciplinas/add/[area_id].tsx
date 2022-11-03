import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Cabecalho from "../../../components/Cabecalho";
import Rodape from "../../../components/Rodape";
import { api } from "../../../services/api";
import { Button, Form, Input, Label, Table } from "../../../styles/components/MinimalComponents.style";
import { QuestaoCardStyle } from "../../../styles/components/QuestaoCard.style";
import { DashboardStyle } from "../../../styles/pages/Dashboard.style";
import { getApiClient } from "../../../services/axios";
import { destroyCookie, parseCookies } from "nookies";
import Head from "next/head";
import { User } from "../../../types/User";
import { useRouter } from "next/router";

const EditDisciplina: NextPage<User> = (user) => {

    const router = useRouter();
    const { area_id } = router.query;

    const [id, setId] = useState<number | null>(null);
    const [nome, setNome] = useState<string>('');

    const [validNome, setValidNome] = useState<string | null>(null);

    const nomeValidation = (nome: string) => {
        return /^.{3,}$/.test(nome);
    }

    const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!nomeValidation(event.target.value)) {
          setValidNome('Nome deve ter ao menos 3 caracteres.');
        } else {
          setValidNome(null);
        }
    
        setNome(event.target.value);
    };

    const handleCadastro = async (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validNome) {
            await api.post('/disciplinas/post/salvaArea', {     
                id: id,
                nome: nome,
            }, {
                params: {
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                setNome('');
                setId(null);
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        const getArea = async () => {
            await api.get('/disciplinas/get/areaPorId', {
                params: {
                    id: area_id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                setId(response.data.id);
                setNome(response.data.nome);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getArea();
    }, [area_id, user.cargo_id]);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Bancas Organizadoras</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <DashboardStyle>

                <QuestaoCardStyle width='60%'>
                    <h3>Editar Área de Conhecimento</h3>

                    <Form>
                        <Label>Área de Conhecimento</Label>
                        <Input type='text' value={nome} onChange={handleNomeChange}></Input>
                        {validNome && <p className="error">{validNome}</p>}
                    </Form>

                    <Button className="button" onClick={(e) => handleCadastro(e)}>Salvar</Button>

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

export default EditDisciplina;