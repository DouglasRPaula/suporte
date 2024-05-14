import { Badge } from "react-bootstrap";

const tipoChamadoMap = {
  "Bug": { cor: "danger" },
  "Modelo de ensaio": { cor: "info" },
  "Dúvida": { cor: "success" },
  "Power BI": { cor: "warning" },
};

export default function TipoChamadoTag({ tipoChamado }) {
  const tipoChamadoInfo = tipoChamadoMap[tipoChamado] || { cor: "secondary" };

  return (
    <Badge pill bg={tipoChamadoInfo.cor} text="white">
      {tipoChamado}
    </Badge>
  );
}