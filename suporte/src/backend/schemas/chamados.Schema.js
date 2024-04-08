const mongoose = require("mongoose");
const {
  empresas,
  contratos,
  tipoChamado,
} = require("../../frontend/constants/opcoesFormulario.js");
const calcularTempoChamado = require("../modulos/calcularTempoChamado.js");

const ChamadosSchema = new mongoose.Schema({
  numeroChamado: String,
  empresa: Object,
  contrato: Object,
  dataInicio: Date,
  solicitante: String,
  criticidadeRevisada: Object,
  dataEncerramento: Date,
  chamadoEncerrado: Boolean,
  tipoChamado: Object,
  descricaoChamado: String,
  tempoChamado: String,
});

ChamadosSchema.pre("save", function (next) {
  this.empresa = empresas[this.empresa];
  this.contrato = contratos[this.contrato];
  this.tipoChamado = tipoChamado[this.tipoChamado];

  if (this.dataInicio instanceof Date) {
    this.dataInicio = this.dataInicio.toISOString();
  }

  if (this.dataEncerramento instanceof Date) {
    this.dataEncerramento = this.dataEncerramento.toISOString();
  }

  this.tempoChamado = calcularTempoChamado(this);

  next();
});

const Chamados = mongoose.model("Chamados", ChamadosSchema);

module.exports = Chamados;
