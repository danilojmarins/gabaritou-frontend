import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Cabecalho from "../../components/Cabecalho";
import CarregamentoWidget from "../../components/CarregamentoWidget";
import PesquisaSimples from "../../components/PesquisaSimples";
import ResponseWidget from "../../components/ResponseWidget";
import { api } from "../../services/api";
import { getApiClient } from "../../services/axios";
import { CardInfoStyle } from "../../styles/components/CardInfo.style";
import { PaginateStyle } from "../../styles/components/MinimalComponents.style";
import { BancasStyle } from "../../styles/pages/Bancas.style";
import { ConcursoCargo } from "../../types/ConcursoCargo";
import { Especialidade } from "../../types/Especialidade";
import { User } from "../../types/User";

const Especialidades: NextPage<User> = (user) => {

    const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
    const [termoPesquisa, setTermoPesquisa] = useState<string>('');
    const [numResultados, setNumResultados] = useState<number>(10);

    const [success, setSuccess] = useState(false);
    const [deleted, setDeleted] = useState<ConcursoCargo>();

    const [paginaNum, setPaginaNum] = useState<number>(0);
    const resultadosVisitados: number = paginaNum * numResultados;
    const paginasCount: number = Math.ceil(especialidades.length / numResultados);

    const getTermoPesquisa = (termoPesquisa: string) => {
        setTermoPesquisa(termoPesquisa);
    }

    const getNumResultados = (numResultados: number) => {
        setNumResultados(numResultados);
    }

    useEffect(() => {
        const getEspecialidades = async () => {
            await api.get('/especialidades/get/todasEspecialidades')
            .then((response) => {
                setEspecialidades(response.data);
            })
        }

        getEspecialidades();
    }, [deleted]);

    const handleDelete = async (id: number) => {
        setSuccess(false);

        await api.delete('/especialidades/delete/especialidadePorId', {
            params: {
                id: id,
                user_cargo_id: user.cargo_id
            }
        })
        .then((response) => {
            setDeleted(response.data);
            setSuccess(true);
        })
    }

    const changePage = (selectedItem: {selected: number}) => {
        setPaginaNum(selectedItem.selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        if (paginaNum > paginasCount) {
            setPaginaNum(0);
        }
    }, [paginaNum, paginasCount]);

    return (
        <>
            <Head>
                <title>Gabaritou TI - Cargos de Concursos</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!especialidades && <CarregamentoWidget />}

            {success && <ResponseWidget />}

            <Cabecalho user={user} />

            <BancasStyle>
                <div className="title">
                    <h2>Listagem de Cargos</h2>
                </div>

                <PesquisaSimples
                    user={user}
                    page={'especialidades'}
                    getTermoPesquisa={getTermoPesquisa}
                    getNumResultados={getNumResultados}
                />

                <CardInfoStyle rowBack='#F3F3F3' text='#515151'>
                    <div className="head">
                        <h4 className="justify">Título do Concurso</h4>
                        <h4 className="justify">Cargo</h4>
                        <h4 className="justify">Especialidade</h4>
                        <h4 className="justify"> </h4>
                    </div>

                    {especialidades && especialidades.filter((value) => {
                        if (termoPesquisa === '' || termoPesquisa === undefined) {
                            return value;
                        }
                        else if (
                            value.descricao.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                            value.cargo.descricao.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                            value.concurso.orgao.sigla.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                            value.concurso.ano.toLowerCase().includes(termoPesquisa.toLowerCase())
                        ) {
                            return value;
                        }
                        else {
                            return null;
                        }
                    }).slice(resultadosVisitados, (resultadosVisitados + numResultados)).map((especialidade) => {
                        return (
                            <div className="row list" key={especialidade.id}>
                                <p className="justify">{especialidade.concurso.orgao.sigla} - {especialidade.concurso.ano}</p>
                                <p className="justify">{especialidade.cargo.descricao}</p>
                                <p className="justify">{especialidade.descricao}</p>
                                <p className="justify">
                                    <Link href={`/cargos/add/${especialidade.id}`}><p className='link link-list'> Editar </p></Link> | 
                                    <p className='link link-list' onClick={() => handleDelete(especialidade.id)}> Excluir </p>
                                </p>
                            </div>
                        )
                    })}

                </CardInfoStyle>

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

export default Especialidades;