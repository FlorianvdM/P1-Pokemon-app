function SearchBar({ value, onChange, placeholder = "Zoek Pokémon..." }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Zoeken"
      />
    </div>
  );
}

export default SearchBar;