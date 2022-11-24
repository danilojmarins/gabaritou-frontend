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
import axios from "axios";
import CarregamentoWidget from "../../../components/CarregamentoWidget";
import ResponseWidget from "../../../components/ResponseWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const EditOrgao: NextPage<User> = (user) => {

    const router = useRouter();
    const { orgao_id } = router.query;

    const [id, setId] = useState<number | null>(null);
    const [sigla, setSigla] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [site, setSite] = useState<string>('');
    const [image, setImage] =  useState<File | null>();

    const [validSigla, setValidSigla] = useState<string | null>(null);
    const [validNome, setValidNome] = useState<string | null>(null);
    const [validSite, setValidSite] = useState<string | null>(null);
    const [validImage, setValidImage] = useState<string | null>(null);

    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const [carregando, setCarregando] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const siglaValidation = (sigla: string) => {
        return /^.{3,}$/.test(sigla);
    }

    const nomeValidation = (nome: string) => {
        return /^.{3,}$/.test(nome);
    }

    const siteValidation = (site: string) => {
        return /^.{3,}$/.test(site);
    }

    const imageValidation = (image: File) => {
        if (image && image.type.includes("image") && image.size <= 500000) {
            return true;
        } else {
            return false;
        }
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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files){
            if (!imageValidation(event.target.files[0])) {
                setValidImage('Arquivo deve ser do tipo imagem e ter menos de 500 KB.');
            } else {
                setValidImage(null);
            }

            setImage(event.target.files[0]);
        }
    };

    const handleEdit = async () => {

        if (!validNome && !validSigla && !validSite && !validImage && image) {

            try {

                const formData = new FormData();
                formData.append('image', image);

                setCarregando(true);
                setSuccess(false);

                await axios.post('/api/orgaos', formData, {
                    params: {
                        cargo_id: user.cargo_id,
                        file_name: sigla
                    }
                })
                .then(() => {

                    api.put('/orgaos/update/orgaoPorId', {
                        nome: nome,
                        sigla: sigla,
                        site: site,
                        img_url: sigla + image.name.substring(image.name.length, image.name.lastIndexOf('.'))
                    }, {
                        params: {
                            id: id,
                            user_cargo_id: user.cargo_id
                        }
                    })
                    .then(() => {
                        setNome('');
                        setSigla('');
                        setSite('');
                        setId(null);
                        setImage(null);
                        setSuccess(true);
                        setCadastroError(null);
                        router.push('orgaos');
                    })
                    .catch(function(err) {
                        setCadastroError('Erro ao editar órgão.');
                    })

                })
                setCarregando(false);
            } catch (error: any) {
                setCadastroError('Erro ao editar órgão.');
            }

        }

    }

    useEffect(() => {
        const getOrgao = async () => {
            await api.get('/orgaos/get/orgaoPorId', {
                params: {
                    id: orgao_id,
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

        getOrgao();
    }, [orgao_id, user.cargo_id]);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Órgãos e Entidades</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {carregando && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <DashboardStyle>

                <QuestaoCardStyle width='60%'>
                    <h3>Editar Órgão</h3>

                    <Form>
                        <Label>Sigla do Órgão</Label>
                        <Input type='text' value={sigla} onChange={handleSiglaChange}></Input>
                        {validSigla && <p className="error">{validSigla}</p>}

                        <Label>Nome Completo do Órgão</Label>
                        <Input type='text' value={nome} onChange={handleNomeChange}></Input>
                        {validNome && <p className="error">{validNome}</p>}

                        <Label>Site do Órgão</Label>
                        <Input type='url' value={site} onChange={handleSiteChange}></Input>
                        {validSite && <p className="error">{validSite}</p>}

                        <Label>Imagem</Label>
                        <Input type='file' name="image" onChange={handleImageChange}></Input>
                        {validImage && <p className="error">{validImage}</p>}

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

export default EditOrgao;