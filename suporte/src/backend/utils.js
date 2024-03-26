const Joi = require("joi");

const chamadoSchema = Joi.object({
  numeroChamado: Joi.string().required(),
  empresa: Joi.string(),
  contrato: Joi.string(),
  dataInicio: Joi.date(),
  solicitante: Joi.string(),
  criticidadeRevisada: Joi.string(),
  dataEncerramento: Joi.date(),
  chamadoEncerrado: Joi.boolean(),
  tipoChamado: Joi.string(),
  descricaoChamado: Joi.string(),
  tempoChamado: Joi.string(),
  chamados: Joi.array().items(
    Joi.object({
      numeroChamado: Joi.string().required(),
      empresa: Joi.string(),
      contrato: Joi.string(),
      dataInicio: Joi.date(),
      solicitante: Joi.string(),
      criticidadeRevisada: Joi.string(),
      dataEncerramento: Joi.date(),
      chamadoEncerrado: Joi.boolean(),
      tipoChamado: Joi.string(),
      descricaoChamado: Joi.string(),
      tempoChamado: Joi.string(),
    })
  ),
});

function validateChamado(chamado) {
  const { error, value } = chamadoSchema.validate(chamado);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
}

function handleError(res, error) {
  console.error("Erro durante o processamento da solicitação", error);
  res.status(500).json({ error: error.message });
}

module.exports = { validateChamado, handleError };
