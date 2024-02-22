const mongoose = require("mongoose");

const ChamadosSchema = new mongoose.Schema({
    numeroChamado: Number,
    empresa: String,
    contrato: String,
    dataInicio: Date,
    solicitante: String,
    criticidadeRevisada: String,
    dataEncerramento: Date,
    chamadoEncerrado: String,
    tipoChamado: String,
    descricaoChamado: String,
})

const Chamados = mongoose.model('Chamados', ChamadosSchema);

module.exports = Chamados;
