import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <ul className="nav flex-column">
      <div className="my-2 app-name upper">
        <p className="mb-0">Suporte</p>
      </div>

      <li className="nav-item">
        <Link
          className={`nav-link sidebar-nav-link ${
            isActive("/chamados") ? "active" : ""
          }`}
          to="/chamados"
        >
          Chamados
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link sidebar-nav-link ${
            isActive("/melhorias") ? "active" : ""
          }`}
          to="/melhorias"
        >
          Melhorias
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link sidebar-nav-link ${
            isActive("/bugs") ? "active" : ""
          }`}
          to="/bugs"
        >
          Bugs
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link sidebar-nav-link ${
            isActive("/documentacao") ? "active" : ""
          }`}
          to="/documentacao"
        >
          Documentação
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link sidebar-nav-link ${
            isActive("/metricas") ? "active" : ""
          }`}
          to="/metricas"
        >
          Métricas
        </Link>
      </li>
    </ul>
  );
}
