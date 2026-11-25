const pool = require("../config/db");

// Camada de dados: único lugar onde existe SQL (sempre parametrizado)
const UsuarioModel = {
  async listarTodos() {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows[0];
  },

  async criar(nome, email) {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
      [nome, email]
    );
    return result.insertId;
  },

  async atualizar(id, nome, email) {
    const [result] = await pool.query(
      "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
      [nome, email, id]
    );
    return result.affectedRows;
  },

  async remover(id) {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = UsuarioModel;
