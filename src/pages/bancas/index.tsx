import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import Cabecalho from "../../components/Cabecalho";
import CardInfo from "../../components/CardInfo"
import PesquisaSimples from "../../components/PesquisaSimples";
import Rodape from "../../components/Rodape";
import { getApiClient } from "../../services/axios";
import { User } from "../../types/User";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Banca } from "../../types/Banca";
import CarregamentoWidget from "../../components/CarregamentoWidget";
import ReactPaginate from "react-paginate";
import { PaginateStyle } from "../../styles/components/MinimalComponents.style";
import ResponseWidget from "../../components/ResponseWidget";

const Bancas: NextPage<User> = (user) => {

    const [bancas, setBancas] = useState<Banca[]>([]);
    const [termoPesquisa, setTermoPesquisa] = useState<string>('');
    const [numResultados, setNumResultados] = useState<number>(5);
    const [paginaNum, setPaginaNum] = useState<number>(0);

    const [deleted, setDeleted] = useState<Banca>();
    const [success, setSuccess] = useState<boolean>(false);

    const resultadosVisitados: number = paginaNum * numResultados;

    const paginasCount: number = Math.ceil(bancas.length / numResultados);

    useEffect(() => {
        const getBancas = async () => {
            await api.get('/bancas/get/todasBancas')
            .then((response) => {
                setBancas(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getBancas();
    }, [deleted]);

    useEffect(() => {
        if (paginaNum > paginasCount) {
            setPaginaNum(0);
        }
    }, [paginaNum, paginasCount]);

    const getTermoPesquisa = (termoPesquisa: string) => {
        setTermoPesquisa(termoPesquisa);
    }

    const getNumResultados = (numResultados: number) => {
        setNumResultados(numResultados);
    }

    const getDeleted = (deleted: Banca) => {
        setDeleted(deleted);
    }

    const getSuccess = (success: boolean) => {
        setSuccess(success);
    }

    const changePage = (selectedItem: {selected: number}) => {
        setPaginaNum(selectedItem.selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            <Head>
                <title>Gabaritou TI - Bancas Organizadoras</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!bancas && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <BancasStyle>
                <h2>Bancas Organizadoras</h2>

                <PesquisaSimples 
                    user={user}
                    page={'bancas'}
                    getTermoPesquisa={getTermoPesquisa}
                    getNumResultados={getNumResultados}
                />

                {bancas && bancas.filter((value) => {
                    if (termoPesquisa === '' || termoPesquisa === undefined) {
                        return value;
                    }
                    else if (value.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) || value.sigla.toLowerCase().includes(termoPesquisa.toLowerCase()) || value.site.toLowerCase().includes(termoPesquisa.toLowerCase())) {
                        return value;
                    }
                    else {
                        return null;
                    }
                }).slice(resultadosVisitados, (resultadosVisitados + numResultados)).map((banca) => {
                    return (
                        <React.Fragment key={banca.id}>
                            <CardInfo
                                bancaOrgao={banca}
                                user={user}
                                page={'bancas'}
                                disciplina={null}
                                concurso={null}
                                getDeleted={getDeleted}
                                getSuccess={getSuccess}
                            />
                        </React.Fragment>
                    )
                })}

                <PaginateStyle>

                    <ReactPaginate 
                        previousLabel={"Anterior"}
                        nextLabel={"Próximo"}
                        pageCount={paginasCount}
                        onPageChange={changePage}
                        containerClassName={"pagination-btns"}
                        disabledClassName={"disbaled-btn"}
                        activeClassName={"active-btn"}
                        breakClassName={"break"}
                    />

                </PaginateStyle>
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
            props: {}
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
            props: {}
        }
    }

    return {
        props: user
    }
}

export default Bancas;