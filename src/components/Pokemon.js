import React, { useState, useEffect } from "react";

const Pokemon = (props) => {
    const [image, setImage] = useState("");

    useEffect(() => {
        fetch(`${props.url}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((output) => setImage(output.sprites.front_default))
            .catch((error) => {
                console.error("Fetching error: " + error);
                setImage("error");
            });
        // Specify how to clean up after this effect:
        return function cleanup() {
            setImage("");
        };
    }, [props.url]);
    {
        return <img src={image} alt="Pokemon image" />;
    }
};

export default Pokemon;
