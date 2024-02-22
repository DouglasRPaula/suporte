import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function CadastroPage() {
  const [validado, setValidado] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidado(true);
  };

  return (
    <main className="ml-sm-auto pt-3">
      <div className="my-2">
        <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h4 mb-0">Editar chamado</h1>
        </div>
      </div>
      <Form noValidate validated={validado} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="valiationCustom01">
            <Form.Label>Número do chamado</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Número do chamado"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Empresa</Form.Label>
            <Form.Select>
              <option value>Selecione uma empresa</option>
              <option value={1}>CBMM</option>
              <option value={2}>Reta</option>
              <option value={3}>Vale</option>
              <option value={4}>Gerdau</option>
              <option value={5}>JMendes</option>
              <option value={6}>Eurochem</option>
              <option value={7}>MCA</option>
              <option value={8}>Chammas</option>
              <option value={9}>Samarco</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            {" "}
            {/* colocar logica de validação para se a empresa for x só pode aparecer certos contratos/ não mostrar contratos */}
            <Form.Label>Contrato</Form.Label>
            <Form.Select>
              <option value>Selecione um contrato</option>
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
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Data de Início</Form.Label>
            <Form.Control required type="date" />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>Solicitante</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Digite o nome do solicitante"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>Criticidade revisada</Form.Label>
            <Form.Select>
              <option value>Selecione a criticidade do chamado</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Data de encerramento</Form.Label>
            <Form.Control
              required
              min="2000-01-01"
              max="2099-12-31"
              type="date"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>Chamado encerrado?</Form.Label>
            <Form.Check type="switch" />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom08">
            <Form.Label>Tipo de chamado</Form.Label>
            <Form.Select>
              <option value>Selecione o tipo de chamado</option>
              <option value={1}>Bug</option>
              <option value={2}>Dúvida</option>
              <option value={3}>Modelo de ensaio</option>
              <option value={4}>Power BI</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group md="4" controlId="validationCustom08">
          <Form.Label>Descrição do chamado</Form.Label>
          <textarea
            required
            rows="3"
            type="text"
            className="form-control"
          ></textarea>
        </Form.Group>
      </Form>
      <div className="m-1 gap-2">
        <Button size="sm" variant="success" type="submit">
          Enviar
        </Button>{" "}
        <Button size="sm" type="submit">
          Cancelar
        </Button>
      </div>
    </main>
  );
}
