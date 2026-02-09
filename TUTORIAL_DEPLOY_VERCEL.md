# Tutorial Completo: Deploy na Vercel

Este tutorial vai te guiar passo a passo para fazer deploy do projeto na Vercel com todas as configurações necessárias.

## 📋 Pré-requisitos

- ✅ Projeto funcionando localmente
- ✅ Conta GitHub (recomendado) ou GitLab/Bitbucket
- ✅ Conta Vercel (gratuita)
- ✅ Google OAuth configurado (veja `TUTORIAL_GOOGLE_OAUTH.md`)
- ✅ Banco de dados Neon configurado (veja `SETUP_DB.md`)

---

## 🚀 Passo 1: Preparar o Projeto para Deploy

### 1.1 Verificar arquivos importantes

Certifique-se de que estes arquivos existem e estão corretos:

- ✅ `package.json` - com todos os scripts necessários
- ✅ `next.config.ts` - configuração do Next.js
- ✅ `.gitignore` - incluindo `.env.local`
- ✅ `vercel.json` (opcional) - configurações específicas da Vercel

### 1.2 Criar arquivo vercel.json (Opcional)

Crie um arquivo `vercel.json` na raiz do projeto para configurações específicas:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### 1.3 Verificar build local

Antes de fazer deploy, teste se o build funciona localmente:

```bash
npm run build
```

Se houver erros, corrija antes de continuar.

---

## 📦 Passo 2: Preparar Repositório Git

### 2.1 Inicializar Git (se ainda não fez)

```bash
git init
git add .
git commit -m "Initial commit - Landing BCS"
```

### 2.2 Criar repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em **"New repository"**
3. Preencha:
   - **Repository name**: `landing-bcs` (ou o nome que preferir)
   - **Description**: Landing page BCS Consultoria
   - **Visibility**: Escolha Public ou Private
   - ⚠️ **NÃO** marque "Initialize with README" (se já tem código)
4. Clique em **"Create repository"**

### 2.3 Conectar repositório local ao GitHub

```bash
git remote add origin https://github.com/SEU_USUARIO/landing-bcs.git
git branch -M main
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu username do GitHub.

---

## 🔵 Passo 3: Criar Conta e Projeto na Vercel

### 3.1 Criar conta na Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"** (recomendado) ou outra opção
4. Autorize a Vercel a acessar seu GitHub
5. Complete o cadastro

### 3.2 Importar Projeto

1. No dashboard da Vercel, clique em **"Add New..."** > **"Project"**
2. Se conectou com GitHub, você verá seus repositórios
3. Encontre `landing-bcs` (ou o nome do seu repositório)
4. Clique em **"Import"**

### 3.3 Configurar Projeto

Na tela de configuração:

**Framework Preset:**
- ✅ Deve detectar automaticamente: **Next.js**

**Root Directory:**
- Deixe como está (geralmente `./`)

**Build and Output Settings:**
- **Build Command**: `npm run build` (já deve estar preenchido)
- **Output Directory**: `.next` (já deve estar preenchido)
- **Install Command**: `npm install` (já deve estar preenchido)

**⚠️ NÃO clique em "Deploy" ainda!** Primeiro precisamos configurar as variáveis de ambiente.

---

## 🔐 Passo 4: Configurar Variáveis de Ambiente

### 4.1 Acessar Configurações de Environment Variables

Na tela de configuração do projeto, role para baixo até a seção **"Environment Variables"**.

### 4.2 Adicionar Variáveis

Adicione cada variável uma por uma. Para cada uma:

1. Clique em **"Add"** ou **"Add Another"**
2. Preencha o **Name** (nome da variável)
3. Preencha o **Value** (valor da variável)
4. Selecione os **Environments** onde a variável será usada:
   - ✅ **Production** (obrigatório)
   - ✅ **Preview** (recomendado - para testar antes de produção)
   - ✅ **Development** (opcional - se usar Vercel CLI)

### 4.3 Lista Completa de Variáveis

Adicione todas estas variáveis:

#### 1. DATABASE_URL
```
Name: DATABASE_URL
Value: sua_connection_string_do_neon
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Onde encontrar**: Dashboard do Neon > Connection Details > Connection String

