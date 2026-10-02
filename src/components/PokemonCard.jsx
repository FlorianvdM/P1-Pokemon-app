import { Link } from "react-router-dom";

function PokemonCard({ id, name, image }) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <Link to={`/detail/${id}`}>Details</Link>
    </div>
  );
}

export default PokemonCard;