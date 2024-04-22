import { Button, Modal } from "react-bootstrap";
import { deletarChamado } from "../redux/chamadosSlice";
import { useDispatch } from "react-redux";

export default function DeleteConfirmationModal({
  show,
  onClose,
  chamadoId,
  onConfirm,
}) {
  const dispatch = useDispatch();

  const handleExcluirChamado = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chamados/${chamadoId}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );

      if (response.ok) {
        onClose();
        dispatch(deletarChamado(chamadoId));
        onConfirm();
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

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Deseja realmente excluir o chamado?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleExcluirChamado}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
