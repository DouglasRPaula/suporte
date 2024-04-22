const express = require("express");

const {
  getChamadosPorEmpresa,
  getChamadosPorMes,
  getChamadosPorMesECriticidade,
  getBugsPorEmpresa,
  getAnosDisponiveis,
} = require("../controllers/graficosController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/anosDisponiveis").get(protect, getAnosDisponiveis);
router.route("/chamadosPorEmpresaEMes").get(protect, getChamadosPorEmpresa);
router.route("/chamadosPorMes").get(protect, getChamadosPorMes);
router
  .route("/chamadosPorMesECriticidade")
  .get(protect, getChamadosPorMesECriticidade);
router.route("/bugsPorEmpresa").get(protect, getBugsPorEmpresa);

module.exports = router;
