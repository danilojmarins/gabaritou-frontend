import Link from 'next/link';
import { FC } from 'react';
import { PesquisaSimplesStyle } from '../styles/components/PesquisaSimples.style';
import { User } from '../types/User';

interface PesquisaSimplesPops {
    user: User;
}

const PesquisaSimples: FC<PesquisaSimplesPops> = (props) => {

    const { user } = props;

    return (
        <PesquisaSimplesStyle>
            <div className='top'>
                <div className='title'>Pesquisa Simples</div>
                {(user && user.cargo_id === 3) && <Link href='/bancas/add'><p className='txt link'>Adicionar</p></Link>}
            </div>

            <div className='options'>
                <div>
                    <input className='search-input' type='text' placeholder='Pesquisar...'></input>
                    <input className='submit-input' type='submit' value='Pesquisar'></input>
                </div>

                <div>
                    <label className='txt'>Resultados por página:</label>
                    <select>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
                </div>
            </div>
        </PesquisaSimplesStyle>
    )
}

export default PesquisaSimples;