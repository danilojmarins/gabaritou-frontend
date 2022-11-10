import styled from 'styled-components';

export const CardInfoStyle = styled.div.attrs((props: {text: string, rowBack: string, width: string}) => props)`

    border-radius: 4px;
    border: 1px solid #DEDEDE;
    margin: 10px 0;
    width: ${props => props.width};

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .head {
        background-color: #F3F3F3;
        color: ${props => (props.text ? '#515151' : '#1B7E5A')};
        padding: 10px 10px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    h4 {
        font-weight: 500;
    }

    .row {
        background-color: #FFF;
        color: ${props => (props.text ? '#515151' : '#1B7E5A')};
        padding: 5px 10px;
        font-size: 12px;
        border-bottom: 1px solid #DEDEDE;
    }

    .last {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom: none;
    }

    .link {
        &:hover {
            color: ${props => props.theme.colors.primary};
            cursor: pointer;
        }
    }

    .dado {
        color: ${props => props.theme.colors.primary};
        font-weight: normal;
    }

    .row-perfil {
        background-color: ${props => (props.rowBack ? '#F3F3F3' : '#FFF')};
        color: ${props => (props.text ? '#515151' : '#1B7E5A')};
        padding: 5px 10px;
        font-size: 12px;
    }

    .bottom {
        border-bottom: 1px solid #DEDEDE;
    }

    .justify {
        width: 150px;
        text-align: center;
    }

    .positivo {
        color: #8CC63E;
    }

    .medio {
        color: #D1C700;
    }

    .negativo {
        color: #E12B2B;
    }

    .grafico {
        width: 1000px;
        margin: auto;
        padding: 30px 0;
    }
 
`;