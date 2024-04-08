const express = require("express");
const router = express.Router();

const Chamados = require("../schemas/chamados.Schema");

router.get("/chamados", async (req, res) => {
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

router.get("/chamadosPorEmpresaEMes", async (req, res) => {
  try {
    const chamadosPorEmpresaEMes = await Chamados.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$dataInicio" },
            year: { $year: "$dataInicio" },
            empresa: "$empresa",
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.empresa": 1 } },
    ]);

    res.status(200).json(chamadosPorEmpresaEMes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/chamadosPorMes", async (req, res) => {
  try {
    const chamadosPorMes = await Chamados.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$dataInicio" },
            month: { $month: "$dataInicio" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json(chamadosPorMes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/chamadosPorMesECriticidade", async (req, res) => {
  try {
    const chamadosPorMesECriticidade = await Chamados.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$dataInicio" },
            criticidade: "$criticidadeRevisada",
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1, "_id.criticidade": 1 } },
    ]);

    res.status(200).json(chamadosPorMesECriticidade);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/bugsPorEmpresa", async (req, res) => {
  try {
    const bugsPorEmpresa = await Chamados.aggregate([
      {
        $match: {
          $or: [{ criticidade: 1 }, { tipoChamado: "Bug" }],
        },
      },
      {
        $group: {
          _id: {
            empresa: "$empresa",
            mes: { $month: "$dataInicio" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.empresa": 1, "_id.mes": 1 } },
    ]);

    res.status(200).json(bugsPorEmpresa);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/chamados/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const chamado = await Chamados.findOne({ _id: id });

    if (!chamado) {
      res.status(422).json({ message: "O chamado não foi encontrado " });
      return;
    }

    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/chamados/adicionar", async (req, res) => {
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
    console.log("erro durante o processamento da solicitacao", error);
    res.status(500).json({ error: "erro interno" });
  }
});

router.patch("/chamados/edit/:id", async (req, res) => {
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

router.delete("/chamados/:id", async (req, res) => {
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

module.exports = router;
