import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/list">Pokédex</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <NavLink to="/favorites">Favorieten</NavLink>
    </nav>
  );
}

export default Navigation;