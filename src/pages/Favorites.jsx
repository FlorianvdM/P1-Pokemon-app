import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

function Favorites() {
  const { favorites } = useApp();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (favorites.length === 0) {
      setPokemons([]);
      return;
    }

    setLoading(true);
    Promise.all(
      favorites.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())
      )
    )
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [favorites]);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="favorites-page">
      <div className="list-heading">
        <div>
          <p className="eyebrow">Persoonlijk</p>
          <h2>Favorieten</h2>
        </div>
        <p className="list-count">{favorites.length} favoriet(en)</p>
      </div>

      {favorites.length === 0 ? (
        <p className="status-msg">
          Je hebt nog geen favorieten. Klik op ☆ bij een Pokémon om er een toe
          te voegen.
        </p>
      ) : (
        <>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Zoek in favorieten..."
          />

          {loading ? (
            <p className="status-msg">Laden...</p>
          ) : (
            <div className="card-grid">
              {filtered.map((p) => (
                <PokemonCard key={p.id} id={p.id} name={p.name} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Favorites;