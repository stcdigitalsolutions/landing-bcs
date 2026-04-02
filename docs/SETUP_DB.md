# Guia de Configuração do Banco de Dados

## Passo a Passo

### 1. Criar conta no Neon (se ainda não tiver)

1. Acesse [https://neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto PostgreSQL

### 2. Obter a Connection String

1. No dashboard do Neon, vá em **"Connection Details"** ou **"Connection String"**
2. Copie a connection string completa
   - Formato: `postgresql://user:password@host.neon.tech/database?sslmode=require`

### 3. Configurar no Projeto

1. Crie um arquivo `.env.local` na raiz do projeto (mesmo nível do `package.json`)
2. Adicione a connection string:

```env
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

**⚠️ IMPORTANTE:** 
- Não commite o arquivo `.env.local` no Git (já está no .gitignore)
- Mantenha sua connection string segura

### 4. Inicializar o Banco de Dados

Execute o comando:

```bash
npm run db:init
```

Este comando irá:
- ✅ Testar a conexão com o banco
- ✅ Criar a tabela `demo_submissions`
- ✅ Criar índices para performance
- ✅ Criar trigger para atualizar timestamps

### 5. Verificar se funcionou

Após executar `npm run db:init`, você deve ver:

```
🚀 Inicializando banco de dados...
🔌 Testando conexão com o banco de dados...
✅ Conexão estabelecida com sucesso!
🔄 Tentando criar tabela...
✅ Tabela demo_submissions criada!
✅ Índices criados!
✅ Trigger criado!

✅ Banco de dados inicializado com sucesso!
📊 Tabela demo_submissions criada e pronta para uso.
```

## Alternativa: Executar SQL Manualmente

Se preferir, você pode executar o SQL manualmente:

1. Acesse o **SQL Editor** no dashboard do Neon
2. Abra o arquivo `scripts/create-table.sql`
3. Cole o conteúdo no SQL Editor
4. Execute

## Testar a Integração

Após configurar, teste o formulário:

1. Execute `npm run dev`
2. Acesse `http://localhost:3000/demo`
3. Preencha e envie o formulário
4. Verifique no Neon se os dados foram salvos:
   ```sql
   SELECT * FROM demo_submissions ORDER BY submitted_at DESC;
   ```

## Solução de Problemas

### Erro: "DATABASE_URL não está definida"

- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Verifique se a variável `DATABASE_URL` está escrita corretamente
- Certifique-se de que não há espaços antes ou depois do `=`

### Erro de conexão

- Verifique se a connection string está correta
- Verifique se o projeto Neon está ativo
- Tente copiar a connection string novamente do dashboard

### Erro ao criar tabela

- A tabela pode já existir (isso é normal)
- Execute `DROP TABLE demo_submissions CASCADE;` no SQL Editor se quiser recriar
- Ou ignore o erro e continue
