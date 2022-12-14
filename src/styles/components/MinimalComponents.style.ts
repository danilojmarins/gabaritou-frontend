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
    margin: 20px 0 5px 0;
    display: flex;
    align-items: center;

    .alternativa {
        margin-left: 10px;
    }

    .alternativa-btn {
        cursor: pointer;
        padding: 5px;
        border-radius: 100%;
        margin-left: 20px;

        &:hover {
            background-color: #EEE;
        }
    }

`;

export const Input = styled.input`

    font-size: 14px;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #AAA;
    display: inline-block;
    width: 250px;

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

export const Select = styled.select`

    font-size: 14px;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #AAA;
    display: inline-block;
    width: 250px;

    &:focus {
        outline: none !important;
        border: 2px solid ${props => props.theme.colors.widgets};
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
        color: ${props => props.theme.colors.secondary};
        margin-bottom: 8%;
        display: flex;
        align-items: center;
    }

    .error-icon {
        color: ${props => props.theme.colors.secondary};
        width: 20px;
        margin-right: 10px;
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

export const PageTitle = styled.h2`

    font-weight: 400;
    color: #638E2A;
    margin: 10px 0 20px 0;

`;

export const ColocacaoCard = styled.div`

    color: #fff;
    font-size: 11px;
    padding: 3px 5px;
    background-color: #EF7D00;
    border-radius: 3px;
    text-align: center;
    margin: 5px;

`;

export const PaginateStyle = styled.div`

    margin: 50px auto;

    .pagination-btns {
        width: auto 90%;
        list-style: none;
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        margin: 10px auto;
        margin-left: -10%;
    }

    .pagination-btns a {
        padding: 10px;
        border: solid 1px ${props => props.theme.colors.primary};
        border-radius: 5px;
        margin: 8px;
        cursor: pointer;
    }

    .active-btn a {
        background-color: ${props => props.theme.colors.primary};;
        color: #FFF;
    }

    .break a {
        border: none;
        cursor: default;
        margin: 0;
    }

`;