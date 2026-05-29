// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o seu banco de dados do MySQL Workbench
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Usuário padrão do seu MySQL
  password: '', //  COLOQUE A SENHA DO SEU MYSQL AQUI (A CHAVE DO SEU COFRE)
  database: 'db_pinguinismo'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('✅ Conectado com sucesso ao banco db_pinguinismo!');
});

// ROTA DE CADASTRO DE AUTISTA (Recebe a senha que o usuário escolheu)
app.post('/api/cadastro/autista', (req, res) => {
  const { nome, cpf, ciptea, idade, username, senha } = req.body;
  
  // Envia para a tabela usuarios exatamente como está no seu script.sql
  const sql = `INSERT INTO usuarios (nome_completo, nickname, numero_ciptea, data_nascimento, senha_acesso) VALUES (?, ?, ?, ?, ?)`;
  
  // Gera uma data baseada na idade que a pessoa digitou
  const anoNascimento = 2026 - parseInt(idade);
  const dataFake = `${anoNascimento}-01-01`;

  db.query(sql, [nome, username, ciptea, dataFake, senha], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao salvar no banco.' });
    }
    res.json({ sucesso: true, usuario: username });
  });
});

// ROTA DE CADASTRO DE ESPECIALISTA (Recebe a senha que o especialista escolheu)
app.post('/api/cadastro/especialista', (req, res) => {
  const { nome, cpf, registro, username, senha } = req.body;
  
  // Envia para a tabela especialistas
  const sql = `INSERT INTO especialistas (nome_completo, cpf, registro_profissional, nickname, senha_acesso) VALUES (?, ?, ?, ?, ?)`;
  
  db.query(sql, [nome, cpf, registro, username, senha], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao salvar especialista.' });
    }
    res.json({ sucesso: true, usuario: username });
  });
});

// ROTA DE LOGIN (Valida se o usuário e a senha batem com o banco)
app.post('/api/login', (req, res) => {
  const { username, senha } = req.body;

  // 1. Procura primeiro na tabela de usuarios
  db.query('SELECT * FROM usuarios WHERE nickname = ? AND senha_acesso = ?', [username, senha], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro no servidor.' });
    
    if (results.length > 0) {
      return res.json({ sucesso: true, tipo: 'autista' });
    }

    // 2. Se não achou em usuarios, procura na tabela de especialistas
    db.query('SELECT * FROM especialistas WHERE nickname = ? AND senha_acesso = ?', [username, senha], (err, espResults) => {
      if (err) return res.status(500).json({ erro: 'Erro no servidor.' });

      if (espResults.length > 0) {
        return res.json({ sucesso: true, tipo: 'especialista' });
      }

      // 3. Se não achou em nenhum dos dois, retorna erro de dados incorretos
      res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
    });
  });
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000 (http://localhost:3000)');
});