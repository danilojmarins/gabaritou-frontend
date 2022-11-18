import styled from "styled-components";

export const CarregamentoWidgetStyle = styled.div`

    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 100;
    background-color: rgba(230, 230, 230, 0.6);

    .loading {
        position: relative;
        background-color: #FFF;
        margin: auto;
    }

    .loading div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin-left: -32px;
        border: 8px solid #FFF;
        border-radius: 50%;
        animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${props => props.theme.colors.primary} transparent transparent transparent;
    }
    
    .loading div:nth-child(1) {
        animation-delay: -0.45s;
    }

    .loading div:nth-child(2) {
        animation-delay: -0.3s;
    }

    .loading div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

`;