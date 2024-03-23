export default function Footer() {
  return (
    <footer className="footer">
      <div className="text-muted">
        © {getAnoStr()}{" "}
        <a href="https://github.com/DouglasRPaula" className="text-light">
          SLA - Tracker
        </a>
      </div>

      <div className="text-muted">
        <small>
          Versão atual: <strong>XXXX</strong>. Desenvolvido por {" "}
          <a href="https://www.linkedin.com/in/douglasrp/" className="text-light">
             Douglas R.
          </a>
        </small>
      </div>
    </footer>
  );
}

function getAnoStr() {
  const hoje = new Date();
  const anoInicial = 2022;
  const anoAtual = hoje.getFullYear();

  return anoAtual !== anoInicial ? `${anoInicial} - ${anoAtual}` : anoInicial;
}
