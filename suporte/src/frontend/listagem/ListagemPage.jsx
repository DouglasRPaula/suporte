import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listaChamados } from "../redux/cadastroSlice";

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

  return (
    <div>
      <div className="my-2 app-name">
        <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h4 mb-0">Chamados</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Button className=" btn-primary">Novo registro</Button>
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
            chamados.map((chamado) => (
              <tr key={chamado._id}>
                <td>{chamado.numeroChamado}</td>
                <td>{chamado.empresa}</td>
                <td>{chamado.dataInicio}</td>
                <td>{chamado.solicitante}</td>
                <td>{chamado.criticidadeRevisada}</td>
                <td>{chamado.dataEncerramento}</td>
                <td>{chamado.tipoChamado}</td>
                <td>{chamado.descricaoChamado}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
