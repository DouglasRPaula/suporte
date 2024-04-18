const express = require("express");

const {
  getChamados,
  deleteChamados,
  postChamados,
  patchChamados,
  getChamadoById
} = require("../controllers/chamadosController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getChamados);
router.route("/edit/:id").patch(protect, patchChamados);
router.route("/:id").get(protect, getChamadoById);
router.route("/:id").delete(protect, deleteChamados);
router.route("/adicionar").post(protect, postChamados);

module.exports = router;
