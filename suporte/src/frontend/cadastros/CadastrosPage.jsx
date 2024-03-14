import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarChamado,
  atualizarValor,
  limparForm,
  tempoChamado,
} from "../redux/chamadosSlice.js";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router";
import {
  empresas,
  contratos,
  tipoChamado,
  criticidades,
} from "../constants/opcoesFormulario.js";

export default function CadastroPage() {
  const chamado = useSelector((state) => state.chamado);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatarDataParaServer = (data) => {
    if (!data) return "";
    const dataFormatada = new Date(data);
    return dataFormatada.toISOString();
  };

  async function aoEnviar(e) {
    e.preventDefault();

    if (!chamado) {
      console.error("chamado is undefined");
      return;
    }

    const novoChamado = { ...chamado, chamadoEncerrado: chamadoEncerrado };

    dispatch(adicionarChamado(novoChamado));

    const dataInicioFormatted = formatarDataParaServer(
      new Date(chamado.dataInicio)
    );
    const dataEncerramentoFormatted = formatarDataParaServer(
      new Date(chamado.dataEncerramento)
    );

    const response = await fetch("http://localhost:5000/chamados/adicionar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...novoChamado,
        dataInicio: dataInicioFormatted,
        dataEncerramento: dataEncerramentoFormatted,
      }),
    });

    if (response.status === 400) {
      const data = await response.json();
      dispatch(
        atualizarValor({
          error: data.error,
        })
      );
      return;
    }

    dispatch(limparForm());
    dispatch(tempoChamado(novoChamado));
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
          <h1 className="h4 mb-0">Cadastro de chamados</h1>
        </div>
      </div>
      <Form onSubmit={aoEnviar}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Número do chamado</Form.Label>
            <input
              required
              type="number"
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
              required
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "empresa",
                    valor: e.target.value,
                  })
                )
              }
            >
              <option value="" selected disabled>
                Selecione uma empresa
              </option>
              {Object.entries(empresas).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <Form.Label>Contrato</Form.Label>
            <select
              className="form-select"
              required
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "contrato",
                    valor: e.target.value,
                  })
                )
              }
            >
              <option value="" selected disabled>
                Selecione um contrato
              </option>
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
              required
              className="form-select"
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "criticidadeRevisada",
                    valor: e.target.value,
                  })
                )
              }
            >
              <option value="" selected disabled>
                Selecione a criticidade
              </option>
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
              label={chamadoEncerrado ? "Sim" : "Não"}
              checked={chamadoEncerrado}
              onChange={handleSwitchChange}
            ></Form.Check>
            <Form.Label>Tipo de chamado</Form.Label>
            <select
              required
              className="form-select"
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "tipoChamado",
                    valor: e.target.value,
                  })
                )
              }
            >
              <option value="" disabled selected>
                Selecione o tipo de chamado
              </option>
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
