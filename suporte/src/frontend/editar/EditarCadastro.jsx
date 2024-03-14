import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  atualizarValor,
  limparForm,
  preencherChamados,
} from "../redux/chamadosSlice.js";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router";
import {
  empresas,
  contratos,
  tipoChamado,
  criticidades,
} from "../constants/opcoesFormulario.js";

export default function EditarChamado() {
  const chamado = useSelector((state) => state.chamado);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const formatarDataParaServer = (data) => {
    if (!data) return "";
    const dataFormatada = new Date(data);
    return dataFormatada.toISOString();
  };

  useEffect(() => {
    async function fetchData() {
      const id = params.id;
      const response = await fetch(
        `http://localhost:5000/chamados/${params.id}`
      );

      if (!response.ok) {
        const message = `Ocorreu um erro ${response.statusText}`;
        window.alert(message);
        return;
      }

      const chamado = await response.json();
      if (!chamado) {
        window.alert(`chamado com o ${id} não encontrado`);
        navigate("/");
        return;
      }

      dispatch(preencherChamados(chamado));
    }

    fetchData();
  }, [params.id, navigate, dispatch]);

  async function aoEnviar(e) {
    e.preventDefault();

    const chamadoEditado = {
      numeroChamado: chamado.numeroChamado,
      empresa: chamado.empresa,
      contrato: chamado.contrato,
      dataInicio: chamado.dataInicio,
      solicitante: chamado.solicitante,
      criticidadeRevisada: chamado.criticidade,
      dataEncerramento: chamado.dataEncerramento,
      chamadoEncerrado: chamado.chamadoEncerrado,
      tipoChamado: chamado.tipoChamado,
      descricaoChamado: chamado.descricaoChamado,
      tempoChamado: chamado.tempoChamado,
    };

    const dataInicioFormatted = formatarDataParaServer(
      new Date(chamado.dataInicio)
    );
    const dataEncerramentoFormatted = formatarDataParaServer(
      new Date(chamado.dataEncerramento)
    );

    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        chamadoEditado,
        dataInicio: dataInicioFormatted,
        dataEncerramento: dataEncerramentoFormatted,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(limparForm());
    navigate("/chamados");
  }

  const aoVoltar = (e) => {
    e.preventDefault();
    navigate("/chamados");
  };

  const [chamadoEncerrado, setChamadoEncerrado] = useState(false);

  const handleSwitchChange = (e) => {
    setChamadoEncerrado(e.target.checked);

    dispatch(
      atualizarValor({ campo: "chamadoEncerrado", valor: e.target.checked })
    );
  };

  return (
    <div className="ml-sm-auto">
      <div className="my-2">
        <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h4 mb-0">Editar chamado</h1>
        </div>
      </div>
      <Form onSubmit={aoEnviar}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Número do chamado</Form.Label>
            <input
              required
              type="number"
              value={chamado.numeroChamado}
              className="form-control"
              placeholder="Número do chamado"
              id="numeroChamado"
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "numeroChamado",
                    valor: e.target.value,
                  })
                )
              }
            />
            <Form.Label>Empresa</Form.Label>
            <select
              className="form-select"
              value={chamado.empresa}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "empresa",
                    valor: e.target.value,
                  })
                )
              }
            >
              <option value="">Selecione uma empresa</option>
              {Object.entries(empresas).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <Form.Label>Contrato</Form.Label>
            <select
              className="form-select"
              value={chamado.contrato}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "contrato",
                    valor: e.target.value,
                  })
                )
              }
            >
              {Object.entries(contratos).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <Form.Label>Data de Início</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              min="2000-01-01T00:00"
              value={chamado.dataInicio}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "dataInicio",
                    valor: e.target.value,
                  })
                )
              }
            />
            <Form.Label>Solicitante</Form.Label>
            <Form.Control
              required
              type="text"
              value={chamado.solicitante}
              placeholder="Digite o nome do solicitante"
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "solicitante",
                    valor: e.target.value,
                  })
                )
              }
            />
            <Form.Label>Criticidade revisada</Form.Label>
            <select
              className="form-select"
              value={chamado.criticidadeRevisada}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "criticidadeRevisada",
                    valor: e.target.value,
                  })
                )
              }
            >
              {Object.entries(criticidades).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <Form.Label>Data de encerramento</Form.Label>
            <Form.Control
              required
              min="2000-01-01T00:00"
              max="2099-12-31T00:00"
              type="datetime-local"
              value={chamado.dataEncerramento}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "dataEncerramento",
                    valor: e.target.value,
                  })
                )
              }
            />
            <Form.Label>Chamado encerrado?</Form.Label>
            <Form.Check
              type="switch"
              value={chamado.chamadoEncerrado}
              label={chamadoEncerrado ? "Sim" : "Não"}
              checked={chamadoEncerrado}
              onChange={handleSwitchChange}
            ></Form.Check>
            <Form.Label>Tipo de chamado</Form.Label>
            <select
              className="form-select"
              value={chamado.tipoChamado}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "tipoChamado",
                    valor: e.target.value,
                  })
                )
              }
            >
              <option value="">Selecione o tipo de chamado</option>
              {Object.entries(tipoChamado).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <Form.Label>Descrição do chamado</Form.Label>
            <textarea
              id="descricaoChamado"
              required
              rows="3"
              type="text"
              value={chamado.descricaoChamado}
              className="form-control"
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "descricaoChamado",
                    valor: e.target.value,
                  })
                )
              }
            ></textarea>
          </Form.Group>
        </Row>
        <div className="m-1">
          <Button size="sm" onSubmit={aoEnviar} variant="success" type="submit">
            Enviar
          </Button>{" "}
          <Button size="sm" onClick={aoVoltar}>
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
}
