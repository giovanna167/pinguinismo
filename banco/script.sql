-- 1. Criação e seleção do banco de dados oficial do Pinguinismo
CREATE DATABASE IF NOT EXISTS db_pinguinismo;
USE db_pinguinismo;

-- 2. Tabela de Cadastro para Usuários (Autistas / Familiares) - Baseada na sua foto
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(100) NOT NULL,
    nickname VARCHAR(50) UNIQUE NOT NULL, -- Nome de usuário que começará com usua_
    numero_ciptea VARCHAR(20) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    senha_acesso VARCHAR(255) NOT NULL, -- Essencial para o login da sua colega funcionar depois
    cor_tema_preferida VARCHAR(20) DEFAULT '#E3F2FD',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Cadastro para Especialistas de Saúde - Baseada na sua foto
CREATE TABLE IF NOT EXISTS Especialistas (
    id_especialista INT PRIMARY KEY AUTO_INCREMENT,
    nome_social VARCHAR(100) NOT NULL,
    registro_profissional VARCHAR(30) UNIQUE NOT NULL, -- CRM ou CRP
    especialidade VARCHAR(50) NOT NULL,
    senha_acesso VARCHAR(255) NOT NULL, -- Essencial para o login da sua colega
    bio TEXT,
    status_verificado TINYINT(1) DEFAULT 0
);

-- 4. Tabela de Postagens (Para o fórum de vocês)
CREATE TABLE IF NOT EXISTS Postagens (
    id_post INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    titulo_post VARCHAR(100) NOT NULL,
    conteudo_post TEXT NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    data_postagem DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);