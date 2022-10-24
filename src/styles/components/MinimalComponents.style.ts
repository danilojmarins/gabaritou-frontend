import styled from 'styled-components';

export const Button = styled.div`

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

export const Label = styled.label`

    font-size: 14px;
    font-weight: 500;
    color: #444;
    margin-bottom: 5px;

`;

export const Input = styled.input`

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

`;

export const Form = styled.form`

    display: flex;
    flex-flow: column nowrap;
    width: max-content;
    margin-top: 4%;
    margin-bottom: 70px;

    .error {
        font-size: 14px;
        color: #FF0000;
        margin-bottom: 8%;
    }

`;

export const Table = styled.table`

    width: 100%;
    border-radius: 10px;

    td, th {
        text-align: center;
        padding: 12px 0;
    }

    thead {
        background-color: #AAA;
    }

    tbody {
        background-color: #DDD;
    }

    .edit-icon {
        width: 16px;
        height: 16px;
        color: ${props => props.theme.colors.widgets};
        padding: 0 8px;
        cursor: pointer;
    }

    .delete-icon {
        width: 16px;
        height: 16px;
        color: ${props => props.theme.colors.secondary};
        padding: 0 8px;
        cursor: pointer;
    }

`;