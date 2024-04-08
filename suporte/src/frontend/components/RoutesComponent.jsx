import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";

const ListagemPage = lazy(() => import("../listagem/ListagemPage"));
const CadastroPage = lazy(() => import("../cadastros/CadastrosPage"));
const EditarChamado = lazy(() => import("../editar/EditarCadastro"));
const Graficos = lazy(() => import("../graficos/Graficos"));

export default function RoutesComponent() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/chamados" />} />
          <Route exact path="/chamados" element={<ListagemPage />} />
          <Route exact path="/novo-chamado" element={<CadastroPage />} />
          <Route exact path="/editar-chamado/:id" element={<EditarChamado />} />
          <Route exact path="/metricas" element={<Graficos />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
