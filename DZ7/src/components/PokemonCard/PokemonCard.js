import React, { useEffect, useState } from 'react';

const PokemonCard = ({ pokemonUrl }) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(pokemonUrl)
            .then((response) => response.json())
            .then((data) => setDetails(data));
    }, [pokemonUrl]);

    if (!details) return <div>Loading...</div>;

    return (
        <div className="pokemon-card">
            <h3>{details.name}</h3>
            <img
                src={details.sprites.other.dream_world.front_default}
                alt={details.name}
            />
        </div>
    );
};

export default PokemonCard;
