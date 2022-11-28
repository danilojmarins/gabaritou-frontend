import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { PesquisaSimplesStyle } from "../styles/components/PesquisaSimples.style";
import { AreaConhecimento } from "../types/AreaConhecimento";
import { Banca } from "../types/Banca";
import { Disciplina } from "../types/Disciplina";
import { Orgao } from "../types/Orgao";
import { User } from "../types/User";

interface FiltroProps {
    user: User;
}

const QuestoesFiltro = (props: FiltroProps) => {

    const { user } = props;

    const [areas, setAreas] = useState<AreaConhecimento[]>();
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();
    const [orgaos, setOrgaos] = useState<Orgao[]>();
    const [bancas, setBancas] = useState<Banca[]>();

    const anos = [];

    let currentYear = new Date().getFullYear();

    while (currentYear >= 2000) {
        anos.push(currentYear);
        currentYear = currentYear - 1;
    }

    useEffect(() => {
        const getAreas = async () => {
            await api.get('/areas/get/todasAreas')
            .then((response) => {
                setAreas(response.data);
            })
        }

        const getDisciplinas = async () => {
            await api.get('/disciplinas/get/todasDisciplinas')
            .then((response) => {
                setDisciplinas(response.data);
            })
        }

        const getOrgaos = async () => {
            await api.get('/orgaos/get/todosOrgaos')
            .then((response) => {
                setOrgaos(response.data);
            })
        }

        const getBancas = async () => {
            await api.get('/bancas/get/todasBancas')
            .then((response) => {
                setBancas(response.data);
            })
        }

        getAreas();
        getDisciplinas();
        getOrgaos();
        getBancas();
    }, []);

    return (
        <PesquisaSimplesStyle>
            <div className='top'>
                <div className='title'>Busque por Questões</div>
                {(user && user.cargo_id === 3) && <Link href={`/questoes/add`}><p className='txt link'>Adicionar</p></Link>}
            </div>

            <div className='options'>
                <div className='flex-item'>
                    <input type='text' className="search-input" placeholder="Pesquisar..."></input>
                </div>

                <div>
                    <select>
                        <option value={0} selected>Área de Conhecimento</option>
                        {areas && areas.map((area) => {
                            return <option key={area.id} value={area.id}>{area.nome}</option>
                        })}
                    </select>
                </div>

                <div>
                    <select>
                        <option value={0} selected>Disciplina</option>
                        {disciplinas && disciplinas.map((disciplina) => {
                            return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                        })}
                    </select>
                </div>

                <div>
                    <select>
                        <option value={0} selected>Órgão</option>
                        {orgaos && orgaos.map((orgao) => {
                            return <option key={orgao.id} value={orgao.id}>{orgao.sigla}</option>
                        })}
                    </select>
                </div>

                <div>
                    <select>
                        <option value={0} selected>Banca</option>
                        {bancas && bancas.map((banca) => {
                            return <option key={banca.id} value={banca.id}>{banca.sigla}</option>
                        })}
                    </select>
                </div>

                <div>
                    <select>
                        <option value={0} selected>Ano</option>
                        {anos && anos.map((ano) => {
                            return <option key={ano} value={ano}>{ano}</option>
                        })}
                    </select>
                </div>

                <div>
                    <input className='submit-input' type='submit' value='Aplicar Filtro'></input>
                </div>
            </div>
        </PesquisaSimplesStyle>
    )
}

export default QuestoesFiltro;