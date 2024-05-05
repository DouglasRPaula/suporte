import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  atualizarValor,
  preencherChamados,
  tempoChamado,
} from "../redux/chamadosSlice";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "../cadastros/Select";
import {
  contratos,
  criticidades,
  empresas,
  tipoChamado,
} from "../constants/opcoesFormulario";
import { toast } from "react-toastify";

export default function EditarChamado() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const chamado = useSelector((state) => state.chamado);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [chamadoEncerrado, setChamadoEncerrado] = useState(false);

  const formatarDataParaServer = (data) => {
    if (!data) return "";
    if (!(data instanceof Date) || isNaN(data.getTime())) {
      return "";
    }
    return data.toISOString();
  };

  const formatarDataParaInput = (data) => {
    if (!data) return "";

    const dataFormatada = new Date(data);
    const ano = dataFormatada.getFullYear();
    const mes = String(dataFormatada.getMonth() + 1).padStart(2, "0");
    const dia = String(dataFormatada.getDate()).padStart(2, "0");
    const horas = String(dataFormatada.getHours()).padStart(2, "0");
    const minutos = String(dataFormatada.getMinutes()).padStart(2, "0");

    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const id = params.id;
        const response = await fetch(`http://localhost:5000/chamados/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Erro ao obter os detalhes do chamado.");
        }
        const data = await response.json();
        dispatch(preencherChamados(data));
      } catch (error) {
        toast.error(
          "Erro ao obter os detalhes do chamado. Por favor, tente novamente."
        );
      }
    }
    fetchData();
  }, [dispatch, params.id]);

  const aoEnviar = useCallback(
    async (e) => {
      e.preventDefault();

      if (!chamado) {
        toast.error("chamado is undefined");
        return;
      }

      const { dataInicio, dataEncerramento } = chamado;

      const inicio = new Date(dataInicio);
      const encerramento = new Date(dataEncerramento);

      if (encerramento < inicio) {
        toast.error(
          "A data de encerramento não pode ser anterior à data de início."
        );
        return;
      }

      const dataInicioFormatted = formatarDataParaServer(
        new Date(chamado.dataInicio)
      );
      const dataEncerramentoFormatted = formatarDataParaServer(
        new Date(chamado.dataEncerramento)
      );

      try {
        const response = await fetch(
          `http://localhost:5000/chamados/edit/${params.id}`,
          {
            credentials: "include",
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...chamado,
              dataInicio: dataInicioFormatted,
              dataEncerramento: dataEncerramentoFormatted,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          dispatch(
            atualizarValor({
              error: data.error,
            })
          );
          return;
        } else {
          const updateData = await response.json();
          dispatch(preencherChamados(updateData));
          dispatch(tempoChamado(updateData));
          navigate("/chamados");
        }
      } catch (error) {
        toast.error(
          "Erro ao editar o chamado. Por favor, tente novamente.",
          error
        );
      }
    },
    [chamado, dispatch, navigate, params.id]
  );

  const aoVoltar = useCallback(
    (e) => {
      e.preventDefault();
      navigate("/chamados");
    },
    [navigate]
  );

  const handleSwitchChange = useCallback(
    (e) => {
      const valor = e.target.checked;
      setChamadoEncerrado(e.target.checked);

      dispatch(atualizarValor({ campo: "chamadoEncerrado", valor }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div className="ml-sm-auto">
      <div className="my-2">
        <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h4 mb-0">Atualizar chamado</h1>
        </div>
      </div>
      <Form id="cadastroForm" onSubmit={aoEnviar}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Número do chamado</Form.Label>
            <input
              required
              value={chamado.numeroChamado}
              type="text"
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
              value={chamado.empresa}
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
              value={chamado.contrato}
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
              value={formatarDataParaInput(chamado.dataInicio)}
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
              value={chamado.solicitante}
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
              value={chamado.criticidadeRevisada}
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
              value={formatarDataParaInput(chamado.dataEncerramento)}
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
              value={chamado.tipoChamado}
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
              value={chamado.descricaoChamado}
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
