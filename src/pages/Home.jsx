import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Welkom bij de Pokémon Team Manager</h2>
      <p>Maak teams, voeg Pokémon toe en houd je favorieten bij.</p>
      <Link to="/list">Bekijk de Pokémon lijst</Link>
    </div>
  );
}

export default Home;