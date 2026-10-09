import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Detail() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite, teams, addToTeam } = useApp();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Pokémon niet gevonden");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p className="status-msg">Details laden...</p>;
  if (error) return <p className="status-msg error">Fout: {error}</p>;
  if (!pokemon) return null;

  const fav = isFavorite(pokemon.id);
  const types = pokemon.types.map((t) => t.type.name).join(", ");
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  function handleAddToTeam() {
    if (!selectedTeam) return;
    addToTeam(selectedTeam, pokemon.id);
    setSelectedTeam("");
  }

  return (
    <section className="detail-page">
      <Link to="/list" className="back-link">
        ← Terug naar Pokédex
      </Link>

      <div className="detail-layout">
        <div className="detail-art">
          <img src={image} alt={pokemon.name} />
        </div>

        <div className="detail-info">
          <p className="eyebrow">#{String(pokemon.id).padStart(3, "0")}</p>
          <h2>{pokemon.name}</h2>
          <p className="detail-types">Type: {types}</p>

          <ul className="stat-list">
            <li>Hoogte: {pokemon.height / 10} m</li>
            <li>Gewicht: {pokemon.weight / 10} kg</li>
            <li>Base experience: {pokemon.base_experience ?? "–"}</li>
          </ul>

          <div className="detail-actions">
            <button
              type="button"
              className={`fav-btn large ${fav ? "is-fav" : ""}`}
              onClick={() => toggleFavorite(pokemon.id)}
            >
              {fav ? "★ Favoriet" : "☆ Maak favoriet"}
            </button>

            {teams.length > 0 && (
              <div className="add-to-team">
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  aria-label="Kies team"
                >
                  <option value="">Kies een team...</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.pokemonIds.length}/6)
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleAddToTeam}
                  disabled={!selectedTeam}
                >
                  Voeg toe aan team
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detail;