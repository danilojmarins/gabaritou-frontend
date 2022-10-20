import styled from 'styled-components';

export const CabecalhoStyle = styled.div`

    display: flex;
    width: 100vw;
    padding: 0 20%;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    position: fixed;
    top: 0;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    z-index: 5;

    .logo {
        display: flex;
        align-items: center;
    }

    h1 {
        color: ${props => props.theme.colors.primary};
        font-size: ${props => props.theme.fontSize.primary};
        display: inline-block;
    }

    .icon {
        width: 45px;
        color: ${props => props.theme.colors.primary};
        margin-left: 20px;
        display: inline-block;
    }

    .logout-icon {
        width: 20px;
        color: ${props => props.theme.colors.primary};
        margin-left: 15px;
        display: inline-block;
    }

    .navbar {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .nav-content {
        color: ${props => props.theme.colors.text};
        font-size: ${props => props.theme.fontSize.secondary};
        padding: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            background-color: ${props => props.theme.colors.primary};
            transition: all 0.2s;
        }

        &:hover::after {
            height: 5px;
        }
    }

`;