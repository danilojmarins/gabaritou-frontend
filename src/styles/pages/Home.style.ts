import styled from 'styled-components';

export const HomeStyle = styled.div`

    .wrapper {
        position: relative;
        width: inherit;
        height: 450px;
        padding: 50px 20%;
        text-align: center;
    }

    .div {
        position: absolute;
        left: 20%;
        right: 20%;
        text-align: center;
    }

    input {
        position: relative;
        visibility: hidden;
        top: 80%;

        &:after {
            content: '';
            position: absolute;
            background-color: #869791;
            opacity: 0.5;
            width: 12px;
            height: 12px;
            visibility: visible;
            border-radius: 50%;
        }

        &:checked:after {
            background-color: ${props => props.theme.colors.primary};
            opacity: 1;
        }

        &:hover {
            cursor: pointer;
            background-color: #869791;
            opacity: 0.5;
        }
    }

    .btn {
        position: absolute;
        top: 230px;
        padding: 10px;
        color: ${props => props.theme.colors.primary};

        &:hover {
            cursor: pointer;
        }
    }

    .prev {
        left: 17%;
    }

    .next {
        right: 17%;
    }

    .crs-img {
        transition: opacity 1s;
        opacity: 0;
        pointer-events: none;
        position: relative;
        margin: auto;
    }

`;