import { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listaChamados } from "../redux/chamadosSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../modal/DeleteModal";
import ChamadoRow from "../constants/ChamadoRow";
import Paginacao from "../components/Paginacao";
import FiltroModal from "../modal/FiltroModal";

export default function ListagemChamadosPage() {
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
    async (page = 1, filtros = {}) => {
      const queryString = new URLSearchParams({
        page,
        limit: chamadosPorPagina,
        ...filtros,
      }).toString();
      try {
        const response = await fetch(
          `http://localhost:5000/chamados?${queryString}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          toast.error(`Ocorreu um  erro inesperado: ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setTotalPages(data.totalPages);
        const chamadosOrdenados = data.chamados.sort(
          (a, b) => new Date(b.dataInicio) - new Date(a.dataInicio)
        );

        dispatch(listaChamados(chamadosOrdenados));
      } catch (error) {
        toast.error("erro ao atualizar lista de chamados:", error);
      }
    },
    [dispatch, chamadosPorPagina]
  );

  const handleFilter = (filtros) => {
    setFiltrosAtuais(filtros);
    pegarChamados(1, filtros);
  };

  const handleRemoveFilter = (filterKey) => {
    const newFilters = { ...filtrosAtuais };
    delete newFilters[filterKey];
    setFiltrosAtuais(newFilters);
    pegarChamados(1, newFilters);
  };

  const reloadChamados = useCallback(() => {
    const newPage = Math.max(
      1,
      currentPage - (chamados.length === 1 && currentPage > 1 ? 1 : 0)
    );
    setCurrentPage(newPage);
    pegarChamados(newPage, filtrosAtuais);
  }, [currentPage, chamados.length, filtrosAtuais, pegarChamados]);

  useEffect(() => {
    reloadChamados();
    pegarChamados(currentPage, filtrosAtuais);
  }, [pegarChamados, currentPage, filtrosAtuais, reloadChamados]);

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
        <div className="d-grid gap-2 d-md-flex justify-content-between">
          <div className="filter-badges filter-container">
            {Object.entries(filtrosAtuais).map(
              ([key, value]) =>
                value && (
                  <div className="badge" key={key}>
                    {`${key}: ${value}`}{" "}
                    <span onClick={() => handleRemoveFilter(key)}>✕</span>
                  </div>
                )
            )}
          </div>
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
          reloadChamados();
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
