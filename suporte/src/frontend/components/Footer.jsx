export default function Footer() {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="text-muted">
            © {getAnoStr()}{" "}
            <a href="https://geolabor.com.br" className="text-light">
              Geolabor
            </a>
          </div>
  
          <div className="text-muted">
            <small>
              Versão atual: <strong>XXXX</strong>. Desenvolvido por
              <a href="/" className="text-light">
                SimpleLab
              </a>
            </small>
          </div>
        </div>
      </footer>
    );
  }
  
  function getAnoStr() {
    const hoje = new Date();
    const anoInicial = 2018;
    const anoAtual = hoje.getFullYear();
  
    return anoAtual !== anoInicial ? `${anoInicial} - ${anoAtual}` : anoInicial;
  }
  