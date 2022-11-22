import Link from 'next/link';
import { PesquisaSimplesStyle } from '../styles/components/PesquisaSimples.style';
import { User } from '../types/User';

interface PesquisaSimplesProps {
    user: User;
    page: string;
    getTermoPesquisa: (termoPesquisa: string) => void;
    getNumResultados: (numResultados: number) => void;
}

const PesquisaSimples = (props: PesquisaSimplesProps) => {

    const { user, page } = props;

    return (
        <PesquisaSimplesStyle>
            <div className='top'>
                <div className='title'>Pesquisa Simples</div>
                {(user && user.cargo_id === 3) && <Link href={`/${page}/add`}><p className='txt link'>Adicionar</p></Link>}
            </div>

            <div className='options'>
                <div>
                    <input className='search-input' type='text' placeholder='Pesquisar...' onChange={(e) => {props.getTermoPesquisa(e.target.value)}}></input>
                    <input className='submit-input' type='submit' value='Pesquisar' onClick={() => {}}></input>
                </div>

                <div>
                    <label className='txt'>Resultados por página:</label>
                    <select onChange={(e) => {props.getNumResultados(parseInt(e.target.value))}}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
        </PesquisaSimplesStyle>
    )
}

export default PesquisaSimples;