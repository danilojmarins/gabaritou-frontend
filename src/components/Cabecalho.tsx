import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { CabecalhoStyle } from '../styles/components/Cabecalho.style';
import { destroyCookie } from 'nookies';
import Router from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Cabecalho = ({ user }: any) => {

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
                {(user && user.nome) ?
                    <>
                        <Link href='/perfil'>
                            <a className='space'>{user.nome}</a>
                        </Link>
                        <a className='space' onClick={handleLogout} >Logout</a>
                    </>
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
                <Link href='/'>
                    <a className="logo">
                        <Image className='img' src='/images/marca/logo-gabaritou.png' alt='logo gabaritou' width={213} height={60} />
                    </a>
                </Link>

                <div className='navbar'>
                    <Link href={'/questoes'}>
                        <div className='nav-content'>Questões</div>
                    </Link>
                    <div className='nav-content'>Provas</div>
                    <div className='nav-content'>Concursos</div>
                    <Link href={'/disciplinas'}>
                        <div className='nav-content'>Disciplinas</div>
                    </Link>
                    <Link href={'/orgaos'}>
                        <div className='nav-content'>Órgãos</div>
                    </Link>
                    <Link href={'/bancas'}>
                        <div className='nav-content'>Bancas</div>
                    </Link>
                </div>
            </div>
        </CabecalhoStyle>
    )
}

export default Cabecalho;