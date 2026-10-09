import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [teams, setTeams] = useLocalStorage("pokemon-teams", []);
  const [favorites, setFavorites] = useLocalStorage("pokemon-favorites", []);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function isFavorite(id) {
    return favorites.includes(id);
  }

  function createTeam(name) {
    const newTeam = {
      id: crypto.randomUUID(),
      name: name.trim() || "Nieuw team",
      pokemonIds: [],
    };
    setTeams((prev) => [...prev, newTeam]);
    return newTeam.id;
  }

  function deleteTeam(teamId) {
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
  }

  function addToTeam(teamId, pokemonId) {
    setTeams((prev) =>
      prev.map((team) => {
        if (team.id !== teamId) return team;
        if (team.pokemonIds.includes(pokemonId) || team.pokemonIds.length >= 6) {
          return team;
        }
        return { ...team, pokemonIds: [...team.pokemonIds, pokemonId] };
      })
    );
  }

  function removeFromTeam(teamId, pokemonId) {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? { ...team, pokemonIds: team.pokemonIds.filter((id) => id !== pokemonId) }
          : team
      )
    );
  }

  const value = {
    teams,
    favorites,
    toggleFavorite,
    isFavorite,
    createTeam,
    deleteTeam,
    addToTeam,
    removeFromTeam,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp moet binnen AppProvider gebruikt worden");
  }
  return context;
}