import "./App.css";
import { Route, Routes } from "react-router";
import ListagemPage from "./frontend/listagem/ListagemPage";
import CadastroPage from "./frontend/cadastros/CadastrosPage";
import NavBar from "./frontend/components/Header";
import SideBar from "./frontend/components/SideBar";
import Footer from "./frontend/components/Footer";

export default function App() {
  return (
    <div>
      <NavBar />
      <div className="side-bar">
        <SideBar />
      </div>
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<ListagemPage />} />
          <Route exact path="/novo-chamado" element={<CadastroPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
