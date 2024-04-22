import { createSlice } from "@reduxjs/toolkit";

import {
  empresas,
  contratos,
  tipoChamado,
  criticidades,
} from "../constants/opcoesFormulario.js";
import calcularTempoChamado from "../../backend/modulos/calcularTempoChamado.js";

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
    anosDisponiveis: [],
    anoSelecionado: new Date().getFullYear(),
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
    setAnosDisponiveis: (state, action) => {
      state.anosDisponiveis = action.payload;
    },
    setAnoSelecionado: (state, action) => {
      state.anoSelecionado = action.payload;
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
      state.tempoChamado = calcularTempoChamado(chamado);
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
  setAnosDisponiveis,
  setAnoSelecionado,
  adicionarChamado,
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
