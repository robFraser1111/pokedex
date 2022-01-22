import React, { useState, useEffect } from "react";
import Error from "./Error";
import Pokeball from "../images/poke-ball-04.png";
import { useParams } from "react-router-dom";

type Item = typeof initItem;
const initItem = {
    name: "",
    id: "",
    height: "",
    weight: "",
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
            <div>
                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
                <p>Name = {pokemon?.name}</p>
                <p>Height = {pokemon?.height}</p>
                <p>Weight = {pokemon?.weight}</p>
            </div>
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
