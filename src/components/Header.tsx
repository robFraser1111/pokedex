import React from "react";
import { Link } from "react-router-dom";
import PokemonLogo from "../images/pokemon-logo-01.png";
import styled from "styled-components";

const Wrapper = styled.header`
    padding: 20px;
    display: flex;
    justify-content: center;

    a {
        height: fit-content;
    }
`;

const Logo = styled.img`
    width: 100%;
    max-width: 400px;
    height: auto;
    transition: all ease 0.2s;
    position: relative;
    top: 0;

    &:hover,
    &:focus {
        top: -4px;
        opacity: 0.9;
    }

    @media (max-width: 728px) {
        max-width: 200px;
    }
`;

const Header = () => {
    return (
        <Wrapper id="header">
            <Link to="/">
                <Logo src={PokemonLogo} alt="Pokemon Logo" />
            </Link>
        </Wrapper>
    );
};

export default Header;
