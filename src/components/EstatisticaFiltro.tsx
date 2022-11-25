import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { PesquisaSimplesStyle } from '../styles/components/PesquisaSimples.style';
import { AreaConhecimento } from '../types/AreaConhecimento';

interface EstatisticaFiltroProps {
    page: string;
    getDisciplinaAreaId: (areaId: number) => void;
}

const EstatisticaFiltro = (props: EstatisticaFiltroProps) => {

    const { page, getDisciplinaAreaId } = props;

    const [from, setFrom] = useState<Date>();
    const [to, setTo] = useState<Date>();
    const [areas, setAreas] = useState<AreaConhecimento[]>();

    useEffect(() => {
        if (page === 'disciplinas') {
            const getAreas = async () => {
                await api.get('/areas/get/todasAreas')
                .then((response) => {
                    setAreas(response.data);
                })
            }

            getAreas();
        }
    })

    return (
        <PesquisaSimplesStyle>
            <div className='top'>
                <div className='title'>Filtros da Estatística</div>
            </div>

            <div className='options'>
                <div>
                    <label className='txt'>De:</label>
                    <input className='search-input' type='date' onChange={(e) => setFrom(new Date(e.target.value))}></input>
                    <label className='txt'>Até:</label>
                    <input className='search-input' type='date' onChange={(e) => setTo(new Date(e.target.value))}></input>
                </div>

                {page === 'disciplinas' && <div>
                    <label className='txt'>Área de Conhecimento:</label>
                    <select onChange={(e) => getDisciplinaAreaId(parseInt(e.target.value))}>
                        {areas && areas.map((area) => {
                            return (
                                <option key={area.id} value={area.id}>{area.nome}</option>
                            )
                        })}
                    </select>
                </div>}

                <div>
                    <input className='submit-input' type='submit' value='Aplicar Filtro'></input>
                </div>
            </div>
        </PesquisaSimplesStyle>
    )
}

export default EstatisticaFiltro;