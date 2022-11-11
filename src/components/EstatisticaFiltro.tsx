import { useState } from 'react';
import { PesquisaSimplesStyle } from '../styles/components/PesquisaSimples.style';

const EstatisticaFiltro = () => {

    const [from, setFrom] = useState<Date>();
    const [to, setTo] = useState<Date>();

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

                <div>
                    <input className='submit-input' type='submit' value='Aplicar Filtro'></input>
                </div>
            </div>
        </PesquisaSimplesStyle>
    )
}

export default EstatisticaFiltro;