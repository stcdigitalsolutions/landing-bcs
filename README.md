# Landing BCS Consultoria

Projeto Next.js com TypeScript e Tailwind CSS para a landing page da BCS Consultoria Tecnológica.

## Tecnologias

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- PostgreSQL (Neon Serverless)
- @neondatabase/serverless

## Como executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## 🚀 Deploy na Vercel

Para fazer deploy na Vercel com todas as configurações necessárias:

**📖 Tutorial Completo**: [`TUTORIAL_DEPLOY_VERCEL.md`](./TUTORIAL_DEPLOY_VERCEL.md)

**📋 Referência Rápida de Variáveis**: [`VERCEL_ENV_VARS.md`](./VERCEL_ENV_VARS.md)

### O que está incluído:

- ✅ Preparação do projeto
- ✅ Configuração de variáveis de ambiente (6 variáveis necessárias)
- ✅ Configuração do Google OAuth para produção
- ✅ Configuração do banco de dados Neon
- ✅ Deploy passo a passo
- ✅ Configuração de domínio customizado
- ✅ Solução de problemas comuns

## Estrutura do projeto

- `/app` - Páginas e layouts do Next.js
  - `/api` - API Routes (backend)
- `/components` - Componentes reutilizáveis
- `/lib` - Utilitários e configurações
- `/data` - Dados salvos (criado automaticamente)
- `/app/globals.css` - Estilos globais com Tailwind CSS

## Páginas

- `/` - Página principal (home)
- `/demo` - Página de formulário para agendar demonstração
- `/admin` - Painel administrativo para visualizar e gerenciar leads (requer autenticação)
- `/login` - Página de login com Google SSO

## Backend

O projeto inclui um backend completo com PostgreSQL (Neon Serverless) para armazenar os dados do formulário de demonstração.

### Configuração do Banco de Dados

1. **Criar conta no Neon**:
   - Acesse [https://neon.tech](https://neon.tech)
   - Crie uma conta gratuita
   - Crie um novo projeto PostgreSQL

2. **Obter Connection String**:
   - No dashboard do Neon, vá em "Connection Details"
   - Copie a connection string (formato: `postgresql://user:password@host/database?sslmode=require`)

3. **Configurar variável de ambiente**:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione: `DATABASE_URL=sua_connection_string_aqui`

4. **Inicializar o banco de dados**:
   ```bash
   npm install
   npm run db:init
   ```

### API Endpoints

#### Formulário
- `POST /api/submit-demo` - Recebe e armazena os dados do formulário

#### Leads (para visualização/gestão)
- `GET /api/leads` - Lista todos os leads
  - Query params: `?status=pending&limit=50&offset=0`
- `GET /api/leads/[id]` - Busca um lead específico
- `PATCH /api/leads/[id]` - Atualiza o status de um lead
  - Body: `{ "status": "contacted" }` (pending, contacted, converted)

### Estrutura da Tabela

```sql
demo_submissions
├── id (SERIAL PRIMARY KEY)
├── name (VARCHAR)
├── email (VARCHAR)
├── phone (VARCHAR)
├── company (VARCHAR)
├── status (VARCHAR) -- pending, contacted, converted
├── submitted_at (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Estrutura dos dados

```json
{
  "id": 1,
  "name": "Nome do cliente",
  "email": "email@cliente.com",
  "phone": "+55 11 99999-9999",
  "company": "Tipo de empresa",
  "status": "pending",
  "submitted_at": "2024-01-01T00:00:00.000Z",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## Configuração do WhatsApp

Para configurar o número do WhatsApp, você pode:

1. **Usar variável de ambiente** (recomendado):
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione: `NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999`
   - Formato: código do país + DDD + número (sem espaços ou caracteres especiais)

2. **Editar diretamente** o arquivo `lib/config.ts`

### Formato do número

- Brasil: `5511999999999` (55 = código do país, 11 = DDD, 999999999 = número)
- EUA: `11234567890` (1 = código do país, 1234567890 = número)
- Portugal: `351912345678` (351 = código do país, 912345678 = número)

## Visualizar leads salvos

Os dados dos formulários são salvos no PostgreSQL. Você pode:

1. **Usar a API REST**:
   ```bash
   # Listar todos os leads
   curl http://localhost:3000/api/leads
   
   # Filtrar por status
   curl http://localhost:3000/api/leads?status=pending
   
   # Buscar lead específico
   curl http://localhost:3000/api/leads/1
   ```

2. **Acessar diretamente no Neon**:
   - Use o SQL Editor no dashboard do Neon
   - Execute: `SELECT * FROM demo_submissions ORDER BY submitted_at DESC;`

3. **Criar página de admin** (futuro):
   - Usar os endpoints `/api/leads` para criar uma interface de gestão

## Scripts disponíveis

```bash
# Inicializar banco de dados (criar tabelas)
npm run db:init

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## Autenticação

O projeto usa NextAuth.js com Google OAuth para autenticação SSO.

### 📖 Tutorial Completo

**Veja o tutorial passo a passo detalhado em: [`TUTORIAL_GOOGLE_OAUTH.md`](./TUTORIAL_GOOGLE_OAUTH.md)**

O tutorial inclui:
- ✅ Passo a passo com screenshots descritivos
- ✅ Como criar projeto no Google Cloud Console
- ✅ Como configurar OAuth 2.0
- ✅ Como gerar AUTH_SECRET
- ✅ Solução de problemas comuns
- ✅ Configuração para produção

### Configuração Rápida

1. Siga o tutorial completo em `TUTORIAL_GOOGLE_OAUTH.md`
2. Configure as variáveis de ambiente no `.env.local`:
   ```env
   AUTH_SECRET=seu_secret_aqui
   GOOGLE_CLIENT_ID=seu_client_id
   GOOGLE_CLIENT_SECRET=seu_client_secret
   ALLOWED_EMAILS=seu_email@gmail.com
   ```

### Rotas Protegidas

- `/admin` - Requer autenticação (redireciona para `/login` se não autenticado)

## Próximos passos sugeridos

- [x] Integrar com banco de dados PostgreSQL (Neon Serverless)
- [x] Criar página de admin para visualizar e gerenciar leads
- [x] Adicionar autenticação Google SSO para a área de admin
- [ ] Adicionar notificações por email quando um lead é cadastrado
- [ ] Integrar com CRM (HubSpot, Salesforce, etc.)
- [ ] Adicionar dashboard com estatísticas de conversão
- [ ] Restringir acesso por email específico
