import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
    text-align: center;
`;

const Footer = () => {
    return (
        <Wrapper>
            <h6>By Rob Fraser</h6>
            <a href="#header">Back to top</a>
        </Wrapper>
    );
};

export default Footer;
