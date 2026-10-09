import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Teams() {
  const { teams, createTeam, deleteTeam } = useApp();
  const [name, setName] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    createTeam(name);
    setName("");
  }

  return (
    <section className="teams-page">
      <div className="list-heading">
        <div>
          <p className="eyebrow">Beheer</p>
          <h2>Mijn teams</h2>
        </div>
        <p className="list-count">{teams.length} team(s)</p>
      </div>

      <form className="create-team-form" onSubmit={handleCreate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Naam van nieuw team..."
          maxLength={30}
        />
        <button type="submit" className="primary-btn" disabled={!name.trim()}>
          Team aanmaken
        </button>
      </form>

      {teams.length === 0 ? (
        <p className="status-msg">
          Je hebt nog geen teams. Maak er hierboven een aan!
        </p>
      ) : (
        <div className="team-grid">
          {teams.map((team) => (
            <article key={team.id} className="team-card">
              <h3>{team.name}</h3>
              <p className="team-count">
                {team.pokemonIds.length} / 6 Pokémon
              </p>

              <div className="team-sprites">
                {team.pokemonIds.length === 0 && (
                  <span className="empty-hint">Nog leeg</span>
                )}
                {team.pokemonIds.map((pid) => (
                  <img
                    key={pid}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pid}.png`}
                    alt=""
                    title={`#${pid}`}
                  />
                ))}
              </div>

              <div className="team-actions">
                <Link className="card-link" to={`/teams/${team.id}`}>
                  Beheer team →
                </Link>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => {
                    if (confirm(`Team "${team.name}" verwijderen?`)) {
                      deleteTeam(team.id);
                    }
                  }}
                >
                  Verwijder
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;