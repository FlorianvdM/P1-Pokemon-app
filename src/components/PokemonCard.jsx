import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function PokemonCard({ id, name, image }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(Number(id));

  const imgSrc =
    image ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <article className="card">
      <div className="card-top">
        <span className="card-number">#{String(id).padStart(3, "0")}</span>
        <button
          type="button"
          className={`fav-btn ${fav ? "is-fav" : ""}`}
          onClick={() => toggleFavorite(Number(id))}
          aria-label={fav ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
          title={fav ? "Uit favorieten" : "Naar favorieten"}
        >
          {fav ? "★" : "☆"}
        </button>
      </div>

      <div className="card-artwork">
        <img src={imgSrc} alt={name} loading="lazy" />
      </div>

      <h3>{name}</h3>

      <Link className="card-link" to={`/detail/${id}`}>
        Bekijk details <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}

export default PokemonCard;