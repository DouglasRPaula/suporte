import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adicionarChamado,
  atualizarValor,
  limparForm,
  tempoChamado,
} from "../redux/chamadosSlice";
import { toast } from "react-toastify";

const BAD_REQUEST = 400;

export default function useCadastro() {
  const chamado = useSelector((state) => state.chamado);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chamadoEncerrado, setChamadoEncerrado] = useState(false);

  const formatarDataParaServer = (data) => {
    if (!data) return "";
    if (!(data instanceof Date) || isNaN(data.getTime())) {
      return "";
    }
    return data.toISOString();
  };

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

      const novoChamado = { ...chamado, chamadoEncerrado: chamadoEncerrado };

      dispatch(adicionarChamado(novoChamado));

      const dataInicioFormatted = formatarDataParaServer(
        new Date(chamado.dataInicio)
      );
      const dataEncerramentoFormatted = formatarDataParaServer(
        new Date(chamado.dataEncerramento)
      );

      const response = await fetch("http://localhost:5000/chamados/adicionar", {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...novoChamado,
          dataInicio: dataInicioFormatted,
          dataEncerramento: dataEncerramentoFormatted,
        }),
      });

      if (response.status === BAD_REQUEST) {
        const data = await response.json();
        dispatch(
          atualizarValor({
            error: data.error,
          })
        );
        return;
      }

      dispatch(limparForm());
      dispatch(tempoChamado(novoChamado));
      navigate("/chamados");
    },
    [chamado, chamadoEncerrado, dispatch, navigate]
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

  return { chamado, aoEnviar, aoVoltar, handleSwitchChange };
}
