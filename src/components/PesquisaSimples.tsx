import Link from 'next/link';
import { PesquisaSimplesStyle } from '../styles/components/PesquisaSimples.style';

const PesquisaSimples = () => {
    return (
        <PesquisaSimplesStyle>
            <div className='top'>
                <div className='title'>Pesquisa Simples</div>
                <Link href='/bancas/add'><p className='txt link'>Adicionar</p></Link>
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