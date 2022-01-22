import React from "react";
import styled from "styled-components";
import Psyduck from "../images/psyduck-01.png";

const ErrorMessage = styled.section`
    text-align: center;

    img {
        width: 300px;
        height: auto;
        padding: 20px;
    }
`;

interface IProps {
    message: string;
}

const Error = (props: IProps) => {
    return (
        <ErrorMessage>
            <h3>{props.message}</h3>
            <img src={Psyduck} alt="Error" />
        </ErrorMessage>
    );
};

export default Error;
