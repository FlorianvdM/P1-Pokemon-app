import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function TeamDetail() {
  const { teamId } = useParams();
  const { teams, removeFromTeam } = useApp();
  const team = teams.find((t) => t.id === teamId);

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!team || team.pokemonIds.length === 0) {
      setDetails([]);
      return;
    }

    setLoading(true);
    Promise.all(
      team.pokemonIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())
      )
    )
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [team]);

  if (!team) {
    return (
      <section>
        <p className="status-msg error">Team niet gevonden.</p>
        <Link to="/teams">← Terug naar teams</Link>
      </section>
    );
  }

  return (
    <section className="team-detail-page">
      <Link to="/teams" className="back-link">
        ← Alle teams
      </Link>

      <div className="list-heading">
        <div>
          <p className="eyebrow">Team</p>
          <h2>{team.name}</h2>
        </div>
        <p className="list-count">{team.pokemonIds.length} / 6</p>
      </div>

      {loading && <p className="status-msg">Laden...</p>}

      {!loading && team.pokemonIds.length === 0 && (
        <p className="status-msg">
          Dit team is nog leeg. Ga naar een Pokémon-detailpagina en voeg er
          een toe.
        </p>
      )}

      <div className="card-grid">
        {details.map((p) => (
          <article key={p.id} className="card">
            <span className="card-number">
              #{String(p.id).padStart(3, "0")}
            </span>
            <div className="card-artwork">
              <img
                src={
                  p.sprites?.other?.["official-artwork"]?.front_default ||
                  p.sprites?.front_default
                }
                alt={p.name}
              />
            </div>
            <h3>{p.name}</h3>
            <div className="team-actions">
              <Link className="card-link" to={`/detail/${p.id}`}>
                Details
              </Link>
              <button
                type="button"
                className="danger-btn"
                onClick={() => removeFromTeam(team.id, p.id)}
              >
                Verwijder
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TeamDetail;