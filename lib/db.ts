import { neon } from '@neondatabase/serverless';

// Obter a string de conexão do ambiente
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não está definida nas variáveis de ambiente');
}

// Criar instância do cliente Neon
export const sql = neon(connectionString);

// Função auxiliar para testar a conexão
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    return { success: false, error };
  }
}
