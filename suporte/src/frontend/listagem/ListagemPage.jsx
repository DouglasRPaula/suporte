import { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listaChamados } from "../redux/chamadosSlice";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../modal/DeleteModal";
import ChamadoRow from "../constants/ChamadoRow";
import ErrorMessage from "../modal/ErrorMessage";
import Paginacao from "../components/Paginacao";
import FiltroModal from "../modal/FiltroModal";

export default function ListagemPage() {
  const chamados = useSelector((state) => state.chamado.chamados);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [chamadoId, setChamadoId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [chamadosPorPagina] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filtrosAtuais, setFiltrosAtuais] = useState({});

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenModal = useCallback((id) => {
    setChamadoId(id);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setChamadoId(null);
  }, []);

  const pegarChamados = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `http://localhost:5000/chamados?page=${page}&limit=${chamadosPorPagina}`
        );

        if (!response.ok) {
          ErrorMessage(`Ocorreu um  erro: ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setTotalPages(data.totalPages);
        const chamadosOrdenados = data.chamados.sort(
          (a, b) => new Date(b.dataInicio) - new Date(a.dataInicio)
        );

        dispatch(listaChamados(chamadosOrdenados));
      } catch (error) {
        ErrorMessage("erro ao pegar chamados:", error);
      }
    },
    [dispatch, chamadosPorPagina]
  );

  const handleFilter = (filtros) => {
    setFiltrosAtuais(filtros);
    pegarChamados(currentPage, filtros);
  };

  

  useEffect(() => {
    pegarChamados(currentPage, filtrosAtuais);
  }, [pegarChamados, currentPage, filtrosAtuais]);

  return (
    <div>
      <div className="my-2 app-name">
        <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h4 mb-0">Chamados</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to="/novo-chamado">
              <Button className=" btn-primary btn-sm">Novo registro</Button>
            </Link>
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <FiltroModal onFilter={handleFilter} />
        </div>
      </div>
      <div className="overflow-auto">
        <Table striped className="fonte-doida">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>Número do chamado</th>
              <th>Empresa</th>
              <th>Contrato</th>
              <th>Data Inicio</th>
              <th>Solicitante</th>
              <th>Criticidade revisada</th>
              <th>Data encerramento</th>
              <th>Chamado encerrado?</th>
              <th>tipo do chamado</th>
              <th>Descrição do chamado</th>
              <th>Tempo do chamado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((chamado) => (
              <ChamadoRow
                key={chamado._id}
                chamado={chamado}
                handleOpenModal={handleOpenModal}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <DeleteConfirmationModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={() => {
          handleCloseModal();
        }}
        chamadoId={chamadoId}
      />
      <Paginacao
        chamadosPorPagina={chamadosPorPagina}
        totalChamados={totalPages * chamadosPorPagina}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
