# Guia de Configuração da Autenticação Google

## Passo a Passo

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google+ API** (ou **Google Identity API**)

### 2. Criar Credenciais OAuth 2.0

1. No menu lateral, vá em **APIs & Services** > **Credentials**
2. Clique em **Create Credentials** > **OAuth client ID**
3. Se for a primeira vez, configure o **OAuth consent screen**:
   - Escolha **External** (para desenvolvimento)
   - Preencha as informações básicas
   - Adicione seu email como test user (se necessário)

4. Configure o OAuth Client:
   - **Application type**: Web application
   - **Name**: BCS Landing Admin (ou o nome que preferir)
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (desenvolvimento)
     - `https://seudominio.com` (produção)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (desenvolvimento)
     - `https://seudominio.com/api/auth/callback/google` (produção)

5. Clique em **Create**
6. Copie o **Client ID** e **Client Secret**

### 3. Gerar AUTH_SECRET

Execute o comando no terminal:

```bash
openssl rand -base64 32
```

Ou use um gerador online: https://generate-secret.vercel.app/32

### 4. Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` e adicione:

```env
# NextAuth
AUTH_SECRET=seu_secret_gerado_aqui
GOOGLE_CLIENT_ID=seu_client_id_do_google
GOOGLE_CLIENT_SECRET=seu_client_secret_do_google

# Emails permitidos para acesso ao admin (separados por vírgula)
# Se não configurado, permite acesso a todos os emails (apenas para desenvolvimento)
ALLOWED_EMAILS=admin@bcs.com,outro@email.com
```

### 5. Instalar Dependências

```bash
npm install
```

### 6. Testar

1. Execute o projeto:
   ```bash
   npm run dev
   ```

2. Acesse `http://localhost:3000/admin`
3. Você será redirecionado para `/login`
4. Clique em "Continuar com Google"
5. Faça login com sua conta Google
6. Você será redirecionado de volta para `/admin`

## Estrutura de Arquivos

- `auth.ts` - Configuração do NextAuth
- `middleware.ts` - Proteção de rotas
- `app/api/auth/[...nextauth]/route.ts` - Rotas de autenticação
- `app/login/page.tsx` - Página de login
- `app/admin/page.tsx` - Página protegida (requer autenticação)

## Segurança

- ✅ Rotas `/admin` são protegidas automaticamente
- ✅ Usuários não autenticados são redirecionados para `/login`
- ✅ Sessão é gerenciada pelo NextAuth
- ✅ Tokens são armazenados de forma segura

## Personalização

### Restringir Acesso por Email

O sistema já está configurado para restringir acesso por email através da variável de ambiente `ALLOWED_EMAILS`.

**Configuração no `.env.local`:**

```env
# Lista de emails permitidos separados por vírgula
ALLOWED_EMAILS=admin@bcs.com,outro@email.com,terceiro@email.com
```

**Comportamento:**
- Se `ALLOWED_EMAILS` estiver configurado: apenas os emails listados podem fazer login
- Se `ALLOWED_EMAILS` não estiver configurado: todos os emails podem fazer login (útil para desenvolvimento)

**Exemplo:**
```env
# Permitir apenas 2 emails
ALLOWED_EMAILS=admin@bcs.com,ramonpaulo94@gmail.com

# Permitir múltiplos emails
ALLOWED_EMAILS=admin@bcs.com,gerente@bcs.com,vendas@bcs.com
```

### Adicionar Mais Providers

Para adicionar GitHub, Microsoft, etc., instale o provider e adicione em `auth.ts`:

```typescript
import GitHub from "next-auth/providers/github";

providers: [
  Google({ ... }),
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
],
```

## Troubleshooting

### Erro: "Invalid credentials"

- Verifique se as credenciais estão corretas no `.env.local`
- Certifique-se de que as URIs de redirecionamento estão corretas no Google Console

### Erro: "Redirect URI mismatch"

- Verifique se adicionou exatamente as URIs corretas no Google Console
- Certifique-se de que está usando `http://localhost:3000` (não `https`)

### Erro: "AUTH_SECRET is missing"

- Certifique-se de que `AUTH_SECRET` está definido no `.env.local`
- Reinicie o servidor após adicionar a variável