#### 2. AUTH_SECRET
```
Name: AUTH_SECRET
Value: o_mesmo_secret_que_usa_no_local
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Nota**: Use o mesmo `AUTH_SECRET` que você gerou para desenvolvimento local.

#### 3. GOOGLE_CLIENT_ID
```
Name: GOOGLE_CLIENT_ID
Value: seu_google_client_id
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Onde encontrar**: Google Cloud Console > Credenciais > Seu OAuth Client ID

#### 4. GOOGLE_CLIENT_SECRET
```
Name: GOOGLE_CLIENT_SECRET
Value: seu_google_client_secret
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Onde encontrar**: Google Cloud Console > Credenciais > Seu OAuth Client ID

#### 5. NEXT_PUBLIC_WHATSAPP_NUMBER
```
Name: NEXT_PUBLIC_WHATSAPP_NUMBER
Value: 5511999999999
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Formato**: Código do país + DDD + número (sem espaços)

#### 6. ALLOWED_EMAILS
```
Name: ALLOWED_EMAILS
Value: seu_email@gmail.com,outro@email.com
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Formato**: Emails separados por vírgula, sem espaços

### 4.4 Verificar Todas as Variáveis

Antes de continuar, verifique se adicionou todas:

- [ ] DATABASE_URL
- [ ] AUTH_SECRET
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET
- [ ] NEXT_PUBLIC_WHATSAPP_NUMBER
- [ ] ALLOWED_EMAILS

---

## 🌐 Passo 5: Configurar Google OAuth para Produção

### 5.1 Obter URL de Produção da Vercel

**⚠️ IMPORTANTE**: Você precisa fazer o deploy primeiro para obter a URL, mas vamos preparar tudo antes.

A URL será algo como: `https://landing-bcs.vercel.app` ou `https://seu-dominio-customizado.com`

### 5.2 Atualizar Credenciais OAuth no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Selecione seu projeto
3. Vá em **"APIs e serviços"** > **"Credenciais"**
4. Clique no seu **OAuth Client ID**

5. **Adicionar URIs de Produção:**

   **Origens JavaScript autorizadas:**
   - Clique em **"+ ADICIONAR URI"**
   - Adicione: `https://landing-bcs.vercel.app` (ou sua URL customizada)
   - ⚠️ **Mantenha** `http://localhost:3000` para desenvolvimento local

   **URIs de redirecionamento autorizados:**
   - Clique em **"+ ADICIONAR URI"**
   - Adicione: `https://landing-bcs.vercel.app/api/auth/callback/google`
   - ⚠️ **Mantenha** `http://localhost:3000/api/auth/callback/google` para desenvolvimento local

6. Clique em **"Salvar"**

### 5.3 Atualizar Variáveis na Vercel (se necessário)

Se você mudou o Client ID ou Secret, atualize nas variáveis de ambiente da Vercel.

---

## 🗄️ Passo 6: Verificar Configuração do Banco de Dados

### 6.1 Verificar Connection String do Neon

