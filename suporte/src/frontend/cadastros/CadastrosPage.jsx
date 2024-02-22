import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { atualizarValor, limparForm } from "../redux/cadastroSlice";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router";

export default function CadastroPage() {
  const chamado = useSelector((state) => state.chamados);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function aoEnviar(e) {
    e.preventDefault();

    const novoChamado = { ...chamado };

    const response = await fetch("http://localhost:5000/chamados/adicionar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoChamado),
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
    navigate("/");
  }

  const aoVoltar = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const [chamadoEncerrado, setChamadoEncerrado] = useState(false);

  const handleSwitchChange = () => {
    setChamadoEncerrado(!chamadoEncerrado);
  };

  return (
    <div className="ml-sm-auto pt-3">
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
            <select className="form-select">
              <option value="">Selecione uma empresa</option>
              <option value="cbmm">CBMM</option>
              <option value="reta">Reta</option>
              <option value="vale">Vale</option>
              <option value="gerdau">Gerdau</option>
              <option value="jmendes">JMendes</option>
              <option value="eurochem">Eurochem</option>
              <option value="mca">MCA</option>
              <option value="chammas">Chammas</option>
              <option value="samarco">Samarco</option>
            </select>

            <Form.Label>Contrato</Form.Label>
            <Form.Select>
              <option value="">Selecione um contrato</option>
              <option value={1}>Chammas novo</option>
              <option value={2}>Chammas antigo</option>
              <option value={3}>Vale CTO</option>
              <option value={4}>Vale Lims</option>
              <option value={5}>JMendes</option>
              <option value={6}>Eurochem</option>
              <option value={7}>MCA</option>
              <option value={8}>CBMM</option>
              <option value={9}>Samarco Projetos</option>
              <option value={0}>Samarco</option>
              <option value={11}>Vale Lims</option>
              <option value={12}>Reta</option>
              <option value={13}>Vale</option>
              <option value={14}>Gerdau</option>
            </Form.Select>
            <Form.Label>Data de Início</Form.Label>
            <Form.Control required type="date" />
            <Form.Label>Solicitante</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Digite o nome do solicitante"
            />
            <Form.Label>Criticidade revisada</Form.Label>
            <Form.Select>
              <option value>Selecione a criticidade do chamado</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Select>
            <Form.Label>Data de encerramento</Form.Label>
            <Form.Control
              required
              min="2000-01-01"
              max="2099-12-31"
              type="date"
            />
            <Form.Label>Chamado encerrado?</Form.Label>
            <Form.Check
              type="switch"
              label={chamadoEncerrado ? "Sim" : "Não"}
              onChange={handleSwitchChange}
              checked={chamadoEncerrado}
            ></Form.Check>
            <Form.Label>Tipo de chamado</Form.Label>
            <Form.Select>
              <option value>Selecione o tipo de chamado</option>
              <option value={1}>Bug</option>
              <option value={2}>Dúvida</option>
              <option value={3}>Modelo de ensaio</option>
              <option value={4}>Power BI</option>
            </Form.Select>
            <Form.Label>Descrição do chamado</Form.Label>
            <textarea
              id="descricaoChamado"
              required
              rows="3"
              type="text"
              className="form-control"
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
