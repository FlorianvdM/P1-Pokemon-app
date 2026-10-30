// Routes en Route komen uit react-router-dom en bepalen welke pagina je ziet
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      {/* De Header staat boven elke pagina */}
      <Header />
      <main>
        {/* Routes kijkt naar de url en laat daar de juiste pagina bij zien */}
        <Routes>
          {/* Startpagina */}
          <Route path="/" element={<Home />} />
          {/* Lijst met alle Pokémon (Pokédex) */}
          <Route path="/list" element={<List />} />
          {/* :id is een variabele, bijvoorbeeld /detail/1 voor Bulbasaur */}
          <Route path="/detail/:id" element={<Detail />} />
          {/* Overzicht van al je teams */}
          <Route path="/teams" element={<Teams />} />
          {/* :teamId is de variabele voor één specifiek team */}
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          {/* Pagina met je favoriete Pokémon */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      {/* De Footer staat onder elke pagina */}
      <Footer />
    </>
  );
}

export default App;