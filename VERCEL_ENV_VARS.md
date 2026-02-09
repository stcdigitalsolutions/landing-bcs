# Variáveis de Ambiente para Vercel

Este arquivo lista todas as variáveis de ambiente que precisam ser configuradas na Vercel.

## 📋 Lista Completa de Variáveis

Copie e cole estas variáveis na Vercel (Settings > Environment Variables):

### 1. DATABASE_URL
```
Name: DATABASE_URL
Value: postgresql://user:password@host.neon.tech/database?sslmode=require
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Onde encontrar**: Dashboard do Neon > Connection Details > Connection String (use a do Pooler)

---

### 2. AUTH_SECRET
```
Name: AUTH_SECRET
Value: [sua_chave_secreta_gerada_com_openssl_rand_-base64_32]
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Como gerar**: `openssl rand -base64 32` (use o mesmo do desenvolvimento local)

---

### 3. GOOGLE_CLIENT_ID
```
Name: GOOGLE_CLIENT_ID
Value: [seu_client_id_do_google_cloud_console]
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Onde encontrar**: Google Cloud Console > Credenciais > OAuth Client ID

---

### 4. GOOGLE_CLIENT_SECRET
```
Name: GOOGLE_CLIENT_SECRET
Value: [seu_client_secret_do_google_cloud_console]
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Onde encontrar**: Google Cloud Console > Credenciais > OAuth Client ID

---

### 5. NEXT_PUBLIC_WHATSAPP_NUMBER
```
Name: NEXT_PUBLIC_WHATSAPP_NUMBER
Value: 5511999999999
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Formato**: Código do país + DDD + número (sem espaços ou caracteres especiais)
**Exemplo Brasil**: `5511999999999` (55 = país, 11 = DDD, 999999999 = número)

---

### 6. ALLOWED_EMAILS
```
Name: ALLOWED_EMAILS
Value: seu_email@gmail.com,outro@email.com
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Formato**: Emails separados por vírgula, sem espaços
**Exemplo**: `admin@bcs.com,ramonpaulo94@gmail.com`

---

## ✅ Checklist de Configuração

Antes de fazer deploy, verifique:

- [ ] Todas as 6 variáveis estão adicionadas
- [ ] Todas estão marcadas para **Production**
- [ ] Todas estão marcadas para **Preview** (recomendado)
- [ ] Valores estão corretos (sem espaços extras)
- [ ] DATABASE_URL usa a connection string do **Pooler**
- [ ] GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET estão corretos
- [ ] ALLOWED_EMAILS contém pelo menos um email válido

---

## 🔄 Após Adicionar Variáveis

1. **Salve** todas as variáveis
2. Faça um **novo deploy** ou aguarde o próximo deploy automático
3. As variáveis estarão disponíveis apenas após um novo deploy

---

## 🚨 Importante

- ⚠️ **NÃO** commite valores reais no Git
- ⚠️ Use variáveis de ambiente na Vercel
- ⚠️ Rotacione secrets periodicamente
- ⚠️ Verifique se `.env.local` está no `.gitignore`

---

## 📖 Tutorial Completo

Para instruções detalhadas passo a passo, veja:
** [`TUTORIAL_DEPLOY_VERCEL.md`](./TUTORIAL_DEPLOY_VERCEL.md) **
