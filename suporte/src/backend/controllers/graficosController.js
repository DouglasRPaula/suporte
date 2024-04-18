const asyncHandle = require("express-async-handler");
const Chamados = require("../schemas/chamadosModel");

const getChamadosPorEmpresa = asyncHandle(async (req, res) => {
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

const getChamadosPorMes = asyncHandle(async (req, res) => {
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

const getChamadosPorMesECriticidade = asyncHandle(async (req, res) => {
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

const getBugsPorEmpresa = asyncHandle(async (req, res) => {
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

module.exports = {
  getChamadosPorEmpresa,
  getChamadosPorMes,
  getChamadosPorMesECriticidade,
  getBugsPorEmpresa,
};
