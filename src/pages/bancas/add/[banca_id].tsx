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

const EditBanca: NextPage<User> = (user) => {

    const router = useRouter();
    const { banca_id } = router.query;

    interface Bancas {
        id: number;
        nome: string;
        sigla: string;
        site: string;
    }

    const [id, setId] = useState<number | null>(null);
    const [sigla, setSigla] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [site, setSite] = useState<string>('');

    const [validSigla, setValidSigla] = useState<string | null>(null);
    const [validNome, setValidNome] = useState<string | null>(null);
    const [validSite, setValidSite] = useState<string | null>(null);

    const [bancaSalva, setBancaSalva] = useState<Bancas[]>([]);

    const siglaValidation = (sigla: string) => {
        return /^.{3,}$/.test(sigla);
    }

    const nomeValidation = (nome: string) => {
        return /^.{3,}$/.test(nome);
    }

    const siteValidation = (site: string) => {
        return /^.{3,}$/.test(site);
    }

    const handleSiglaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!siglaValidation(event.target.value)) {
          setValidSigla('Sigla deve ter ao menos 3 caracteres.');
        } else {
          setValidSigla(null);
        }
    
        setSigla(event.target.value);
    };

    const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!nomeValidation(event.target.value)) {
          setValidNome('Nome deve ter ao menos 3 caracteres.');
        } else {
          setValidNome(null);
        }
    
        setNome(event.target.value);
    };

    const handleSiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!siteValidation(event.target.value)) {
          setValidSite('Site deve ter ao menos 3 caracteres.');
        } else {
          setValidSite(null);
        }
    
        setSite(event.target.value);
    };

    const handleCadastro = async (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validNome && !validSigla && !validSite) {
            await api.post('/bancas/post/salvaBanca', {
                id: id,
                nome: nome,
                sigla: sigla,
                site: site,
            }, {
                params: {
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                setNome('');
                setSigla('');
                setSite('');
                setId(null);
                setBancaSalva(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        const getBanca = async () => {
            await api.get('/bancas/get/bancaPorId', {
                params: {
                    id: banca_id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                setId(response.data.id);
                setSigla(response.data.sigla);
                setNome(response.data.nome);
                setSite(response.data.site);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getBanca();
    }, [bancaSalva, banca_id, user.cargo_id]);

    const handleDelete = async (id: number) => {
        await api.delete('/bancas/delete/bancaPorId', {
            params: {
                id: id,
                user_cargo_id: user.cargo_id
            }
        })
        .then((response) => {
            setBancaSalva(response.data);
        })
        .catch(function(err) {
            console.log(err);
        })
    }

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
                    <h3>Editar Banca</h3>

                    <Form>
                        <Label>Sigla da Banca</Label>
                        <Input type='text' value={sigla} onChange={handleSiglaChange}></Input>
                        {validSigla && <p className="error">{validSigla}</p>}

                        <Label>Nome Completo da Banca</Label>
                        <Input type='text' value={nome} onChange={handleNomeChange}></Input>
                        {validNome && <p className="error">{validNome}</p>}

                        <Label>Site da Banca</Label>
                        <Input type='url' value={site} onChange={handleSiteChange}></Input>
                        {validSite && <p className="error">{validSite}</p>}
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

export default EditBanca;