const asyncHandler = require("express-async-handler");
const Chamados = require("../schemas/chamadosModel");

const getChamados = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const chamados = await Chamados.find()
      .sort({ dataInicio: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Chamados.countDocuments();
    res.status(200).json({
      chamados,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const postChamados = asyncHandler(async (req, res) => {
  try {
    const {
      numeroChamado,
      empresa,
      contrato,
      dataInicio,
      solicitante,
      criticidadeRevisada,
      dataEncerramento,
      chamadoEncerrado,
      tipoChamado,
      descricaoChamado,
      tempoChamado,
    } = req.body;

    const chamadoExistente = await Chamados.findOne({ numeroChamado });
    if (chamadoExistente) {
      return res.status(400).json({
        error:
          "Já existe um chamado como esse no sistema. Insira um valor diferente.",
      });
    }

    if (!numeroChamado) {
      res.status(422).json({ error: "Numero do chamado obrigatorio" });
      return;
    }

    const chamado = {
      numeroChamado,
      empresa,
      contrato,
      dataInicio,
      solicitante,
      criticidadeRevisada,
      dataEncerramento,
      chamadoEncerrado,
      tipoChamado,
      descricaoChamado,
      tempoChamado,
    };

    await Chamados.create(chamado);

    res.status(201).json({ message: "Chamado criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "erro interno" });
  }
});

const patchChamados = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const {
    numeroChamado,
    empresa,
    contrato,
    dataInicio,
    solicitante,
    criticidadeRevisada,
    dataEncerramento,
    chamadoEncerrado,
    tipoChamado,
    descricaoChamado,
    tempoChamado,
  } = req.body;

  const chamado = {
    numeroChamado,
    empresa,
    contrato,
    dataInicio,
    solicitante,
    criticidadeRevisada,
    dataEncerramento,
    chamadoEncerrado,
    tipoChamado,
    descricaoChamado,
    tempoChamado,
  };

  try {
    const updateChamado = await Chamados.updateOne({ _id: id }, chamado);

    if (updateChamado.matchedCount === 0) {
      res.status(422).json({ message: "O chamado não foi encontrado" });
      return;
    }

    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const deleteChamados = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const chamado = await Chamados.findByIdAndDelete(id);

    if (!chamado) {
      res.status(422).json({ message: "O chamado não foi encontrado " });
      return;
    }

    res.status(200).json({ message: "Chamado excluido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getChamadoById = asyncHandler(async (req, res) => {
  try {
    const chamado = await Chamados.findById(req.params.id);
    if (!chamado) {
      res.status(404).json({ message: 'Chamado não encontrado' });
      return;
    }
    res.json(chamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o chamado' });
  }
})

module.exports = {
  getChamados,
  postChamados,
  patchChamados,
  deleteChamados,
  getChamadoById,
};
