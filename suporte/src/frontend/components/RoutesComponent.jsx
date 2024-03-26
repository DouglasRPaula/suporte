import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

const ListagemPage = lazy(() => import("../listagem/ListagemPage"));
const CadastroPage = lazy(() => import("../cadastros/CadastrosPage"));
const EditarChamado = lazy(() => import("../editar/EditarCadastro"));
const Graficos = lazy(() => import("../graficos/Graficos"));

export default function RoutesComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/chamados" element={<ListagemPage />} />
        <Route exact path="/novo-chamado" element={<CadastroPage />} />
        <Route exact path="/editar-chamado/:id" element={<EditarChamado />} />
        <Route exact path="/metricas" element={<Graficos />} />
      </Routes>
    </Suspense>
  );
}
