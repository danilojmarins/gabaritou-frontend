import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket, faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CabecalhoStyle } from '../styles/components/Cabecalho.style';
import { destroyCookie } from 'nookies';
import Router from 'next/router';
import { useState } from 'react';

interface CabecalhoProps {
    loggedIn: boolean;
    cargo: string;
}

const Cabecalho = (props: CabecalhoProps) => {

    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [navContentId, setNavContentId] = useState<string>('');

    const handleLogout = () => {
        destroyCookie(null, 'gabaritou.token');
        Router.push('/');
    }

    const handleMouseOver = (id: string) => {
        setIsHovering(true);
        setNavContentId(id);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
        setNavContentId('');
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
                {props.cargo === 'admin' ?
                    <div className='nav-content' onMouseOver={() => handleMouseOver('adm')} onMouseOut={handleMouseOut}>
                        ADM
                        <FontAwesomeIcon className='logout-icon' icon={faGears} />

                        <div className={(isHovering && navContentId === 'adm') ? 'nav-content-dropdown' : 'nav-content-dropdown hide'}>
                            <p onClick={() => Router.push('/admin/bancas')}>Gerenciar Bancas</p>
                            <p>Gerenciar Provas</p>  
                        </div>
                    </div>
                : null}
            </div>
        </CabecalhoStyle>
    )
}

export default Cabecalho;