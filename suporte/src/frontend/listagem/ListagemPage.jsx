import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listaChamados, deletarChamado } from "../redux/cadastroSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ListagemPage() {
  const chamados = useSelector((state) => state.chamado.chamados);
  const dispatch = useDispatch();
  const tempoChamado = useSelector((state) => state.chamado.tempoChamado);

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

  const handleExcluirChamado = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/chamados/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch(deletarChamado(id));
      } else {
        const data = await response.json();
        window.alert(`Erro ao excluir chamado: ${data.error}`);
      }
    } catch (error) {
      console.error("Erro ao excluir chamado:", error);
      window.alert(
        "Erro ao excluir chamado. Verifique o console para mais detalhes."
      );
    }
  };

  const formatarData = (data) => {
    if (!data) return "";
    const dataFormatada = new Date(data);

    const dia = String(dataFormatada.getDate()).padStart(2, "0");
    const mes = String(dataFormatada.getMonth() + 1).padStart(2, "0");
    const ano = dataFormatada.getFullYear();
    const hora = String(dataFormatada.getHours()).padStart(2, "0");
    const minutos = String(dataFormatada.getMinutes()).padStart(2, "0");

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
              <Button className=" btn-primary btn-sm">Novo registro</Button>
            </Link>
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" className="btn btn-outline-secondary btn-sm">
            <FontAwesomeIcon icon={faFilter} fixedWidth />
            Filtrar
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <Table striped className="fonte-doida">
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
              <th>Tempo do chamado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((chamado) => (
              <tr key={chamado._id}>
                <td>#{chamado.numeroChamado}</td>
                <td>{chamado.empresa}</td>
                <td>{chamado.contrato}</td>
                <td>{formatarData(chamado.dataInicio)}</td>
                <td>{chamado.solicitante}</td>
                <td>{chamado.criticidadeRevisada}</td>
                <td>{formatarData(chamado.dataEncerramento)}</td>
                <td>{chamado.chamadoEncerrado ? "Sim" : "Não"}</td>
                <td>{chamado.tipoChamado}</td>
                <td>{chamado.descricaoChamado}</td>
                <td>{chamado.tempoChamado || tempoChamado}</td>
                <td className="text-center text-nowrap align-middle no-print">
                  <Link to={`/editar-chamado/${chamado._id}`}>
                    <button className="bg-transparent border-0 px-0 mr-1">
                      <FontAwesomeIcon icon={faPencil} fixedWidth />
                    </button>
                  </Link>
                  <button
                    className="bg-transparent border-0 px-0 mr-1"
                    onClick={() => handleExcluirChamado(chamado._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} fixedWidth />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
