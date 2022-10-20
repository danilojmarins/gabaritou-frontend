import { QuestaoCardStyle } from '../styles/components/QuestaoCard.style';

const QuestaoCard = () => {
    return (
        <QuestaoCardStyle>
            <p className='orgao'>Banca: LOREM IMPSUM (2022)</p>

            <p className='enunciado'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <p className='orientacao'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod:</p>

            <div className='alternativas'>
                <div className='alternativa'>
                    <input type='radio'></input>
                    A) dasdasdla
                </div>

                <div className='alternativa'>
                    <input type='radio'></input>
                </div>

                <div className='alternativa'>
                    <input type='radio'></input>
                </div>

                <div className='alternativa'>
                    <input type='radio'></input>
                </div>

                <div className='alternativa'>
                    <input type='radio'></input>
                </div>
            </div>
        </QuestaoCardStyle>
    )
}

export default QuestaoCard;