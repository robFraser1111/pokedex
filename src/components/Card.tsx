import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Pokeball from '../images/poke-ball-03.png'

const Div = styled.div`
    width: 290px;
    height: 280px;
    text-align: center;
    padding: 20px;
    color: ${(props) => props.theme.black};
    background: ${(props) => props.theme.grey};
    border-radius: 10px;
    transition: top ease 0.2s;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;

    &:hover,
    &:focus {
        top: -4px;
        cursor: pointer;
    }

    
`;

const Name = styled.h3`
    padding-bottom: 10px;
`;

const Img = styled.img`
    width: auto;
    height: 130px;
    padding: 5px;
`;

const Types = styled.div``;

const Type = styled.div`
    color: ${(props) => props.theme.white};
    padding: 5px 15px;
    margin: 5px;
    display: inline-block;
    border-radius: 20px;

    p {
        margin-bottom: 2px;
    }

    &.bug {
        background-color: ${(props) => props.theme.bug};
    }
    &.dragon {
        background-color: ${(props) => props.theme.dragon};
    }
    &.fairy {
        background-color: ${(props) => props.theme.fairy};
    }
    &.fire {
        background-color: ${(props) => props.theme.fire};
    }
    &.ghost {
        background-color: ${(props) => props.theme.ghost};
    }
    &.ground {
        background-color: ${(props) => props.theme.ground};
    }
    &.normal {
        background-color: ${(props) => props.theme.normal};
    }
    &.psychic {
        background-color: ${(props) => props.theme.psychic};
    }
    &.steel {
        background-color: ${(props) => props.theme.steel};
    }
    &.dark {
        background-color: ${(props) => props.theme.dark};
    }
    &.electric {
        background-color: ${(props) => props.theme.electric};
    }
    &.fighting {
        background-color: ${(props) => props.theme.fighting};
    }
    &.flying {
        background-color: ${(props) => props.theme.flying};
    }
    &.grass {
        background-color: ${(props) => props.theme.grass};
    }
    &.ice {
        background-color: ${(props) => props.theme.ice};
    }
    &.poison {
        background-color: ${(props) => props.theme.poison};
    }
    &.rock {
        background-color: ${(props) => props.theme.rock};
    }
    &.water {
        background-color: ${(props) => props.theme.water};
    }
`;

const Number = styled.p``;

type Item = typeof initItem;

const initItem = {
    name: "",
    id: "",
    sprites: {
        front_default: "",
        other: {
            ["official-artwork"]: {
                front_default: Pokeball,
            },
        },
    },
    types: [
        {
            type: {
                name: "",
            },
        },
    ],
};

interface IProps {
    data: string;
}

const Card = (props: IProps) => {
    const [pokemon, setPokemon] = useState<Item>(initItem);

    useEffect(() => {
        fetch(`${props.data}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((output) => setPokemon(output))
            .catch((error) => {
                console.error("Fetching error: " + error);
                setPokemon(initItem);
            });
        // Specify how to clean up after this effect:
        return function cleanup() {
            setPokemon(initItem);
        };
    }, [props.data]);

    return (
        <Link to={pokemon.name}>
            <Div>
                <Name>
                    {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                </Name>
                <Img
                    src={
                        pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt={pokemon.name + " front"}
                />

                <Types>
                    {pokemon.types.map((item, index) => (
                        <Type key={index} className={item.type.name}>
                            <p>{item.type.name}</p>
                        </Type>
                    ))}
                </Types>

                <Number>
                    <small># {pokemon.id}</small>
                </Number>
            </Div>
        </Link>
    );
};

export default Card;
