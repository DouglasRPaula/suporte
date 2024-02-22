import { createSlice } from "@reduxjs/toolkit";

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
    error: null, // Adicionando error ao initialState
  },
  reducers: {
    atualizarValor: (state, action) => {
      const { campo, valor, error } = action.payload;

      if (error) {
        state.error = error;
      } else {
        state.error = null; // Limpe o erro ao atualizar o valor
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
      state.error = null; // Certifique-se de limpar o erro ao limpar o formulário
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
