import { QuestaoCardStyle } from '../styles/components/QuestaoCard.style';
import { Questao } from '../types/Questão';

interface QuestaoCardProps {
    questao: Questao;
}

const QuestaoCard = (props: QuestaoCardProps) => {

    const { id, texto, alternativas, gabarito, ano, tipo_id, banca_id, orgao_id, area_conhecimento_id, disciplina_id } = props.questao;

    return (
        <QuestaoCardStyle width='100%'>
            <p className='orgao'>Banca: {banca_id} ({ano})</p>

            <p className='enunciado'>
                {texto}
            </p>

            <p className='orientacao'>{texto}</p>

            <div className='alternativas'>

                {alternativas.map((alternativa) => {
                    return (
                        <div key={alternativa.letra} className='alternativa'>
                            <input type='radio'></input>
                            {alternativa.letra}) {alternativa.texto}
                        </div>
                    )
                })}
                
            </div>
        </QuestaoCardStyle>
    )
}

export default QuestaoCard;