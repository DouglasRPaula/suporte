import { Badge } from "react-bootstrap";

export default function TipoChamadoTag({tipoChamadoId}) {
  let tipoChamado;
  let cor;

  switch (tipoChamadoId) {
    case "Bug":
      tipoChamado = "Bug";
      cor = "danger";
      break;
    case "Modelo de ensaio":
      tipoChamado = "Modelo de ensaio";
      cor = "info";
      break;
    case "Dúvida":
      tipoChamado = "Dúvida";
      cor = "success";
      break;
    case "Power BI":
      tipoChamado = "Power BI";
      cor = "warning";
      break;
    default:
      tipoChamado = "Desconhecido";
      cor = "secondary";
  }

  return (
    <Badge pill bg={cor} text="white">
      {tipoChamado}
    </Badge>
  );
}
