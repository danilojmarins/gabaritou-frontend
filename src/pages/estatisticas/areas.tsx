import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import { api } from "../../services/api";
import { getApiClient } from "../../services/axios";
import { User } from "../../types/User";
import { Banca } from "../../types/Banca";
import estatisticas from '../../estatisticasArea.json';
import { BancasStyle } from "../../styles/pages/Bancas.style";
import EstatisticaFiltro from "../../components/EstatisticaFiltro";
import { CardInfoStyle } from "../../styles/components/CardInfo.style";
import GraficoBarras from "../../components/GraficoBarras";
import Rodape from "../../components/Rodape";

const EstatisticasAreas: NextPage<User> = (user) => {

    const [bancas, setBancas] = useState<Banca[]>();

    const [dados, setDados] = useState({
        labels: estatisticas.map((area) => area.area),
        datasets: [{
            label: "Rendimento",
            data: estatisticas.map((area) => {
                let total = area.corretas + area.erradas;
                let rendimento = parseFloat(((area.corretas / total) * 100).toFixed(2));

                return rendimento;
            }),
            backgroundColor: estatisticas.map((area) => {
                let total = area.corretas + area.erradas;
                let rendimento = parseFloat(((area.corretas / total) * 100).toFixed(2));

                if (rendimento >= 70) {
                    return '#8CC63E';
                } else if (rendimento >= 50) {
                    return '#D1C700';
                } else if (rendimento < 50) {
                    return '#E12B2B'
                }
            })
        }]
    })

    const options = {
        plugins: {
            datalabels: {
                formatter: (value: any, ctx: any) => {
                    return value + '%';
                },
                color: '#FFF'
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value: any, index: any, ticks: any) {
                        return value + '%';
                    }
                }
            }
        }
    }

    useEffect(() => {
        const getBancas = async () => {
            await api.get('/areas/get/todasAreas')
            .then((response) => {
                setBancas(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }

        getBancas();
    }, []);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Estatísticas</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <BancasStyle>
                <h2>Análise Estatística por Área de Conhecimento</h2>

                <EstatisticaFiltro
                    page="areas"
                    getDisciplinaAreaId={() => {}}
                />

                <CardInfoStyle rowBack='#F3F3F3' text='#515151'>
                    <div className="head bottom">
                        <h4 className="dado">Tabela de Desempenho Agregado</h4>
                    </div>

                    <div className="head">
                        <h4 className="justify">Área</h4>
                        <h4 className="justify">Respostas Corretas</h4>
                        <h4 className="justify">Respostas Erradas</h4>
                        <h4 className="justify">Total</h4>
                        <h4 className="justify">Rendimento</h4>
                    </div>

                    {estatisticas.map((area) => {

                        let total = area.corretas + area.erradas;
                        let rendimento: number = parseFloat(((area.corretas / total) * 100).toFixed(2));

                        return (
                            <div className="row" key={area.area}>
                                <p className="justify">{area.area}</p>
                                <p className="justify">{area.corretas}</p>
                                <p className="justify">{area.erradas}</p>
                                <p className="justify">{total}</p>
                                {(rendimento >= 70) && <p className="justify positivo">{rendimento}%</p>}
                                {(rendimento >= 50) && (rendimento < 70) && <p className="justify medio">{rendimento}%</p>}
                                {(rendimento < 50) && <p className="justify negativo">{rendimento}%</p>}
                            </div>
                        )
                    })}
                </CardInfoStyle>

                <CardInfoStyle>
                    <div className="head bottom">
                        <h4>Rendimento por Área de Conhecimento</h4>
                    </div>

                    <div className="row grafico">
                        <GraficoBarras dados={dados} options={options} />
                    </div>
                </CardInfoStyle>

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

export default EstatisticasAreas;