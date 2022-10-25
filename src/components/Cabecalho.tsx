import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faGears, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { CabecalhoStyle } from '../styles/components/Cabecalho.style';
import { destroyCookie } from 'nookies';
import Router from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

            <div className='nav-info'>
                {props.loggedIn ? 
                    <a className='space' onClick={handleLogout} >Logout <FontAwesomeIcon icon={faRightFromBracket} /></a>
                :
                    <>
                        <Link href='/login'>
                            <a className='space'>Cadastrar</a>
                        </Link>
                        <Link href='/login'>
                            <a className='space'>Entrar</a>
                        </Link>
                    </>
                }
                <a href='/contato'>Contato</a>
                <a href='https://facebook.com/gabaritou'><FontAwesomeIcon icon={faFacebookF} width='10px' /></a>
            </div>

            <div className='nav-menu'>
                <a href='/home' className="logo">
                    <Image className='img' src='/images/marca/logo-gabaritou.png' alt='logo gabaritou' width={213} height={60} />
                </a>

                <div className='navbar'>
                    <div className='nav-content'>Questões</div>
                    <div className='nav-content'>Provas</div>
                    <div className='nav-content'>Concursos</div>
                    <div className='nav-content'>Disciplinas</div>
                    <div className='nav-content'>Órgãos</div>
                    <div className='nav-content'>Bancas</div>
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
            </div>
        </CabecalhoStyle>
    )
}

export default Cabecalho;