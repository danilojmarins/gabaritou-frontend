import Link from 'next/link';
import { FC, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { CardInfoStyle } from '../styles/components/CardInfo.style';
import { Banca } from '../types/Banca';
import { User } from '../types/User';
import { Orgao } from '../types/Orgao';
import { Disciplina } from '../types/Disciplina';
import { api } from '../services/api';

interface CardInfoProps {
    disciplina: Disciplina | null;
    bancaOrgao: Banca | Orgao | null;
    user: User;
    page: string;
    getDeleted: (deleted: Banca | Orgao) => void;
    getSuccess: (success: boolean) => void;
}

const CardInfo: FC<CardInfoProps> = (props) => {

    const { disciplina, bancaOrgao, user, page, getDeleted, getSuccess } = props;

    const handleDelete = async (id: number | undefined) => {
        if (page === 'orgaos') {
            getSuccess(false);
            await api.delete('/orgaos/delete/orgaoPorId', {
                params: {
                    id: id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                getDeleted(response.data);
                getSuccess(true);
            })
            .catch(function(err) {
                console.log(err);
            })
        }
        else if (page === 'bancas') {
            getSuccess(false);
            await api.delete('/bancas/delete/bancaPorId', {
                params: {
                    id: id,
                    user_cargo_id: user.cargo_id
                }
            })
            .then((response) => {
                getDeleted(response.data);
                getSuccess(true);
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    }

    if (page === 'bancas' || page === 'orgaos') {
        return (
            <CardInfoStyle>
                <div className="head">
                    <h4 className='link'>{bancaOrgao?.sigla} - {bancaOrgao?.nome}</h4>
                    <div>
                        {(user && user.cargo_id === 3) && <Link href={`/${page}/add/${bancaOrgao?.id}`}><h4 className='link option edit'><FontAwesomeIcon className='icon' icon={faPenToSquare} />Editar</h4></Link>}
                        {(user && user.cargo_id === 3) && <h4 className='link option delete' onClick={() => {handleDelete(bancaOrgao?.id)}}><FontAwesomeIcon className='icon' icon={faTrashCan} />Excluir</h4>}
                    </div>
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