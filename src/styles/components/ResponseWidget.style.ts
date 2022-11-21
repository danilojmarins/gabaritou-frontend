import styled from "styled-components";

export const ResponseWidgetStyle = styled.div`

    width: 300px;
    height: 50px;
    z-index: 100;
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: #FFF;
    display: flex;
    flex-flow: row wrap;
    justify-content: left;
    align-items: center;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 30px rgb(0 0 0 / 30%);

    .success-icon {
        color: ${props => props.theme.colors.primary};
        width: 20px;
    }

    p {
        margin-left: 10px;
    }

`;