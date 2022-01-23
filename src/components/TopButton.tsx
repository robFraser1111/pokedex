import React from "react";
import Arrow from "../images/chevron-circle-up-solid.svg";
import styled from "styled-components";

const Top = styled.a`
    position: fixed;
    bottom: 10px;
    right: 20px;
    transition: 0.2s;
    opacity: 1;

    &.hide {
        opacity: 0;
    }
`;

const Img = styled.svg`
    width: 50px;
    height: 50px;
    opacity: 0.6;
    transition: 0.2s;

    path {
        fill: ${(props) => props.theme.yellow};
        transition: 0.2s;
    }

    &.bottom path {
        fill: ${(props) => props.theme.yellow};
    }

    &:hover,
    &:focus {
        opacity: 1;
    }
`;

interface IProps {
    pos: number;
}

const TopButton = (props: IProps) => {
    return (
        <Top className={props.pos <= 1000 ? "hide" : ""} href="#header">
            <Img
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chevron-circle-up"
                className={""}
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    fill="currentColor"
                    d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"
                ></path>
            </Img>
        </Top>
    );
};

export default TopButton;
