import Link from 'next/link';
import { RodapeStyle } from '../styles/components/Rodape.style';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rodape = () => {
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
        </RodapeStyle>
    )
}

export default Rodape;