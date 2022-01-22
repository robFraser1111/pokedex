import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Item = typeof initItem;
const initItem = {
    sprites: {
        front_default: "",
        back_default: "",
    },
    name: "",
    height: "",
    weight: "",
};

const Pokemon = () => {
    const [pokemon, setPokemon] = useState<Item>(initItem);
    const { name } = useParams();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
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
    }, []);

    return (
        <div>
            <img src={pokemon?.sprites.back_default} alt={pokemon.name} />
            <p>Name = {pokemon?.name}</p>
            <p>Height = {pokemon?.height}</p>
            <p>Weight = {pokemon?.weight}</p>
        </div>
    );
};

export default Pokemon;
