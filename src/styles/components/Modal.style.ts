import styled from 'styled-components';

export const Modal = styled.div`

    position: absolute;
    left: calc(50% - 350px);
    top: calc(50% - 100px);
    background-color: #FFF;
    width: 700px;
    padding: 80px 0;
    text-align: center;
    z-index: 10;
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    button {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .input-email-wrapper {
        display: inline-block;
        text-align: left;
        position: relative;
        top: 30px;
    }

    .close-icon {
        width: 20px;
        margin-right: 8px;
    }

`;