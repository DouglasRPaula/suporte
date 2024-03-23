import { createSlice } from "@reduxjs/toolkit";

import {
  empresas,
  contratos,
  tipoChamado,
  criticidades,
} from "../constants/opcoesFormulario.js";

const calcularTempoChamado = (chamado) => {
  if (!chamado.dataInicio || !chamado.dataEncerramento) {
    return "Dados de início ou encerramento inválidos";
  }

  const dataInicio = new Date(chamado.dataInicio);
  const dataEncerramento = new Date(chamado.dataEncerramento);

  const inicioHorarioComercial = new Date(dataInicio);
  inicioHorarioComercial.setHours(7, 0, 0, 0);

  const fimHorarioComercial = new Date(dataEncerramento);
  fimHorarioComercial.setHours(18, 0, 0, 0);

  let tempoDentroHorarioComercial = 0;

  let dataAtual = new Date(dataInicio);

  while (dataAtual < dataEncerramento) {
    if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6) {
      const inicioDoDia = new Date(dataAtual);
      inicioDoDia.setHours(0, 0, 0, 0);

      const fimDoDia = new Date(dataAtual);
      fimDoDia.setHours(23, 59, 59, 999);

      const inicioIntervalo = Math.max(dataInicio, inicioDoDia);
      const fimIntervalo = Math.min(dataEncerramento, fimDoDia);

      if (inicioIntervalo < fimIntervalo) {
        tempoDentroHorarioComercial += fimIntervalo - inicioIntervalo;
      }
    }

    dataAtual.setDate(dataAtual.getDate() + 1);
  }

  const horas = Math.floor(tempoDentroHorarioComercial / (60 * 60 * 1000));
  const minutos = Math.floor(
    (tempoDentroHorarioComercial % (60 * 60 * 1000)) / (60 * 1000)
  );

  return `${horas}h:${minutos}min`;
};

const chamadoSlice = createSlice({
  name: "chamado",
  initialState: {
    numeroChamado: "",
    empresa: "",
    contrato: "",
    dataInicio: "",
    solicitante: "",
    criticidadeRevisada: "",
    dataEncerramento: "",
    chamadoEncerrado: "",
    descricaoChamado: "",
    tempoChamado: "",
    chamados: [],
    loading: false,
    error: null,
    opcoes: {
      empresas,
      contratos,
      tipoChamado,
      criticidades,
    },
    tipoChamadoSelecionado: "",
  },
  reducers: {
    atualizarValor: (state, action) => {
      const { campo, valor, error } = action.payload;

      if (error) {
        state.error = error;
      } else {
        state[campo] = valor;
      }
    },
    limparForm: (state) => {
      state.numeroChamado = "";
      state.empresa = "";
      state.contrato = "";
      state.dataInicio = "";
      state.solicitante = "";
      state.criticidadeRevisada = "";
      state.dataEncerramento = "";
      state.chamadoEncerrado = "";
      state.tipoChamado = "";
      state.descricaoChamado = "";
    },
    selecionarTipoChamado: (state, action) => {
      state.tipoChamadoSelecionado = action.payload;
    },
    adicionarChamado: (state, action) => {
      state.chamados.push(action.payload);
    },
    listaChamados: (state, action) => {
      const chamados = action.payload;
      if (Array.isArray(chamados)) {
        state.chamados = chamados;
      }
    },
    preencherChamados: (state, action) => {
      const chamado = action.payload;
      state.numeroChamado = chamado.numeroChamado;
      state.empresa = chamado.empresa;
      state.contrato = chamado.contrato;
      state.dataInicio = chamado.dataInicio;
      state.solicitante = chamado.solicitante;
      state.criticidadeRevisada = chamado.criticidadeRevisada;
      state.dataEncerramento = chamado.dataEncerramento;
      state.chamadoEncerrado = chamado.chamadoEncerrado;
      state.opcoes = chamado.opcoes;
      state.tipoChamado = chamado.tipoChamado;
      state.descricaoChamado = chamado.descricaoChamado;
      state.tempoChamado = chamado.tempoChamado;
    },
    tempoChamado: (state, action) => {
      state.tempoChamado = calcularTempoChamado(action.payload);
    },
    deletarChamado: (state, action) => {
      const idChamadoExcluir = action.payload;
      state.chamados = state.chamados.filter(
        (chamado) => chamado._id !== idChamadoExcluir
      );
    },
  },
});

export const {
  adicionarChamado,
  listaChamados,
  atualizarValor,
  limparForm,
  preencherChamados,
  tempoChamado,
  deletarChamado,
  selecionarTipoChamado,
} = chamadoSlice.actions;
export default chamadoSlice.reducer;
