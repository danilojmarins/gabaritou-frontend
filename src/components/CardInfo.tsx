import Link from 'next/link';
import { FC } from 'react';
import { CardInfoStyle } from '../styles/components/CardInfo.style';
import { Banca } from '../types/Banca';
import { User } from '../types/User';

interface CardInfoPops {
    data: Banca;
    user: User;
}

const CardInfo: FC<CardInfoPops> = (props) => {

    const { data, user } = props;

    return (
        <CardInfoStyle>
            <div className="head">
                <h4 className='link'>{data.sigla} - {data.nome}</h4>
                {(user && user.cargo_id === 3) && <Link href={`/bancas/add/${data.id}`}><h4 className='link'>Editar</h4></Link>}
            </div>

            <div className="row">
                <p className='link'>{data.site}</p>
                <p className='link'>Questões Disponibilizadas:</p>
            </div>
            
            <div className="row last">
                <p className='link'>Número de Concursos:</p>
                <p className='link'>Número de Provas:</p>
            </div>
        </CardInfoStyle>
    )
}

export default CardInfo;