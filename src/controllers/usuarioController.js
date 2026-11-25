const UsuarioModel = require("../models/usuarioModel");

// Camada de controle: valida entrada, chama o Model e responde em JSON
const UsuarioController = {
  async listar(req, res) {
    try {
      const usuarios = await UsuarioModel.listarTodos();
      res.status(200).json(usuarios);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro interno ao listar usuários." });
    }
  },

  async criar(req, res) {
    try {
      const { nome, email } = req.body;
      if (!nome || !email) {
        return res.status(400).json({ erro: "Campos nome e email são obrigatórios." });
      }
      const id = await UsuarioModel.criar(nome, email);
      res.status(201).json({ id, nome, email });
    } catch (err) {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ erro: "E-mail já cadastrado." });
      }
      res.status(500).json({ erro: "Erro interno ao criar usuário." });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;
      if (!nome || !email) {
        return res.status(400).json({ erro: "Campos nome e email são obrigatórios." });
      }
      const afetados = await UsuarioModel.atualizar(id, nome, email);
      if (afetados === 0) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }
      res.status(200).json({ id: Number(id), nome, email });
    } catch (err) {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ erro: "E-mail já cadastrado." });
      }
      res.status(500).json({ erro: "Erro interno ao atualizar usuário." });
    }
  },

  async remover(req, res) {
    try {
      const afetados = await UsuarioModel.remover(req.params.id);
      if (afetados === 0) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }
      res.status(200).json({ mensagem: "Usuário removido com sucesso." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro interno ao remover usuário." });
    }
  },
};

module.exports = UsuarioController;
