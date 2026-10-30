import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

function List() {
  // pokemons: de lijst die uit de API komt
  const [pokemons, setPokemons] = useState([]);
  // loading: true zolang de data nog wordt opgehaald
  const [loading, setLoading] = useState(true);
  // error: bevat de foutmelding als het ophalen mislukt
  const [error, setError] = useState(null);
  // search: wat de gebruiker in het zoekveld typt
  const [search, setSearch] = useState("");
  // attempt: telt hoe vaak we opnieuw proberen (zo start de fetch weer)
  const [attempt, setAttempt] = useState(0);

  // Haalt de eerste 151 Pokémon op bij PokeAPI
  // Draait bij het laden van de pagina en opnieuw als attempt verandert
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => {
        // Als de API een fout teruggeeft, gooien we zelf een foutmelding
        if (!res.ok) throw new Error("Kon Pokémon niet ophalen");
        return res.json();
      })
      .then((data) => {
        // data.results is de lijst met namen en urls
        setPokemons(data.results);
        setLoading(false);
      })
      .catch((err) => {
        // Hier komen we terecht bij een fout (bijvoorbeeld geen internet)
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [attempt]);

  // Opnieuw proberen: eerst de fout wissen en weer "laden" tonen,
  // daarna attempt ophogen zodat de fetch opnieuw start
  const retry = () => {
    setError(null);
    setLoading(true);
    setAttempt(attempt + 1);
  };

  // Filtert de lijst op wat er in het zoekveld staat (hoofdletters maken niet uit)
  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Terwijl de data laadt laten we een bericht zien
  if (loading) return <p className="status-msg">Pokémon laden...</p>;

  // Bij een fout laten we de melding zien met een knop om het opnieuw te proberen
  if (error)
    return (
      <div>
        <p className="status-msg error">Fout: {error}</p>
        <button type="button" onClick={retry}>
          Opnieuw proberen
        </button>
      </div>
    );

  return (
    <section className="list-page">
      <div className="list-heading">
        <div>
          <p className="eyebrow">Regio Kanto / 001–151</p>
          <h2>Pokédex</h2>
        </div>
        <p className="list-count">{filtered.length} Pokémon</p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      <div className="card-grid">
        {filtered.map((p) => {
          // Het id zit achteraan in de url, bijvoorbeeld .../pokemon/1/ geeft 1
          const id = p.url.split("/").filter(Boolean).pop();
          return <PokemonCard key={p.name} id={id} name={p.name} />;
        })}
      </div>

      {/* Geen resultaten bij het zoeken */}
      {filtered.length === 0 && (
        <p className="status-msg">Geen Pokémon gevonden voor “{search}”.</p>
      )}
    </section>
  );
}

export default List;