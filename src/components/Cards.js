import React from 'react'
import Pokemon from "./Pokemon";
import styled from "styled-components";

const Wrapper = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
`;

const Card = styled.div`
    width: 400px;
    text-align: center;
    padding: 20px;
    margin: 20px;
    background: #f8f8f8;
`;

const Cards = (props) => {

    return (
        <Wrapper>
            {props.data && props.data.map((item, index) => (
                <Card key={index}>
                    <h2>
                        {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}
                    </h2>
                    {item.url && <Pokemon url={item.url} />}
                </Card>
            ))}
        </Wrapper>
    )
}

export default Cards
