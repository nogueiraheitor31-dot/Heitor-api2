const express = require("express");
const UsuarioController = require("../controllers/usuarioController");

const router = express.Router();

// Rotas ligam o verbo HTTP à função do Controller (sem SQL aqui)
router.get("/", UsuarioController.listar);
router.post("/", UsuarioController.criar);
router.put("/:id", UsuarioController.atualizar);
router.delete("/:id", UsuarioController.remover);

module.exports = router;
