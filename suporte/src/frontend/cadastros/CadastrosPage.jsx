import { useDispatch } from "react-redux";
import Select from "./Select.js";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  empresas,
  contratos,
  tipoChamado,
  criticidades,
} from "../constants/opcoesFormulario.js";
import useCadastro from "../hooks/useCadastro.jsx";
import ErrorMessage from "../modal/ErrorMessage.jsx";
import { atualizarValor } from "../redux/chamadosSlice.js";

export default function CadastroPage() {
  const dispatch = useDispatch();
  const { chamado, errorMessage, aoEnviar, aoVoltar, handleSwitchChange } =
    useCadastro();
  const { chamadoEncerrado } = chamado;

  return (
    <div className="ml-sm-auto">
      <div className="my-2">
        <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h4 mb-0">Cadastro de chamados</h1>
        </div>
      </div>
      <Form id="cadastroForm" onSubmit={aoEnviar}>
        {errorMessage && <ErrorMessage message={errorMessage} />}
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
            <Select
              options={empresas}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "empresa",
                    valor: e.target.value,
                  })
                )
              }
            />
            <Form.Label>Contrato</Form.Label>
            <Select
              options={contratos}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "contrato",
                    valor: e.target.value,
                  })
                )
              }
            />
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
            <Select
              options={criticidades}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "criticidadeRevisada",
                    valor: e.target.value,
                  })
                )
              }
            />
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
            <Select
              options={tipoChamado}
              onChange={(e) =>
                dispatch(
                  atualizarValor({
                    campo: "tipoChamado",
                    valor: e.target.value,
                  })
                )
              }
            />
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
          <Button size="sm" variant="success" type="submit">
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
