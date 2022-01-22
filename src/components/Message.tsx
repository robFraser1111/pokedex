import React from "react";
import styled from "styled-components";

const Text = styled.p`
    text-align: center;
`;

const Message = (props: {text: string}) => {
    return <Text>{props.text}</Text>;
};

export default Message;
