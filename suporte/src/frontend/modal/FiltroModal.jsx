import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function FiltroModal({ onFilter }) {
  const [show, setShow] = useState(false);
  const [filtros, setFiltros] = useState({
    numeroChamado: "",
    empresa: "",
    contrato: "",
    dataInicio: "",
    solicitante: "",
    criticidadeRevisada: "",
    tipoChamado: "",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (event) => {
    setFiltros({ ...filtros, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter(filtros);
    handleClose();
  };

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={handleShow}
        >
          <FontAwesomeIcon icon={faFilter} fixedWidth />
          Filtrar
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="numeroChamado" className="form-label">
                Número do chamado
              </label>
              <input
                type="text"
                className="form-control"
                id="numeroChamado"
                name="numeroChamado"
                value={filtros.numeroChamado}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="empresa" className="form-label">
                Empresa
              </label>
              <input
                type="text"
                className="form-control"
                id="empresa"
                name="empresa"
                value={filtros.empresa}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contrato" className="form-label">
                Contrato
              </label>
              <input
                type="text"
                className="form-control"
                id="contrato"
                name="contrato"
                value={filtros.contrato}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dataInicio" className="form-label">
                Data Inicio
              </label>
              <input
                type="date"
                className="form-control"
                id="dataInicio"
                name="dataInicio"
                value={filtros.dataInicio}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="solicitante" className="form-label">
                Solicitante
              </label>
              <input
                type="text"
                className="form-control"
                id="solicitante"
                name="solicitante"
                value={filtros.solicitante}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="criticidadeRevisada" className="form-label">
                Criticidade revisada
              </label>
              <input
                type="text"
                className="form-control"
                id="criticidadeRevisada"
                name="criticidadeRevisada"
                value={filtros.criticidadeRevisada}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipoChamado" className="form-label">
                Tipo do chamado
              </label>
              <input
                type="text"
                className="form-control"
                id="tipoChamado"
                name="tipoChamado"
                value={filtros.tipoChamado}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Aplicar Filtros
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
