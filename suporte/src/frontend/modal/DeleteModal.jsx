import { Button, Modal } from "react-bootstrap";
import { deletarChamado } from "../redux/chamadosSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
        toast.success("Chamado excluído com sucesso.");
      } else {
        const data = await response.json();
        toast.error(`Erro ao excluir chamado: ${data.error}`);
      }
    } catch (error) {
      toast.error("Erro ao excluir chamado.", error);
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
