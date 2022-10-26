import styled from 'styled-components';

export const RodapeStyle = styled.div`

    .footer-containers {
        padding: 30px 20%;
        background-color: #D5D5D3;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }

    h3 {
        color: ${props => props.theme.colors.text};
        margin-bottom: 30px;
    }

    a {
        display: block;
        color: ${props => props.theme.colors.text};
        text-decoration: none;
        margin: 10px 0;

        &:hover {
            text-decoration: underline ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.primary};
        }
    }

    .link {
        display: flex;
        align-items: center;
    }

    .icon {
        color: ${props => props.theme.colors.primary};
        display: inline-block;
        width: 8px;
        margin-right: 8px;
    }

    .footer-info {
        background-color: #363435;
        color: #FFF;
        padding: 15px 0;
        text-align: center;
        font-size: 12px;
        border-top: solid 2px ${props => props.theme.colors.primary};
    }

`;