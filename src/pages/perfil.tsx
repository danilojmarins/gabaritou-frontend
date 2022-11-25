import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { getApiClient } from "../services/axios";
import { CardInfoStyle } from "../styles/components/CardInfo.style";
import { ColocacaoCard, PageTitle } from "../styles/components/MinimalComponents.style";
import { BancasStyle } from "../styles/pages/Bancas.style";
import { PerfilStyle } from "../styles/pages/Perfil.style";
import { User } from "../types/User";

const Perfil: NextPage<User> = (user) => {
    return (
        <>
            <Head>
                <title>Gabaritou TI - Perfil</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <BancasStyle>
                <PageTitle>Perfil do Usuário</PageTitle>

                <div className="flex">
                    <CardInfoStyle text={"#515151"} width={"800px"}>
                        <div className="head">
                            <div><ColocacaoCard>100°</ColocacaoCard><h4>{user.nome}</h4></div>
                            <h4 className="link">Atualizar</h4>
                        </div>
                        <div className="row">
                            <p>Data do Cadastro: <span className="dado">00/00/00</span></p>
                            <p>Validade da Assinatura: <span className="dado">00/00/00</span></p>
                        </div>
                        <div className="row last">
                            <p>E-mail: <span className="dado">{user.email}</span></p>
                            <p>Nascimento: <span className="dado">Não Informado</span></p>
                        </div>
                    </CardInfoStyle>

                    <CardInfoStyle text={"#515151"} rowBack={"F3F3F3"} width={"500px"}>
                        <div className="head">
                            <p><span className="dado">Sobre o seu Plano</span></p>
                            <p className="link">Renove sua Assinatura</p>
                        </div>
                        <div className="row-perfil bottom">
                            <p>Plano Atual: </p>
                            <p>Status: </p>
                        </div>
                        <div className="head">
                            <p><span className="dado">Desempenho Goblal</span></p>
                        </div>
                        <div className="row-perfil">
                            <p>Corretas: </p>
                            <p>Erradas: </p>
                        </div>
                        <div className="row-perfil bottom">
                            <p>Respondidas: </p>
                            <p>Desempenho: </p>
                        </div>
                        <div className="head">
                            <p><span className="dado">Minhas Estatísticas</span></p>
                        </div>
                        <div className="row-perfil">
                            <Link href={'/estatisticas/banca'}>
                                <p className="link">Banca</p>
                            </Link>
                            <Link href={'/estatisticas/disciplinas'}>
                                <p className="link">Disciplina</p>
                            </Link>
                        </div>
                        <div className="row-perfil">
                            <Link href={'/estatisticas/areas'}>
                                <p className="link">Área de Conhecimento</p>
                            </Link>
                            <p className="link">Benchmark</p>
                        </div>
                        <div className="row-perfil last">
                            <p className="link">Snapshot</p>
                        </div>
                    </CardInfoStyle>
                </div>
            </BancasStyle>

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

    return {
        props: user
    }
}

export default Perfil;