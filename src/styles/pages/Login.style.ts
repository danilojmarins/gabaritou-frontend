import styled from 'styled-components';

export const LoginStyle = styled.div`

    padding: 50px 20%;
    background: rgba(235, 240, 235, 1);
    position: relative;

    .login-card {
        margin: auto;
        width: 70%;
        padding: 2% 3% 4% 3%;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);
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

    .pass-input {
        display: flex;
        align-items: center;
    }

    .pass-icon {
        width: 22px;
        position: relative;
        bottom: 7px;
        right: 35px;
        cursor: pointer;
    }

    .error {
        font-size: 14px;
        color: #FF0000;
        margin-bottom: 10px;
    }

    .error-pass {
        font-size: 12px;
        color: #FF0000;
    }

    .btn {
        margin: 10% auto 0 auto;
    }

`;