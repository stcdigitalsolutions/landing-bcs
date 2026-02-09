# Tutorial Completo: Configuração Google OAuth para NextAuth.js

Este tutorial vai te guiar passo a passo para configurar a autenticação Google SSO no seu projeto.

## 📋 Pré-requisitos

- Conta Google (Gmail)
- Acesso ao Google Cloud Console
- Projeto Next.js rodando localmente

---

## 🚀 Passo 1: Acessar o Google Cloud Console

1. Abra seu navegador e acesse: **https://console.cloud.google.com/**
2. Faça login com sua conta Google
3. Se for a primeira vez, aceite os termos de serviço

---

## 🆕 Passo 2: Criar um Novo Projeto

1. No topo da página, ao lado do logo do Google Cloud, clique no **seletor de projetos** (mostra o nome do projeto atual ou "Selecionar projeto")
2. Clique em **"Novo Projeto"** (ou "New Project")
3. Preencha:
   - **Nome do projeto**: `BCS Landing Admin` (ou qualquer nome que preferir)
   - **Organização**: Deixe como está (ou selecione se tiver)
4. Clique em **"Criar"** (ou "Create")
5. Aguarde alguns segundos até o projeto ser criado
6. Selecione o projeto recém-criado no seletor de projetos

---

## ⚙️ Passo 3: Configurar a Tela de Consentimento OAuth

1. No menu lateral esquerdo, vá em **"APIs e serviços"** > **"Tela de consentimento OAuth"** (ou "APIs & Services" > "OAuth consent screen")
2. Selecione **"Externo"** (External) e clique em **"Criar"** (Create)
   - ⚠️ **Nota**: Para produção, você pode solicitar verificação, mas para desenvolvimento "Externo" é suficiente

3. **Preencha o formulário:**

   **Informações do aplicativo:**
   - **Nome do aplicativo**: `BCS Landing Admin`
   - **Email de suporte do usuário**: Seu email (ex: seu@email.com)
   - **Logo do aplicativo**: (Opcional - pode pular)

   **Domínios autorizados:**
   - Deixe em branco por enquanto

   **Informações de contato do desenvolvedor:**
   - **Email de contato**: Seu email

4. Clique em **"Salvar e continuar"** (Save and Continue)

5. **Escopos** (Scopes):
   - Clique em **"Salvar e continuar"** (pode deixar os escopos padrão)

6. **Usuários de teste** (Test users):
   - Clique em **"+ ADICIONAR USUÁRIOS"** (+ ADD USERS)
   - Adicione seu email (o mesmo que você vai usar para fazer login)
   - Clique em **"Adicionar"**
   - Clique em **"Salvar e continuar"**

7. **Resumo**:
   - Revise as informações
   - Clique em **"Voltar ao painel"** (Back to Dashboard)

---

## 🔑 Passo 4: Criar Credenciais OAuth 2.0

1. No menu lateral, vá em **"APIs e serviços"** > **"Credenciais"** (ou "APIs & Services" > "Credentials")

2. No topo da página, clique em **"+ CRIAR CREDENCIAIS"** (+ CREATE CREDENTIALS)

3. Selecione **"ID do cliente OAuth"** (OAuth client ID)

4. Se aparecer um aviso sobre a tela de consentimento, clique em **"Configurar tela de consentimento"** e complete o Passo 3 primeiro

5. **Configurar a tela de consentimento OAuth:**
   - Se já configurou, selecione **"Externo"** e clique em **"Criar"**

6. **Criar ID do cliente OAuth:**
   - **Tipo de aplicativo**: Selecione **"Aplicativo da Web"** (Web application)
   - **Nome**: `BCS Landing Admin - Web Client` (ou qualquer nome)

7. **Origens JavaScript autorizadas:**
   - Clique em **"+ ADICIONAR URI"** (+ ADD URI)
   - Adicione: `http://localhost:3000`
   - ⚠️ **Importante**: Use `http://` (não `https://`) para desenvolvimento local

