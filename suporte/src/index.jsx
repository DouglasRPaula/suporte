import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./frontend/redux/store.js";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import EditarChamado from "./frontend/editar/EditarCadastro.jsx";
import Graficos from "./frontend/graficos/Graficos.jsx";
import CadastroPage from "./frontend/cadastros/CadastrosPage.jsx";
import CadastroUsuario from "./frontend/cadastros/CadastroUsuario.jsx";
import LoginPage from "./frontend/loginPage/LoginPage.jsx";
import ListagemPage from "./frontend/listagem/ListagemPage.jsx";
import PrivateRoute from "./frontend/components/PrivateRoute.jsx";
import App from "./App.jsx";
import EditarUsuario from "./frontend/editar/EditarUser.jsx";
import VerifyEmailPage from "./frontend/components/emailVerificationPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "chamados", element: <ListagemPage /> },
          { path: "novo-chamado", element: <CadastroPage /> },
          { path: "editar-chamado/:id", element: <EditarChamado /> },
          { path: "metricas", element: <Graficos /> },
          { path: "profile", element: <EditarUsuario /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <CadastroUsuario /> },
  { path: "/verify-email", element: <VerifyEmailPage /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
