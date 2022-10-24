import styled from 'styled-components';

export const HomeStyle = styled.div`

    .wrapper {
        position: relative;
        text-align: center;
    }
    .div {
        text-align: center;
        display: inline-block;
    }
    input {
        position: relative;
        visibility: hidden;
        top: 520px;
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
        position: absolute;
        transition: opacity 1s;
        opacity: 0;
        pointer-events: none;
    }

`;