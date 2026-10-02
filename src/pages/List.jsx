import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";

function List() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokemons(data.results);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h2>Pokémon Lijst</h2>
      <div className="card-grid">
        {pokemons.map((p) => {
          // De id staat aan het eind van de url, bijv. ".../pokemon/25/"
          const id = p.url.split("/").filter(Boolean).pop();
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return <PokemonCard key={p.name} id={id} name={p.name} image={image} />;
        })}
      </div>
    </div>
  );
}

export default List;