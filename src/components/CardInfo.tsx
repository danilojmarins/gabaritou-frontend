import { CardInfoStyle } from '../styles/components/CardInfo.style';

const CardInfo = () => {
    return (
        <CardInfoStyle>
            <div className="head">
                <h4 className='link'>Nome Banca</h4>
                <h4 className='link'>Editar</h4>
            </div>

            <div className="row">
                <p className='link'>https://site.com.br/</p>
                <p className='link'>Questões Disponibilizadas</p>
            </div>
            
            <div className="row last">
                <p className='link'>https://site.com.br/</p>
                <p className='link'>Questões Disponibilizadas</p>
            </div>
        </CardInfoStyle>
    )
}

export default CardInfo;