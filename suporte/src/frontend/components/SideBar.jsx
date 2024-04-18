import  { Link } from "react-router-dom";

export default function SideBar() {
    return (
      <ul className="nav flex-column">
        <div className="my-2 app-name upper">
          <p className="mb-0">Suporte</p>
        </div>
  
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/chamados">
            Chamados
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/">
            Melhorias
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/">
            Bugs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/">
            Documentação
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/metricas">
            Metricas
          </Link>
        </li>
      </ul>
    );
  }
  