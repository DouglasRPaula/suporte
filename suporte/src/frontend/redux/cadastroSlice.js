import { createSlice } from "@reduxjs/toolkit";

import {
  empresas,
  contratos,
  tipoChamado,
  criticidades,
} from "../constants/opcoesFormulario.js";

const calcularTempoChamado = (chamado) => {
  if (chamado.dataInicio && chamado.dataEncerramento) {
    const dataInicio = new Date(chamado.dataInicio);
    const dataEncerramento = new Date(chamado.dataEncerramento);

    const diferencaEmMilissegundos = dataEncerramento - dataInicio;
    const dias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferencaEmMilissegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutos = Math.floor(
      (diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${dias}d ${horas}h ${minutos}min`;
  }

  return "";
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
    tipoChamado: "",
    descricaoChamado: "",
    chamados: [],
    opcoes: {
      empresas,
      contratos,
      tipoChamado,
      criticidades,
    },
    tempoChamado: "",
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
      state.opcoes = chamado.opcoes;
      state.tipoChamado = chamado.tipoChamado;
      state.descricaoChamado = chamado.descricaoChamado;
      state.tempoChamado = chamado.tempoChamado;
    },
    tempoChamado: (state, action) => {
      state.tempoChamado = calcularTempoChamado(action.payload);

      if (state.chamado) {
        state.chamado.tempoChamado = state.tempoChamado;
      }
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
} = chamadoSlice.actions;
export default chamadoSlice.reducer;