1. Acesse [Neon Console](https://console.neon.tech)
2. Selecione seu projeto
3. Vá em **"Connection Details"**
4. Copie a **Connection String**
5. Certifique-se de que está usando a string de **"Pooler"** (recomendado para serverless)

### 6.2 Formato Correto

A connection string deve ser algo como:
```
postgresql://user:password@host.neon.tech/database?sslmode=require
```

### 6.3 Testar Conexão

Você pode testar a conexão criando um script temporário ou usando o SQL Editor do Neon.

---

## 🚀 Passo 7: Fazer Deploy

### 7.1 Iniciar Deploy

1. Na tela de configuração da Vercel, após adicionar todas as variáveis
2. Clique em **"Deploy"**
3. Aguarde o processo de build (pode levar 2-5 minutos)

### 7.2 Acompanhar o Build

Você verá logs em tempo real:
- ✅ Installing dependencies
- ✅ Building application
- ✅ Deploying

### 7.3 Verificar Deploy

Após o deploy concluir:
- ✅ Você verá uma mensagem de sucesso
- ✅ Uma URL será gerada: `https://landing-bcs-xxxxx.vercel.app`
- ✅ Clique na URL para abrir seu site

---

## ✅ Passo 8: Verificar Funcionalidades

### 8.1 Testar Página Principal

1. Acesse a URL do deploy
2. Verifique se a página carrega corretamente
3. Teste navegação e links

### 8.2 Testar Formulário de Demo

1. Acesse `/demo`
2. Preencha o formulário
3. Envie e verifique se os dados são salvos no banco

### 8.3 Testar Autenticação

1. Acesse `/admin`
2. Você deve ser redirecionado para `/login`
3. Faça login com Google
4. Verifique se consegue acessar o painel de leads

### 8.4 Verificar Banco de Dados

1. Acesse o Neon Console
2. Execute: `SELECT * FROM demo_submissions ORDER BY submitted_at DESC;`
3. Verifique se os dados do formulário estão sendo salvos

---

## 🔧 Passo 9: Configurar Domínio Customizado (Opcional)

### 9.1 Adicionar Domínio

1. No dashboard da Vercel, vá em **"Settings"** > **"Domains"**
2. Digite seu domínio (ex: `landing.bcs.com`)
3. Clique em **"Add"**

### 9.2 Configurar DNS

A Vercel fornecerá instruções específicas. Geralmente:

1. Acesse seu provedor de DNS (GoDaddy, Namecheap, etc.)
2. Adicione um registro CNAME:
   - **Type**: CNAME
   - **Name**: `@` ou `www`
   - **Value**: `cname.vercel-dns.com`

3. Aguarde propagação DNS (pode levar até 24 horas, geralmente 1-2 horas)

### 9.3 Atualizar Google OAuth

Após configurar o domínio customizado:
1. Atualize as URIs no Google Cloud Console com o novo domínio
2. Atualize as variáveis de ambiente se necessário

---

## 🔄 Passo 10: Configurar Deploy Automático

### 10.1 Deploy Automático já está Ativo

Por padrão, a Vercel faz deploy automático quando você faz push para:
- **main/master branch** → Deploy em Production
- **Outras branches** → Deploy em Preview

### 10.2 Verificar Configuração

1. Vá em **"Settings"** > **"Git"**
2. Verifique se está conectado ao repositório correto
3. Configure branch de produção (geralmente `main`)

### 10.3 Testar Deploy Automático

1. Faça uma pequena alteração no código
2. Commit e push:
   ```bash
   git add .
   git commit -m "Test deploy"
   git push
   ```
3. Acompanhe o deploy automático no dashboard da Vercel

---

## 🚨 Solução de Problemas

### Erro: "Environment Variable Missing"

**Causa**: Variável de ambiente não configurada

**Solução**:
1. Vá em **Settings** > **Environment Variables**
2. Verifique se todas as variáveis estão adicionadas
3. Certifique-se de que estão marcadas para **Production**
4. Faça um novo deploy

### Erro: "Database Connection Failed"

**Causa**: Connection string incorreta ou banco inacessível

**Solução**:
1. Verifique a `DATABASE_URL` nas variáveis de ambiente
2. Certifique-se de usar a connection string do **Pooler** (não a direta)
3. Teste a connection string localmente
4. Verifique se o banco Neon está ativo

### Erro: "Invalid OAuth Credentials"

**Causa**: URIs não configuradas corretamente no Google

**Solução**:
1. Verifique se adicionou a URL da Vercel no Google Cloud Console
2. Certifique-se de que a URI de callback está correta:
   - `https://seu-dominio.vercel.app/api/auth/callback/google`
3. Aguarde alguns minutos após atualizar (pode haver cache)

### Erro: "Build Failed"

**Causa**: Erro no código ou dependências

**Solução**:
1. Verifique os logs de build na Vercel
2. Teste o build localmente: `npm run build`
3. Corrija os erros
4. Faça commit e push novamente

### Erro: "Email não autorizado" após login

**Causa**: Email não está em `ALLOWED_EMAILS`

**Solução**:
1. Vá em **Settings** > **Environment Variables**
2. Verifique `ALLOWED_EMAILS`
3. Adicione seu email se não estiver lá
4. Faça um novo deploy ou aguarde alguns minutos

---

## 📊 Monitoramento e Logs

### Ver Logs em Tempo Real

1. No dashboard da Vercel, vá em **"Deployments"**
2. Clique no deployment específico
3. Vá na aba **"Logs"**
4. Veja logs em tempo real

### Verificar Métricas

1. Vá em **"Analytics"** (se ativado)
2. Veja métricas de performance
3. Monitore erros e exceções

---

## 🔒 Segurança

### Boas Práticas

- ✅ **Nunca** commite `.env.local` no Git
- ✅ Use variáveis de ambiente na Vercel
- ✅ Rotacione secrets periodicamente
- ✅ Use HTTPS sempre (Vercel faz isso automaticamente)
- ✅ Restrinja acesso por email (`ALLOWED_EMAILS`)

### Verificar Segurança

1. Verifique se `.env.local` está no `.gitignore`
2. Revise as variáveis de ambiente na Vercel
3. Certifique-se de que `AUTH_SECRET` é forte e único

---

## 📝 Checklist Final

Antes de considerar o deploy completo, verifique:

### Configuração Inicial
- [ ] Projeto no GitHub/GitLab
- [ ] Conta Vercel criada
- [ ] Projeto importado na Vercel

### Variáveis de Ambiente
- [ ] DATABASE_URL configurada
- [ ] AUTH_SECRET configurado
- [ ] GOOGLE_CLIENT_ID configurado
- [ ] GOOGLE_CLIENT_SECRET configurado
- [ ] NEXT_PUBLIC_WHATSAPP_NUMBER configurado
- [ ] ALLOWED_EMAILS configurado

### Google OAuth
- [ ] URIs de produção adicionadas no Google Cloud Console
- [ ] URIs de callback corretas
- [ ] Usuários de teste adicionados (se necessário)

### Banco de Dados
- [ ] Connection string do Pooler configurada
- [ ] Banco de dados acessível
- [ ] Tabelas criadas

### Deploy
- [ ] Build bem-sucedido
- [ ] Site acessível
- [ ] Formulário funcionando
- [ ] Autenticação funcionando
- [ ] Admin acessível

### Pós-Deploy
- [ ] Domínio customizado configurado (se aplicável)
- [ ] DNS propagado (se aplicável)
- [ ] Deploy automático funcionando
- [ ] Logs sendo monitorados

---

## 🎉 Pronto!

Seu projeto está deployado na Vercel! 

### URLs Importantes

- **Site**: `https://seu-projeto.vercel.app`
- **Admin**: `https://seu-projeto.vercel.app/admin`
- **Demo**: `https://seu-projeto.vercel.app/demo`
- **Dashboard Vercel**: `https://vercel.com/dashboard`

### Próximos Passos

1. Compartilhe a URL com sua equipe
2. Configure monitoramento e alertas
3. Configure domínio customizado (se necessário)
4. Configure CI/CD adicional (se necessário)

---

## 📚 Recursos Adicionais

- [Documentação Vercel](https://vercel.com/docs)
- [Next.js na Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables na Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

---

**Sucesso no deploy!** 🚀
