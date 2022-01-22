import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
    padding: 30px 0;
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    text-align: center;
`;

const Footer = () => {
    return (
        <Wrapper>
            <h5>
                By{" "}
                <a
                    href="https://github.com/robFraser1111/pokedex"
                    target="_blank"
                >
                    <u>Rob Fraser</u>
                </a>
                , utilising the{" "}
                <a href="https://pokeapi.co/" target="_blank">
                    <u>PokeAPI</u>
                </a>
                .
            </h5>
        </Wrapper>
    );
};

export default Footer;
