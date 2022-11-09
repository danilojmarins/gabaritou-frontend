import { FC } from 'react';
import { Button } from '../styles/components/MinimalComponents.style';
import { PesquisaSimplesStyle } from '../styles/components/PesquisaSimples.style';
import { User } from '../types/User';

const EstatisticaFiltro: FC = () => {

    return (
        <PesquisaSimplesStyle>
            <div className='top'>
                <div className='title'>Filtros da Estatística</div>
            </div>

            <div className='options'>
                <div>
                    <label className='txt'>De:</label>
                    <input className='search-input' type='date'></input>
                    <label className='txt'>Até:</label>
                    <input className='search-input' type='date'></input>
                </div>

                <div>
                    <input className='submit-input' type='submit' value='Aplicar Filtro'></input>
                </div>
            </div>
        </PesquisaSimplesStyle>
    )
}

export default EstatisticaFiltro;