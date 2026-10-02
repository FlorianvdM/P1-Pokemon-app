import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();

  return (
    <div>
      <h2>Pokémon detail</h2>
      <p>Pokémon detail komt hier (id: {id})</p>
    </div>
  );
}

export default Detail;