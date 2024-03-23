import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { preencherChamados } from '../redux/chamadosSlice';

export default function EditarCadastro({ show, onHide, chamado }) {
  const dispatch = useDispatch();
  const [editChamado, setEditChamado] = useState(chamado);

  useEffect(() => {
    setEditChamado(chamado);
  }, [chamado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditChamado({ ...editChamado, [name]: value });
  };

  const handleSaveChanges = () => {
    dispatch(preencherChamados(editChamado));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Chamado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNumeroChamado">
            <Form.Label>Número do Chamado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o número do chamado"
              name="numeroChamado"
              value={editChamado.numeroChamado}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Adicione outros campos aqui conforme necessário */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
}