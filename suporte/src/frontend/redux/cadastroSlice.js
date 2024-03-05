import { createSlice } from "@reduxjs/toolkit";

import {
  empresas,
  contratos,
  criticidades,
  tipoChamado,
} from "../constants/opcoesFormulario";

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
    tipoChamado: "",
    descricaoChamado: "",
    chamados: [],
    opcoes: {
      empresas,
      contratos,
      criticidades,
      tipoChamado,
    },
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
    adicionarChamado: (state, action) => {
      state.chamados.push(action.payload);
    },
    listaChamados: (state, action) => {
      const registros = action.payload;
      if (Array.isArray(registros)) {
        state.chamados = registros;
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
      state.tipoChamado = chamado.tipoChamado;
      state.descricaoChamado = chamado.descricaoChamado;
    },
  },
});

export const {
  adicionarChamado,
  listaChamados,
  atualizarValor,
  limparForm,
  preencherChamados,
} = chamadoSlice.actions;
export default chamadoSlice.reducer;
