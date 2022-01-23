import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "./Error";
import styled from "styled-components";
import Pokeball from "../images/poke-ball-04.png";

const PokemonStats = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin: 0 auto;
    padding-bottom: 40px;
    max-width: 1200px;

    img {
        width: 100%;
        max-width: 600px;
        height: auto;
    }

    @media (max-width: 728px) {
        grid-template-columns: 1fr;
        justify-items: center;

        img {
            max-width: 300px;
        }
    }
`;

const Image = styled.div`
    padding: 20px;
`;

const Stats = styled.div`
    padding: 20px;
    margin-left: 40px;

    h1 {
        font-size: 36px;
    }
`;

const Heading = styled.h4`
    margin-top: 20px;
`;

const List = styled.ul`
    list-style: none;
`;

type Item = typeof initItem;
const initItem = {
    id: "",
    name: "",
    height: "",
    weight: "",
    abilities: [
        {
            ability: {
                name: "",
            },
        },
    ],
    stats: [
        {
            base_stat: 0,
            stat: {
                name: "",
            },
        },
    ],
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

const Pokemon = () => {
    const [pokemon, setPokemon] = useState<Item>(initItem);
    const [loadingError, setLoadingError] = useState(false);
    const { name } = useParams();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((output) => setPokemon(output))
            .catch((error) => {
                console.error("Fetching error: " + error);
                setLoadingError(true);
            });
        // Specify how to clean up after this effect:
        return function cleanup() {
            setPokemon(initItem);
        };
    }, []);

    if (!loadingError) {
        return (
            <PokemonStats>
                <Image>
                    <img
                        src={
                            pokemon?.sprites.other["official-artwork"]
                                .front_default
                        }
                        alt={pokemon?.name}
                    />
                </Image>
                <Stats>
                    <h1>
                        {pokemon?.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1)}
                    </h1>
                    <p>#{pokemon?.id}</p>

                    <Heading>
                        Height: {pokemon?.height}
                        <br />
                        Weight: {pokemon?.weight}
                    </Heading>

                    <Heading>Abilities:</Heading>
                    <List>
                        {pokemon?.abilities.map((item, index) => (
                            <li key={index}>{item.ability.name}</li>
                        ))}
                    </List>

                    <Heading>Stats</Heading>
                    <List>
                        {pokemon?.stats.map((item, index) => (
                            <li key={index}>
                                {item.stat.name}: {item.base_stat}
                            </li>
                        ))}
                    </List>
                </Stats>
            </PokemonStats>
        );
    } else {
        return (
            <Error
                message={`Error loading ${
                    name
                        ? name.charAt(0).toUpperCase() + name.slice(1)
                        : "Pokemon"
                }. Try refreshing the page.`}
            />
        );
    }
};

export default Pokemon;
