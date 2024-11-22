import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard/PokemonCard';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then((response) => response.json())
            .then((data) => {
                setPokemons(data.results);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading pokemons...</div>;

    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
            ))}
        </div>
    );
};

export default App;
