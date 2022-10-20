import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CabecalhoStyle } from '../styles/components/Cabecalho.style';
import { destroyCookie } from 'nookies';
import Router from 'next/router';

interface CabecalhoProps {
    loggedIn: boolean;
}

const Cabecalho = (props: CabecalhoProps) => {

    const handleLogout = () => {
        destroyCookie(null, 'gabaritou.token');
        Router.push('/');
    }

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
                {props.loggedIn ? <div className='nav-content' onClick={handleLogout} >Logout <FontAwesomeIcon className='logout-icon' icon={faRightFromBracket} /></div> : <div className='nav-content'>Login</div>}
            </div>
        </CabecalhoStyle>
    )
}

export default Cabecalho;