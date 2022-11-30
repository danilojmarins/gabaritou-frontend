import { QuestaoCardStyle } from '../styles/components/QuestaoCard.style';
import { Questao } from '../types/Questão';

interface QuestaoCardProps {
    questao: Questao;
}

const QuestaoCard = (props: QuestaoCardProps) => {

    const { id, texto, alternativas } = props.questao;

    return (
        <QuestaoCardStyle width='100%'>
            <p className='orgao'>Banca: LOREM IMPSUM (2022)</p>

            <p className='enunciado'>
                {texto}
            </p>

            <p className='orientacao'>{texto}</p>

            <div className='alternativas'>

                {alternativas.map((alternativa) => {
                    return (
                        <div key={alternativa.alternativa} className='alternativa'>
                            <input type='radio'></input>
                            {alternativa.alternativa}) {alternativa.texto}
                        </div>
                    )
                })}
                
            </div>
        </QuestaoCardStyle>
    )
}

export default QuestaoCard;