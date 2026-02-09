/**
 * Script para inicializar o banco de dados
 * Execute com: npm run db:init
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Carregar variáveis de ambiente do .env.local
const envPath = join(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  config({ path: envPath });
} else {
  // Tentar carregar do .env também
  config();
}

async function initDatabase() {
  try {
    console.log('🚀 Inicializando banco de dados...');

    // Verificar se DATABASE_URL está configurada
    if (!process.env.DATABASE_URL) {
      console.error('❌ Erro: DATABASE_URL não está definida nas variáveis de ambiente');
      console.log('\n💡 Soluções:');
      console.log('   1. Crie um arquivo .env.local na raiz do projeto');
      console.log('   2. Adicione: DATABASE_URL=sua_connection_string_do_neon');
      console.log('   3. Ou exporte a variável: export DATABASE_URL="sua_connection_string"');
      console.log('\n📖 Obtenha a connection string em: https://console.neon.tech');
      process.exit(1);
    }

    const sql = neon(process.env.DATABASE_URL);

    // Testar conexão
    console.log('🔌 Testando conexão com o banco de dados...');
    await sql`SELECT NOW()`;
    console.log('✅ Conexão estabelecida com sucesso!');

    // Ler o arquivo SQL
    const sqlFile = readFileSync(
      join(process.cwd(), 'scripts', 'create-table.sql'),
      'utf-8'
    );

    console.log('\n📝 IMPORTANTE:');
    console.log('O Neon Serverless requer que comandos DDL sejam executados de forma específica.');
    console.log('Recomendamos executar o arquivo create-table.sql diretamente no SQL Editor do Neon.');
    console.log('\n📋 Alternativamente, você pode executar manualmente cada comando:');
    console.log('\n' + sqlFile);
    console.log('\n💡 Acesse: https://console.neon.tech -> Seu Projeto -> SQL Editor');
    console.log('   Cole o conteúdo do arquivo scripts/create-table.sql e execute.\n');

    // Tentar executar comandos básicos que funcionam com template literals
    console.log('🔄 Tentando criar tabela...');
    
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS demo_submissions (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          company VARCHAR(100),
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted')),
          submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('✅ Tabela demo_submissions criada!');

      // Criar índices
      await sql`CREATE INDEX IF NOT EXISTS idx_demo_submissions_email ON demo_submissions(email)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_demo_submissions_status ON demo_submissions(status)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_demo_submissions_submitted_at ON demo_submissions(submitted_at DESC)`;
      console.log('✅ Índices criados!');

      // Criar função e trigger
      await sql`
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql
      `;

      await sql`
        DROP TRIGGER IF EXISTS update_demo_submissions_updated_at ON demo_submissions
      `;

      await sql`
        CREATE TRIGGER update_demo_submissions_updated_at
        BEFORE UPDATE ON demo_submissions
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column()
      `;
      console.log('✅ Trigger criado!');

      console.log('\n✅ Banco de dados inicializado com sucesso!');
      console.log('📊 Tabela demo_submissions criada e pronta para uso.');
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.code === '42P07') {
        console.log('⚠️  Tabela já existe. Pulando criação...');
      } else {
        throw error;
      }
    }

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Erro ao inicializar banco de dados:', error.message);
    if (error.message?.includes('DATABASE_URL')) {
      console.log('💡 Verifique se a variável DATABASE_URL está configurada corretamente');
    }
    console.log('\n💡 Alternativa: Execute o arquivo create-table.sql no SQL Editor do Neon');
    process.exit(1);
  }
}

initDatabase();
