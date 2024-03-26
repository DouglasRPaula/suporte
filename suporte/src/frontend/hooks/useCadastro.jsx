import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adicionarChamado,
  atualizarValor,
  limparForm,
  tempoChamado,
} from "../redux/chamadosSlice";

const BAD_REQUEST = 400;

export default function useCadastro() {
  const chamado = useSelector((state) => state.chamado);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chamadoEncerrado, setChamadoEncerrado] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formatarDataParaServer = (data) => {
    if (!data) return "";
    const dataFormatada = new Date(data);
    return dataFormatada.toISOString();
  };

  const aoEnviar = useCallback(
    async (e) => {
      e.preventDefault();

      if (!chamado) {
        setErrorMessage("chamado is undefined");
        return;
      }

      const { dataInicio, dataEncerramento } = chamado;

      const inicio = new Date(dataInicio);
      const encerramento = new Date(dataEncerramento);

      if (encerramento < inicio) {
        setErrorMessage(
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

  return { chamado, errorMessage, aoEnviar, aoVoltar, handleSwitchChange };
}