8. **URIs de redirecionamento autorizados:**
   - Clique em **"+ ADICIONAR URI"** (+ ADD URI)
   - Adicione: `http://localhost:3000/api/auth/callback/google`
   - ⚠️ **Importante**: 
     - Use `http://` (não `https://`)
     - O caminho deve ser exatamente: `/api/auth/callback/google`
     - Não adicione barra no final

9. Clique em **"Criar"** (Create)

10. **Uma janela popup aparecerá com suas credenciais:**
    - **ID do cliente** (Client ID): Copie este valor (algo como: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
    - **Segredo do cliente** (Client Secret): Copie este valor (algo como: `GOCSPX-abcdefghijklmnopqrstuvwxyz`)
    - ⚠️ **IMPORTANTE**: Copie ambos agora! Você não poderá ver o Secret novamente depois de fechar esta janela

11. Clique em **"OK"**

---

## 🔐 Passo 5: Gerar AUTH_SECRET

O `AUTH_SECRET` é uma chave secreta usada para criptografar as sessões. Você precisa gerar uma chave aleatória.

### Opção 1: Usando OpenSSL (Recomendado)

1. Abra o **Terminal** (Mac/Linux) ou **PowerShell** (Windows)
2. Execute o comando:
   ```bash
   openssl rand -base64 32
   ```
3. Copie a string gerada (algo como: `XyZ123AbC456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890=`)
4. ⚠️ **IMPORTANTE**: Guarde esta chave em local seguro

### Opção 2: Usando Gerador Online

1. Acesse: **https://generate-secret.vercel.app/32**
2. Clique em **"Generate"**
3. Copie a chave gerada

### Opção 3: Usando Node.js

1. Abra o Terminal/PowerShell
2. Execute:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
3. Copie a chave gerada

---

## 📝 Passo 6: Configurar o arquivo .env.local

1. No seu projeto, abra o arquivo **`.env.local`** na raiz do projeto
   - ⚠️ Se não existir, crie um novo arquivo chamado `.env.local`

2. Adicione ou atualize as seguintes linhas:

```env
# Configuração do NextAuth
AUTH_SECRET=cole_aqui_o_auth_secret_gerado_no_passo_5
GOOGLE_CLIENT_ID=cole_aqui_o_client_id_copiado_no_passo_4
GOOGLE_CLIENT_SECRET=cole_aqui_o_client_secret_copiado_no_passo_4

# Emails permitidos para acesso ao admin (separados por vírgula)
ALLOWED_EMAILS=seu_email@gmail.com,outro_email@email.com
```

### Exemplo Real:

```env
# Configuração do NextAuth
AUTH_SECRET=XyZ123AbC456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890=
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz

# Emails permitidos para acesso ao admin
ALLOWED_EMAILS=ramonpaulo94@gmail.com,admin@bcs.com
```

### ⚠️ Regras Importantes:

- **NÃO** adicione espaços antes ou depois do `=`
- **NÃO** use aspas ao redor dos valores
- **NÃO** adicione vírgulas extras nos emails
- Cada email deve estar separado por vírgula simples
- Salve o arquivo após editar

---

## ✅ Passo 7: Verificar a Configuração

1. Certifique-se de que todas as variáveis estão preenchidas:
   - ✅ `AUTH_SECRET` - chave gerada no Passo 5
   - ✅ `GOOGLE_CLIENT_ID` - ID copiado no Passo 4
   - ✅ `GOOGLE_CLIENT_SECRET` - Secret copiado no Passo 4
   - ✅ `ALLOWED_EMAILS` - seu email (o mesmo que você adicionou como usuário de teste)

2. Verifique se não há espaços extras ou caracteres inválidos

---

## 🧪 Passo 8: Testar a Configuração

1. **Instale as dependências** (se ainda não fez):
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Acesse a página de admin**:
   - Abra o navegador em: `http://localhost:3000/admin`
   - Você deve ser redirecionado para `/login`

4. **Faça login**:
   - Clique em **"Continuar com Google"**
   - Selecione a conta Google que você adicionou como usuário de teste
   - Autorize o acesso
   - Você deve ser redirecionado de volta para `/admin`

5. **Verifique**:
   - ✅ Você consegue ver o painel de leads?
   - ✅ Seu nome e email aparecem no topo?
   - ✅ O botão de logout funciona?

---

## 🚨 Solução de Problemas

### Erro: "Invalid credentials"

**Causa**: Credenciais incorretas no `.env.local`

**Solução**:
1. Verifique se copiou corretamente o Client ID e Client Secret
2. Certifique-se de que não há espaços extras
3. Verifique se não há aspas ao redor dos valores
4. Reinicie o servidor (`Ctrl+C` e depois `npm run dev` novamente)

### Erro: "Redirect URI mismatch"

**Causa**: URI de redirecionamento não corresponde ao configurado no Google

**Solução**:
1. No Google Cloud Console, vá em **Credenciais**
2. Clique no seu OAuth Client ID
3. Verifique se a URI está exatamente: `http://localhost:3000/api/auth/callback/google`
4. Certifique-se de que está usando `http://` (não `https://`)
5. Certifique-se de que não há barra no final (`/api/auth/callback/google` e não `/api/auth/callback/google/`)

### Erro: "Access blocked: This app's request is invalid"

**Causa**: Email não está na lista de usuários de teste

**Solução**:
1. No Google Cloud Console, vá em **Tela de consentimento OAuth**
2. Vá na aba **"Usuários de teste"** (Test users)
3. Adicione seu email
4. Aguarde alguns minutos e tente novamente

### Erro: "AUTH_SECRET is missing"

**Causa**: Variável AUTH_SECRET não está configurada

**Solução**:
1. Verifique se o arquivo `.env.local` existe na raiz do projeto
2. Verifique se `AUTH_SECRET` está escrito corretamente
3. Gere uma nova chave usando um dos métodos do Passo 5
4. Reinicie o servidor

### Erro: "Email não autorizado"

**Causa**: Seu email não está na lista `ALLOWED_EMAILS`

**Solução**:
1. Abra o arquivo `.env.local`
2. Adicione seu email na variável `ALLOWED_EMAILS`
3. Exemplo: `ALLOWED_EMAILS=seu_email@gmail.com`
4. Reinicie o servidor

---

## 🌐 Configuração para Produção

Quando for fazer deploy (Vercel, Netlify, etc.):

1. **Adicione as URIs de produção no Google Cloud Console:**
   - Vá em **Credenciais** > Seu OAuth Client ID
   - Em **Origens JavaScript autorizadas**, adicione: `https://seudominio.com`
   - Em **URIs de redirecionamento**, adicione: `https://seudominio.com/api/auth/callback/google`

2. **Configure as variáveis de ambiente na plataforma:**
   - Vercel: Settings > Environment Variables
   - Netlify: Site settings > Environment variables
   - Adicione: `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ALLOWED_EMAILS`

3. **Atualize a tela de consentimento:**
   - No Google Cloud Console, solicite verificação do app
   - Adicione domínios autorizados

---

## 📚 Recursos Adicionais

- [Documentação NextAuth.js](https://next-auth.js.org/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Guia OAuth 2.0 do Google](https://developers.google.com/identity/protocols/oauth2)

---

## ✅ Checklist Final

Antes de considerar tudo configurado, verifique:

- [ ] Projeto criado no Google Cloud Console
- [ ] Tela de consentimento OAuth configurada
- [ ] Credenciais OAuth 2.0 criadas
- [ ] Client ID copiado
- [ ] Client Secret copiado
- [ ] AUTH_SECRET gerado
- [ ] `.env.local` configurado com todas as variáveis
- [ ] Email adicionado como usuário de teste
- [ ] Email adicionado em `ALLOWED_EMAILS`
- [ ] Servidor reiniciado após configurar `.env.local`
- [ ] Login funcionando corretamente

---

**Pronto!** 🎉 Sua autenticação Google SSO está configurada e funcionando!
