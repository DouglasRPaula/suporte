export default function SideBar() {
    return (
      <ul className="nav flex-column">
        <div className="my-2 app-name upper">
          <p className="mb-0">Suporte</p>
        </div>
  
        <li className="nav-item">
          <a className="nav-link text-dark" href="/chamados">
            Chamados
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark" href="/">
            Melhorias
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark" href="/">
            Bugs
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark" href="/">
            Documentação
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark" href="/metricas">
            Metricas
          </a>
        </li>
      </ul>
    );
  }
  