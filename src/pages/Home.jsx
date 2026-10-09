import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-intro">
      <div className="home-copy">
        <p className="eyebrow">Regio Kanto / Team Manager</p>
        <h2>Welkom, trainer.</h2>
        <p>
          Ontdek Pokémon uit de Kanto-regio, bewaar je favorieten en stel teams
          samen. Alles blijft bewaard in je browser (localStorage).
        </p>
        <div className="home-actions">
          <Link className="primary-link" to="/list">
            Open de Pokédex <span aria-hidden="true">→</span>
          </Link>
          <Link className="secondary-link" to="/teams">
            Mijn teams
          </Link>
        </div>
      </div>

      <div className="starter-lineup" aria-label="Bulbasaur, Charmander en Squirtle">
        {[1, 4, 7].map((id) => (
          <img
            key={id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt=""
          />
        ))}
      </div>
    </section>
  );
}

export default Home;