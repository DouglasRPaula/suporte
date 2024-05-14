import AcoesBotoes from "../components/AcoesBotoes";
import formatarData from "../formatters/DateFormat";
import TipoChamadoTag from "../formatters/TipoChamadoTags";

export default function ChamadoRow({ chamado, handleOpenModal }) {
  return (
    <tr key={chamado._id}>
      <td>#{chamado.numeroChamado}</td>
      <td>{chamado.empresa}</td>
      <td>{chamado.contrato}</td>
      <td style={{ textAlign: "center" }}>
        {formatarData(chamado.dataInicio)}
      </td>
      <td style={{ textAlign: "center" }}>{chamado.solicitante}</td>
      <td style={{ textAlign: "center" }}>{chamado.criticidadeRevisada}</td>
      <td style={{ textAlign: "center" }}>
        {formatarData(chamado.dataEncerramento)}
      </td>
      <td style={{ textAlign: "center" }}>
        {chamado.chamadoEncerrado || chamado.dataEncerramento ? "Sim" : "Não"}
      </td>
      <td style={{ textAlign: "center" }}>
        <TipoChamadoTag tipoChamado={chamado.tipoChamado} />
      </td>
      <td>{chamado.descricaoChamado}</td>
      <td style={{ textAlign: "center" }}>{chamado.tempoChamado}</td>
      <AcoesBotoes chamadoId={chamado._id} handleOpenModal={handleOpenModal} />
    </tr>
  );
}
