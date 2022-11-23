import Link from 'next/link';
import { FC } from 'react';
import { CardInfoStyle } from '../styles/components/CardInfo.style';
import { Banca } from '../types/Banca';
import { User } from '../types/User';
import { Orgao } from '../types/Orgao';
import { Disciplina } from '../types/Disciplina';

interface CardInfoProps {
    disciplina: Disciplina | null;
    bancaOrgao: Banca | Orgao | null;
    user: User;
    page: string;
}

const CardInfo: FC<CardInfoProps> = (props) => {

    const { disciplina, bancaOrgao, user, page } = props;

    if (page === 'bancas' || page === 'orgaos') {
        return (
            <CardInfoStyle>
                <div className="head">
                    <h4 className='link'>{bancaOrgao?.sigla} - {bancaOrgao?.nome}</h4>
                    {(user && user.cargo_id === 3) && <Link href={`/${page}/add/${bancaOrgao?.id}`}><h4 className='link'>Editar</h4></Link>}
                </div>

                <div className="row">
                    <p className='link'>{bancaOrgao?.site}</p>
                    <p className='link'>Questões Disponibilizadas:</p>
                </div>
                
                <div className="row last">
                    <p className='link'>Número de Concursos:</p>
                    <p className='link'>Número de Provas:</p>
                </div>
            </CardInfoStyle>
        )
    }

    else if (page === 'disciplinas') {
        return (
            <CardInfoStyle>
                <div className="head">
                    <Link href={`/${page}/${disciplina?.id}`}><h4 className='link'>{disciplina?.nome}</h4></Link>
                    {(user && user.cargo_id === 3) && <Link href={`/${page}/add/${disciplina?.id}`}><h4 className='link'>Editar</h4></Link>}
                </div>

                <div className="row last">
                    <p className='link'>Número de Questões:</p>
                    <p className='link'>Questões Disponibilizadas:</p>
                </div>
            </CardInfoStyle>
        )
    }

    else return null;
}

export default CardInfo;