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
            background-color: #27921A;
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
        top: 280px;
        padding: 10px;

        &:hover {
            cursor: pointer;
        }
    }

    .prev {
        left: 15%;
    }

    .next {
        right: 15%;
    }

    .crs-img {
        transition: opacity 1s;
        opacity: 0;
        pointer-events: none;
        position: relative;
        margin: auto;
    }

`;