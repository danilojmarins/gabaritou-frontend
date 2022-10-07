import styled from 'styled-components';

export const HomeStyle = styled.div`

    height: 100vh;
    padding: 50px 20%;
    background: rgba(235, 240, 235, 1);
    background-image: url('/wave.svg');
    background-repeat: no-repeat;
    background-position: center bottom;
    position: relative;

    h1 {
        color: ${props => props.theme.colors.primary};
        font-size: ${props => props.theme.fontSize.primary};
        display: inline-block;
    }

    .title {
        display: flex;
        position: relative;
        top: 10%;
        left: 7%;
        width: max-content;
        align-items: center;
    }

    .icon {
        width: 45px;
        color: ${props => props.theme.colors.primary};
        margin-left: 20px;
        display: inline-block;
    }

    p {
        color: ${props => props.theme.colors.text};
        font-size: ${props => props.theme.fontSize.secondary};
    }

    .login-card {
        width: 40%;
        position: absolute;
        right: 20%;
        top: 30%;
        padding: 2% 3% 4% 3%;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);
        z-index: 3;
    }

    h3 {
        font-size: 30px;
        text-align: center;
        color: ${props => props.theme.colors.primary};
    }

    .forms {
        display: flex;
        justify-content: space-between;
    }

    form {
        display: flex;
        flex-flow: column nowrap;
        width: max-content;
        margin-top: 10%;
    }

    label {
        font-size: 14px;
        font-weight: 500;
        color: #444;
        margin-bottom: 5px;
    }

    input {
        font-size: 16px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #AAA;
        display: inline-block;
        width: 250px;
        margin-bottom: 5%;

        &:focus {
            outline: none !important;
            border: 2px solid ${props => props.theme.colors.widgets};
        }
    }

    .btn {
        margin: 10% auto 0 auto;
    }

    .wave {
        z-index: 0;
        position: absolute;
        bottom: 0;
    }

`;