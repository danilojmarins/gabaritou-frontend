import styled from 'styled-components';

export const Button = styled.button`

    width: max-content;
    padding: 8px 22px;
    font: ${props => props.theme.fontSize.defaultFont};
    border: 1px solid ${props => props.theme.colors.widgets};
    background-color: transparent;
    color: ${props => props.theme.colors.widgets};
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border: 1px solid ${props => props.theme.colors.widgets};
        background-color: ${props => props.theme.colors.widgets};
        color: #FFF;
    }

`;