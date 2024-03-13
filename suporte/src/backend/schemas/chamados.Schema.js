const mongoose = require("mongoose");
const {
  empresas,
  contratos,
  tipoChamado,
} = require("../../frontend/constants/opcoesFormulario.js");

const ChamadosSchema = new mongoose.Schema({
  numeroChamado: Number,
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

const calcularTempoChamado = (chamado) => {
  if (chamado.dataInicio && chamado.dataEncerramento) {
    const dataInicio = new Date(chamado.dataInicio);
    const dataEncerramento = new Date(chamado.dataEncerramento);

    const diferencaEmMilissegundos = dataEncerramento - dataInicio;
    const horas = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60));
    const minutos = Math.floor(
      (diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${horas}h:${minutos}min`;
  }

  return "";
};

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
