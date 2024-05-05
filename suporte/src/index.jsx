import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./frontend/redux/store.js";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import EditarChamadosPage from "./frontend/editar/EditarChamadosPage.jsx";
import Graficos from "./frontend/graficos/Graficos.jsx";
import CadastroChamadosPage from "./frontend/cadastros/CadastrosChamadoPage.jsx";
import CadastroUsuario from "./frontend/cadastros/CadastroUsuario.jsx";
import LoginPage from "./frontend/loginPage/LoginPage.jsx";
import ListagemChamadosPage from "./frontend/listagem/ListagemChamadosPage.jsx";
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
          { path: "chamados", element: <ListagemChamadosPage /> },
          { path: "novo-chamado", element: <CadastroChamadosPage /> },
          { path: "editar-chamado/:id", element: <EditarChamadosPage /> },
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </React.StrictMode>
  </Provider>
);
