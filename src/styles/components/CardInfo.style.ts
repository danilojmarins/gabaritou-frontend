import styled from 'styled-components';

export const CardInfoStyle = styled.div`

    border-radius: 4px;
    border: 1px solid #DEDEDE;
    margin: 10px 0;

    div {
        display: flex;
        justify-content: space-between;
    }

    .head {
        background-color: #F3F3F3;
        color: #1b7e5a;
        padding: 10px 10px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    h4 {
        font-weight: 500;
    }

    .row {
        background-color: #FFF;
        color: #1b7e5a;
        padding: 5px 10px;
        font-size: 12px;
        border-bottom: 1px solid #DEDEDE;
    }

    .last {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom: none;
    }

    .link {
        &:hover {
            color: ${props => props.theme.colors.primary};
            cursor: pointer;
        }
    }
 
`;