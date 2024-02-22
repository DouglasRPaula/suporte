const express = require("express");
const router = express.Router();

const Chamados = require("../schemas/chamados.Schema");

router.get("/", (req, res) => {
  res.json({ message: "im in" });
});

router.get("/chamados", async (req, res) => {
  try {
    const chamados = await Chamados.find();

    res.status(200).json(chamados);
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
    };

    await Chamados.create(chamado);

    res.status(201).json({ message: "Chamado criado com sucesso" });
  } catch (error) {
    console.log("erro durante o processamento da solicitacao", error);
    res.status(500).json({ error: "erro interno" });
  }
});

module.exports = router;
