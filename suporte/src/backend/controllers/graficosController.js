const asyncHandle = require("express-async-handler");
const Chamados = require("../schemas/chamadosModel");

const getAnosDisponiveis = asyncHandle(async (req, res) => {
  try {
    const anos = await Chamados.aggregate([
      {
        $project: {
          year: { $year: "$dataInicio" },
        },
      },
      {
        $group: {
          _id: "$year",
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]).exec();

    const anosDisponiveis = anos.map((ano) => ano._id);
    res.status(200).json(anosDisponiveis);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

const getChamadosPorEmpresa = asyncHandle(async (req, res) => {
  const ano = req.query.ano;
  const matchStage = ano
    ? {
        $match: {
          dataInicio: {
            $gte: new Date(`${ano}-01-01T00:00:00.000Z`),
            $lte: new Date(`${ano}-12-31T23:59:59.999Z`),
          },
        },
      }
    : {};

  try {
    const chamadosPorEmpresaEMes = await Chamados.aggregate([
      ...(ano ? [matchStage] : []),
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
    ]).exec();

    res.status(200).json(chamadosPorEmpresaEMes);
  } catch (error) {
    console.error("Erro ao buscar chamados por empresa e mês:", error);
    res.status(500).json({ error: error.message });
  }
});

const getChamadosPorMes = asyncHandle(async (req, res) => {
  const ano = req.query.ano;
  const matchStage = ano
    ? {
        $match: {
          dataInicio: {
            $gte: new Date(`${ano}-01-01T00:00:00.000Z`),
            $lte: new Date(`${ano}-12-31T23:59:59.999Z`),
          },
        },
      }
    : {};

  try {
    const chamadosPorMes = await Chamados.aggregate([
      ...(ano ? [matchStage] : []),
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
    ]).exec();

    res.status(200).json(chamadosPorMes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getChamadosPorMesECriticidade = asyncHandle(async (req, res) => {
  const ano = req.query.ano;
  try {
    const matchStage = ano
      ? {
          $match: {
            dataInicio: {
              $gte: new Date(`${ano}-01-01T00:00:00.000Z`),
              $lte: new Date(`${ano}-12-31T23:59:59.999Z`),
            },
          },
        }
      : {};

    const pipeline = [
      ...(ano ? [matchStage] : []),
      {
        $group: {
          _id: {
            month: { $month: "$dataInicio" },
            criticidade: "$criticidadeRevisada",
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1, "_id.criticidade": 1 },
      },
    ];

    const chamadosPorMesECriticidade = await Chamados.aggregate(
      pipeline
    ).exec();

    res.status(200).json(chamadosPorMesECriticidade);
  } catch (error) {
    console.error("Erro ao buscar chamados por mês e criticidade:", error);
    res.status(500).json({ error: error.message });
  }
});

const getBugsPorEmpresa = asyncHandle(async (req, res) => {
  const ano = req.query.ano;
  const matchStage = ano
    ? {
        $match: {
          dataInicio: {
            $gte: new Date(`${ano}-01-01T00:00:00.000Z`),
            $lte: new Date(`${ano}-12-31T23:59:59.999Z`),
          },
        },
      }
    : {};

  try {
    const bugsPorEmpresa = await Chamados.aggregate([
      ...(ano ? [matchStage] : []),
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
    ]).exec();

    res.status(200).json(bugsPorEmpresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  getAnosDisponiveis,
  getChamadosPorEmpresa,
  getChamadosPorMes,
  getChamadosPorMesECriticidade,
  getBugsPorEmpresa,
};
