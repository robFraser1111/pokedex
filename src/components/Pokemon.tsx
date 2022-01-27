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
        max-width: 465px;
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
    margin-left: 20px;

    h1 {
        font-size: 36px;
    }
`;

const Physical = styled.span`
    font-weight: 500;
`;

const Heading = styled.h4`
    margin-top: 20px;
    font-size: 18px;
`;

const AbilityList = styled.ul`
    list-style: none;
`;

const Table = styled.table`
    text-align: center;
    margin: 20px 0;

    td {
        width: 40px;
        padding: 0 10px 0 0;
    }

    @media (max-width: 728px) {
        td {
            width: 20px;
            padding: 0 3px 0 0;
        }
    }
`;

const StatAmount = styled.tr``;

const BarOuter = styled.div`
    width: 30px;
    height: 100px;
    margin: 0 auto;
    display: block;
    background: ${(props) => props.theme.grey};
    position: relative;
`;

const BarInner = styled.div`
    height: 0px;
    width: 30px;
    max-height: 100px;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.blue};
    position: absolute;
    bottom: 0;
    transition: 0.4s;
`;

const StatName = styled.tr``;

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
    }, [name]);

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
                    {pokemon.id ? (
                        <>
                            <h1>
                                {pokemon?.name.charAt(0).toUpperCase() +
                                    pokemon.name.slice(1)}
                            </h1>
                            <p>#{pokemon?.id}</p>

                            <Heading>
                                Height: <Physical>{pokemon?.height}</Physical>
                                <br />
                                Weight: <Physical>{pokemon?.weight}</Physical>
                            </Heading>

                            <Heading>Abilities:</Heading>
                            <AbilityList>
                                {pokemon?.abilities.map((item, index) => (
                                    <li key={index}>
                                        {item?.ability.name
                                            .charAt(0)
                                            .toUpperCase() +
                                            item.ability.name.slice(1)}{" "}
                                    </li>
                                ))}
                            </AbilityList>

                            <Heading>Stats:</Heading>

                            <Table>
                                <tbody>
                                    <StatAmount>
                                        {pokemon?.stats.map((item, index) => (
                                            <td key={index}>
                                                <small>{item?.base_stat}</small>
                                                <BarOuter>
                                                    <BarInner
                                                        style={{
                                                            height: item?.base_stat,
                                                        }}
                                                    />
                                                </BarOuter>
                                            </td>
                                        ))}
                                    </StatAmount>
                                    <StatName>
                                        {pokemon?.stats.map((item, index) => (
                                            <td key={index}>
                                                <small>
                                                    {item?.stat.name
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        item?.stat.name.slice(
                                                            1
                                                        )}
                                                </small>
                                            </td>
                                        ))}
                                    </StatName>
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
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
