CREATE DATABASE IF NOT EXISTS api_usuarios;
USE api_usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email) VALUES
  ('Maria Souza', 'maria@email.com'),
  ('João Pereira', 'joao@email.com'),
  ('Ana Lima', 'ana@email.com');
