import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import { api } from "../../services/api";
import { Button, Form, Input, Label, Table } from "../../styles/components/MinimalComponents.style";
import { QuestaoCardStyle } from "../../styles/components/QuestaoCard.style";
import { DashboardStyle } from "../../styles/pages/Dashboard.style";
import { getApiClient } from "../../services/axios";
import { destroyCookie, parseCookies } from "nookies";

interface User {
    id: string;
    nome: string;
    email: string;
    email_confirmado: boolean;
    cargo: string;
}

const Bancas: NextPage = () => {

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
    const [bancas, setBancas] = useState<Bancas[]>([]);

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
            await api.post('/bancas', {
                id: id,
                nome: nome,
                sigla: sigla,
                site: site,
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
        const getBancas = async () => {
            await api.get('/bancas')
            .then((response) => {
                setBancas(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getBancas();
    }, [bancaSalva]);

    const handleEdit = (banca: Bancas) => {
        setId(banca.id);
        setSigla(banca.sigla);
        setNome(banca.nome);
        setSite(banca.site);
    }

    const handleDelete = async (id: number) => {
        await api.delete('/bancas', {
            params: {
                id: id
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
            <Cabecalho loggedIn={true} cargo='admin' />

            <DashboardStyle>

                <QuestaoCardStyle width='60%'>
                    <h3>Cadastrar Banca</h3>

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

                    <Button className="button" onClick={(e) => handleCadastro(e)}>Cadastrar</Button>

                </QuestaoCardStyle>

                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SIGLA</th>
                            <th>NOME</th>
                            <th>SITE</th>
                            <th>OPÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bancas.map(banca => {
                            return (
                                <tr key={banca.id}>
                                    <td>{banca.id}</td>
                                    <td>{banca.sigla}</td>
                                    <td>{banca.nome}</td>
                                    <td>{banca.site}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faPenToSquare} className='edit-icon' onClick={() => handleEdit(banca)} />
                                        <FontAwesomeIcon icon={faTrashCan} className='delete-icon' onClick={() => handleDelete(banca.id)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

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

    await apiClient.get('/usuarios').then(response => {
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

    if (user.cargo === 'aluno') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: { user }
    }
}

export default Bancas;