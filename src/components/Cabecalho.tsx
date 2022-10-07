import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CabecalhoStyle } from '../styles/components/Cabecalho.style';

const Cabecalho = () => {
    return (
        <CabecalhoStyle>
            <div className="logo">
                <h1>Gabaritou</h1>
                <FontAwesomeIcon icon={faSquareCheck} className='icon' />
            </div>

            <div className='navbar'>
                <div className='nav-content'>Questões</div>
                <div className='nav-content'>Simulado</div>
                <div className='nav-content'>Bancas</div>
                <div className='nav-content'>Login</div>
            </div>
        </CabecalhoStyle>
    )
}

export default Cabecalho;