import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listaChamados } from "../redux/cadastroSlice";
import { Link } from "react-router-dom";
import {
  contratos,
  empresas,
  tipoChamado,
} from "../constants/opcoesFormulario";

export default function ListagemPage() {
  const chamados = useSelector((state) => state.chamado.chamados);
  const dispatch = useDispatch();

  useEffect(() => {
    async function pegarChamados() {
      try {
        const response = await fetch(`http://localhost:5000/chamados`);

        if (!response.ok) {
          const message = `Ocorreu um  erro: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const data = await response.json();
        console.log("dados recebidos", data);
        dispatch(listaChamados(data));
      } catch (error) {
        console.error("erro ao pegar chamados:", error);
      }
    }
    pegarChamados();
  }, [dispatch]);

  const formatarData = (data) => {
    if (!data) return "";
    const dataFormatada = new Date(data);

    const dia = String(dataFormatada.getDate()).padStart(2, '0');
    const mes = String(dataFormatada.getMonth() + 1).padStart(2, '0');
    const ano = dataFormatada.getFullYear();
    const hora = String(dataFormatada.getHours()).padStart(2, '0');
    const minutos = String(dataFormatada.getMinutes()).padStart(2, '0');

    const dataHoraFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;

    return dataHoraFormatada;
  };

  return (
    <div>
      <div className="my-2 app-name">
        <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h4 mb-0">Chamados</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to="/novo-chamado">
              <Button className=" btn-primary">Novo registro</Button>
            </Link>
          </div>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Número do chamado</th>
            <th>Empresa</th>
            <th>Contrato</th>
            <th>Data Inicio</th>
            <th>Solicitante</th>
            <th>Criticidade revisada</th>
            <th>Data encerramento</th>
            <th>Chamado encerrado?</th>
            <th>tipo do chamado</th>
            <th>Descrição do chamado</th>
          </tr>
        </thead>
        <tbody>
          {chamados &&
            chamados.map((chamado, index) => (
              <tr key={chamado._id}>
                <td>{chamado.numeroChamado}</td>
                <td>{chamado.empresa && empresas[chamado.empresa]}</td>
                <td>{chamado.contrato && contratos[chamado.contrato]}</td>
                <td>{formatarData(chamado.dataInicio)}</td>
                <td>{chamado.solicitante}</td>
                <td>{chamado.criticidadeRevisada}</td>
                <td>{formatarData(chamado.dataEncerramento)}</td>
                <td>{chamado.chamadoEncerrado}</td>
                <td>
                  {chamado.tipoChamado && tipoChamado[chamado.tipoChamado]}
                </td>
                <td>{chamado.descricaoChamado}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
