import styled from 'styled-components';

export const PesquisaSimplesStyle = styled.div`

    margin: 15px auto;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        background-color: ${props => props.theme.colors.primary};
        padding: 10px;
        color: #FFF;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .options {
        display: flex;
        justify-content: space-between;
        flex-flow: row wrap;
        border: 1px solid ${props => props.theme.colors.primary};
        padding: 20px 10px;
        border-radius: 5px;
        border-top-left-radius: 0;
    }

    .search-input {
        padding: 5px 10px;
        border: 1px solid ${props => props.theme.colors.primary};
        border-radius: 3px;
        margin-right: 5px;
        box-shadow: inset 0 1px 3px #DDD;
        color: #6F6F6F;
    }

    .submit-input {
        padding: 5px 10px;
        border: 1px solid ${props => props.theme.colors.primary};
        border-radius: 3px;
        background-color: ${props => props.theme.colors.primary};
        color: #FFF;
        cursor: pointer;
    }

    .txt {
        color: #6F6F6F;
        margin-right: 5px;
        font-size: 15px;
    }
    
    .link {
        &:hover {
            color: ${props => props.theme.colors.primary};
            cursor: pointer;
        }
    }

    select {
        padding: 5px 10px;
        border: 1px solid ${props => props.theme.colors.primary};
        border-radius: 3px;
        margin-left: 5px;
        box-shadow: inset 0 1px 3px #DDD;
    }

`;