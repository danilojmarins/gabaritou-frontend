import styled from 'styled-components';

export const RodapeStyle = styled.div`

    padding: 80px 20%;
    background-color: ${props => props.theme.colors.alternativeBackground};

    .footer-containers {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }

    h3 {
        color: ${props => props.theme.colors.primary};
        margin-bottom: 30px;
    }

    a {
        display: block;
        color: ${props => props.theme.colors.background};
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

`;