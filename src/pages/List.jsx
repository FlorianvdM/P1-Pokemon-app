import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

function List() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => {
        if (!res.ok) throw new Error("Kon Pokémon niet ophalen");
        return res.json();
      })
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="status-msg">Pokémon laden...</p>;
  if (error) return <p className="status-msg error">Fout: {error}</p>;

  return (
    <section className="list-page">
      <div className="list-heading">
        <div>
          <p className="eyebrow">Regio Kanto / 001–151</p>
          <h2>Pokédex</h2>
        </div>
        <p className="list-count">{filtered.length} Pokémon</p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      <div className="card-grid">
        {filtered.map((p) => {
          const id = p.url.split("/").filter(Boolean).pop();
          return <PokemonCard key={p.name} id={id} name={p.name} />;
        })}
      </div>

      {filtered.length === 0 && (
        <p className="status-msg">Geen Pokémon gevonden voor “{search}”.</p>
      )}
    </section>
  );
}

export default List;