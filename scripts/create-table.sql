-- Criar tabela para armazenar as submissões do formulário de demonstração
CREATE TABLE IF NOT EXISTS demo_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'revoked')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para busca por email
CREATE INDEX IF NOT EXISTS idx_demo_submissions_email ON demo_submissions(email);

-- Criar índice para busca por status
CREATE INDEX IF NOT EXISTS idx_demo_submissions_status ON demo_submissions(status);

-- Criar índice para busca por data de submissão
CREATE INDEX IF NOT EXISTS idx_demo_submissions_submitted_at ON demo_submissions(submitted_at DESC);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_demo_submissions_updated_at ON demo_submissions;
CREATE TRIGGER update_demo_submissions_updated_at
  BEFORE UPDATE ON demo_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
