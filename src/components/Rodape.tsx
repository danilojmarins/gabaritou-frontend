import Link from 'next/link';
import { RodapeStyle } from '../styles/components/Rodape.style';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rodape = () => {

    const year = new Date().getFullYear();
    
    return (
        <RodapeStyle>
            <div className="footer-containers">
                <div className="content">
                    <h3>Sobre</h3>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                </div>

                <div className="content">
                    <h3>Links Úteis</h3>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                </div>

                <div className="content">
                    <h3>Contato</h3>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                    <div className='link'><FontAwesomeIcon icon={faCaretRight} className='icon' /><Link href='/'>Link</Link></div>
                </div>
            </div>

            <div className='footer-info'>
                <p>© 2009~{year} Gabaritou</p>
                <p>Todos os direitos reservados. Leia nossos Termos & Condições. Os materiais deste site são reservados ao uso individual.</p>
            </div>
        </RodapeStyle>
    )
}

export default Rodape;