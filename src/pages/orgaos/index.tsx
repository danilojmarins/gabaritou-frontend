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
import { Orgao } from "../../types/Orgao";
import { PaginateStyle } from "../../styles/components/MinimalComponents.style";
import ReactPaginate from "react-paginate";
import CarregamentoWidget from "../../components/CarregamentoWidget";

const Orgaos: NextPage<User> = (user) => {

    const [orgaos, setOrgaos] = useState<Orgao[]>([]);
    const [termoPesquisa, setTermoPesquisa] = useState<string>('');
    const [numResultados, setNumResultados] = useState<number>(5);
    const [paginaNum, setPaginaNum] = useState<number>(0);

    const resultadosVisitados: number = paginaNum * numResultados;

    const paginasCount: number = Math.ceil(orgaos.length / numResultados);

    useEffect(() => {
        const getOrgaos = async () => {
            await api.get('/orgaos/get/todosOrgaos')
            .then((response) => {
                setOrgaos(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }

        getOrgaos();
    }, []);

    const getTermoPesquisa = (termoPesquisa: string) => {
        setTermoPesquisa(termoPesquisa);
    }

    const getNumResultados = (numResultados: number) => {
        setNumResultados(numResultados);
    }

    const changePage = (selectedItem: {selected: number}) => {
        setPaginaNum(selectedItem.selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            <Head>
                <title>Gabaritou TI - Órgãos e Entidades</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!orgaos && <CarregamentoWidget />}

            <Cabecalho user={user} />

            <BancasStyle>
                <h2>Órgãos / Entidades</h2>

                <PesquisaSimples
                    user={user}
                    page={'orgaos'}
                    getTermoPesquisa={getTermoPesquisa}
                    getNumResultados={getNumResultados}
                />

                {orgaos && orgaos.filter((value) => {
                    if (termoPesquisa === '' || termoPesquisa === undefined) {
                        return value;
                    }
                    else if (value.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) || value.sigla.toLowerCase().includes(termoPesquisa.toLowerCase()) || value.site.toLowerCase().includes(termoPesquisa.toLowerCase())) {
                        return value;
                    }
                    else {
                        return null;
                    }
                }).slice(resultadosVisitados, (resultadosVisitados + numResultados)).map((orgao) => {
                    return (
                        <React.Fragment key={orgao.id}>
                            <CardInfo bancaOrgao={orgao} user={user} page={'orgaos'} area={null} />
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

export default Orgaos;