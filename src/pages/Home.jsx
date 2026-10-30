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
    </section>
  );
}

export default Home;