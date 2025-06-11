CREATE TYPE sexo_enum AS ENUM ('M', 'F', 'O');
CREATE TYPE nivel_problema_enum AS ENUM ('N1', 'N2', 'N3');

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    email TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    sexo sexo_enum,
    -- 0 para estagiário e 1 ate 3 para nivel do tecnico
    nivel_tecnico INTEGER CHECK (nivel_tecnico BETWEEN 0 AND 3)
);

CREATE TABLE tipo_status (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE tipo_suporte (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE chamado (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    data_hora_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_hora_fechamento TIMESTAMP,
    data_hora_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    nivel_problema nivel_problema_enum DEFAULT 'N1',
    criado_por_id INTEGER REFERENCES usuario(id),
    tecnico_atual_id INTEGER REFERENCES usuario(id),
    id_status INTEGER REFERENCES tipo_status(id),
    id_suporte INTEGER REFERENCES tipo_suporte(id)
);

CREATE TABLE interacao (
    id SERIAL PRIMARY KEY,
    id_chamado INTEGER REFERENCES chamado(id) ON DELETE CASCADE,
    id_tecnico INTEGER REFERENCES usuario(id),
    id_novo_tecnico INTEGER REFERENCES usuario(id),
    mensagem TEXT,
    data_hora_mudanca TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_interacao TEXT CHECK (
        tipo_interacao IN ('resposta_tecnico', 'encaminhamento', 'resposta_cliente', 'fechamento')
    )
);
