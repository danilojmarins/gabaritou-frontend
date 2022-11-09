import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import Cabecalho from "../../components/Cabecalho";
import EstatisticaFiltro from "../../components/EstatisticaFiltro";
import { getApiClient } from "../../services/axios";
import { CardInfoStyle } from "../../styles/components/CardInfo.style";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import { User } from "../../types/User";
import estatisticas from '../../estatisticas.json';

const EstatisticasBanca: NextPage<User> = (user) => {
    return (
        <>
            <Head>
                <title>Gabaritou TI - Estatísticas</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <BancasStyle>
                <h2>Análise Estatística por Banca Organizadora</h2>

                <EstatisticaFiltro />

                <CardInfoStyle rowBack='#F3F3F3' text='#515151'>
                    <div className="head bottom">
                        <h4 className="dado">Tabela de Desempenho Agregado</h4>
                    </div>

                    <div className="head">
                        <h4 className="justify">Banca</h4>
                        <h4 className="justify">Respostas Corretas</h4>
                        <h4 className="justify">Respostas Erradas</h4>
                        <h4 className="justify">Total</h4>
                        <h4 className="justify">Rendimento</h4>
                    </div>

                    {estatisticas.map((banca) => {

                        let total = banca.corretas + banca.erradas;
                        let rendimento: number = parseFloat(((banca.corretas / total) * 100).toFixed(2));

                        return (
                            <div className="row" key={banca.banca}>
                                <p className="justify">{banca.banca}</p>
                                <p className="justify">{banca.corretas}</p>
                                <p className="justify">{banca.erradas}</p>
                                <p className="justify">{total}</p>
                                {(rendimento >= 70) && <p className="justify positivo">{rendimento}%</p>}
                                {(rendimento >= 50) && (rendimento < 70) && <p className="justify medio">{rendimento}%</p>}
                                {(rendimento < 50) && <p className="justify negativo">{rendimento}%</p>}
                            </div>
                        )
                    })}
                </CardInfoStyle>
            </BancasStyle>
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

export default EstatisticasBanca;