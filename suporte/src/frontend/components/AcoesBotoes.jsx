import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AcoesBotoes({ chamadoId, handleOpenModal }) {
  return (
    <td className="text-center text-nowarp align-middle no-print">
      <Link to={`/editar-chamado/${chamadoId}`}>
        <button className="bg-transparent border-0 px-0 mr-1">
          <FontAwesomeIcon icon={faPencil} fixedWidth />
        </button>
      </Link>
      <button
        onClick={() => handleOpenModal(chamadoId)}
        className="bg-transparent border-0 px-0 mr-1"
      >
        <FontAwesomeIcon icon={faTrash} fixedWidth />
      </button>
    </td>
  );
}
