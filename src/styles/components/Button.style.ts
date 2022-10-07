import styled from 'styled-components';

export const Button = styled.button`

    width: max-content;
    padding: 8px 22px;
    font: ${props => props.theme.fontSize.defaultFont};
    border: 1px solid ${props => props.theme.colors.alternativeBackground};
    background-color: transparent;
    color: ${props => props.theme.colors.alternativeBackground};
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border: 1px solid ${props => props.theme.colors.alternativeBackground};
        background-color: ${props => props.theme.colors.alternativeBackground};
        color: #FFF;
    }

`;