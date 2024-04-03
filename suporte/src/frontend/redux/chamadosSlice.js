import { createSlice } from "@reduxjs/toolkit";

import {
  empresas,
  contratos,
  tipoChamado,
  criticidades,
} from "../constants/opcoesFormulario.js";

const MILISEGUNDOS_POR_HORA = 1000 * 60 * 60;
const MILISEGUNDOS_POR_MINUTO = 1000 * 60;
const MILISEGUNDOS_POR_DIA = MILISEGUNDOS_POR_HORA * 24;

const calcularTempoChamado = (chamado) => {
  if (!chamado.dataInicio || !chamado.dataEncerramento) {
    return "Dados de início ou encerramento inválidos";
  }

  let dataInicio = new Date(chamado.dataInicio);
  let dataEncerramento = new Date(chamado.dataEncerramento);

  let diferencaEmMilissegundos = 0;

  while (dataInicio < dataEncerramento) {
    const diaDaSemana = dataInicio.getDay();
    if (diaDaSemana !== 0 && diaDaSemana !== 6) {
      // 0 é Domingo e 6 é Sábado
      const inicioHorarioComercial = new Date(dataInicio);
      inicioHorarioComercial.setHours(7, 0, 0, 0);

      const fimHorarioComercial = new Date(dataInicio);
      fimHorarioComercial.setHours(18, 0, 0, 0);

      const inicioIntervalo = Math.max(dataInicio, inicioHorarioComercial);
      const fimIntervalo = Math.min(dataEncerramento, fimHorarioComercial);

      if (inicioIntervalo < fimIntervalo) {
        diferencaEmMilissegundos += fimIntervalo - inicioIntervalo;
      }
    }
    dataInicio.setTime(dataInicio.getTime() + MILISEGUNDOS_POR_DIA);
  }

  const horas = Math.floor(diferencaEmMilissegundos / MILISEGUNDOS_POR_HORA);
  const minutos = Math.floor(
    (diferencaEmMilissegundos % MILISEGUNDOS_POR_HORA) / MILISEGUNDOS_POR_MINUTO
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
    chamadosPorMes: [],
    chamadosPorMesECriticidade: [],
    chamadosPorEmpresaEMes: [],
    bugsPorEmpresa: [],
    isLoading: false,
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
    fetchChamadosStart: (state) => {
      state.isLoading = true;
    },
    fetchChamadosSuccess: (state, action) => {
      state.chamados = action.payload;
      state.isLoading = false;
    },
    listaChamadosPorMes: (state, action) => {
      const chamados = action.payload;
      if (Array.isArray(chamados)) {
        state.chamadosPorMes = chamados;
      }
    },
    listaChamadosPorMesECriticidade: (state, action) => {
      const chamados = action.payload;
      if (Array.isArray(chamados)) {
        state.chamadosPorMesECriticidade = chamados;
      }
    },
    listachamadosPorEmpresaEMes: (state, action) => {
      const chamados = action.payload;
      if (Array.isArray(chamados)) {
        state.chamadosPorEmpresaEMes = chamados;
      }
    },
    listaBugsPorEmpresa: (state, action) => {
      const chamados = action.payload;
      if (Array.isArray(chamados)) {
        state.bugsPorEmpresa = chamados;
      }
    },
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
  fetchChamadosStart,
  fetchChamadosSuccess,
  listaChamados,
  atualizarValor,
  limparForm,
  listaChamadosPorMes,
  listaChamadosPorMesECriticidade,
  listachamadosPorEmpresaEMes,
  listaBugsPorEmpresa,
  preencherChamados,
  tempoChamado,
  deletarChamado,
  selecionarTipoChamado,
} = chamadoSlice.actions;
export default chamadoSlice.reducer;
