import styled from 'styled-components';

export const QuestaoCardStyle = styled.div.attrs((props: {width: string}) => props)`

    width: ${(props) => props.width};
    padding: 2% 3% 4% 3%;
    background: rgba(246,246,244, 0.3);
    border-radius: 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    margin: 30px auto;

    .orgao {
        font-size: 14px;
        margin-bottom: 20px;
    }

    .enunciado {
        text-align: justify;
        font-size: 17px;
        margin: auto;
        padding: 0 10% 0 2%;
        margin-bottom: 20px;
    }

    .orientacao {
        font-size: 15px;
        margin-bottom: 20px;
    }

    .alternativa {
        margin: 10px 0;
        font-size: 15px;
    }

    input {
        margin-right: 10px;
    }

    .button {
        position: absolute;
        bottom: 10%;
        right: 5%;
    }

`;