import styled from 'styled-components';

export const CabecalhoStyle = styled.div`

    position: relative;
    z-index: 3;

    .nav-info {
        height: 40px;
        padding: 0 20px;
        background-color: ${props => props.theme.colors.primary};
        text-align: right;
        display: flex;
        justify-content: right;
        align-items: center;
        color: #FFF;

        a {
            margin: 20px;
            height: auto;
            color: #FFF;
            text-decoration: none;
            position: relative;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        .space {
            ::after {
                position: absolute;
                content: '';
                width: 1px;
                height: 70%;
                top: 15%;
                margin-left: 20px;
                background-color: #638e2a;
            }
        }
    }

    .nav-menu {
        display: flex;
        padding: 0 10%;
        justify-content: space-between;
        align-items: center;
        height: 90px;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);
    }

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
        height: 45px;
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
        font-size: 16px;
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
            height: 3px;
            background-color: ${props => props.theme.colors.primary};
            transition: all 0.2s;
        }

        &:hover::after {
            height: 8px;
        }
    }

    .nav-content-dropdown {
        position: absolute;
        width: max-content;
        left: -5%;
        top: 100%;
        font-size: 16px;
        text-align: center;
        background: rgba(246,246,244, 0.8);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        border-radius: 3px;
        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);

        p {
            padding: 15px 10px;

            &:hover {
                background-color: rgba(220,220,220, 0.9);
            }
        }
    }

    .hide {
        display: none;
    }

`;