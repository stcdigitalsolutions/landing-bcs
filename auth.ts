import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Obter emails permitidos do .env (separados por vírgula)
const getAllowedEmails = (): string[] => {
  const allowedEmailsEnv = process.env.ALLOWED_EMAILS;
  if (!allowedEmailsEnv) {
    // Se não configurado, permite todos (útil para desenvolvimento)
    // Apenas logar em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  ALLOWED_EMAILS não configurado. Permitindo acesso a todos os emails.');
    }
    return [];
  }
  // Dividir por vírgula e remover espaços
  return allowedEmailsEnv.split(',').map(email => email.trim()).filter(Boolean);
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      const allowedEmails = getAllowedEmails();
      
      // Se não há emails configurados, permite todos (desenvolvimento)
      if (allowedEmails.length === 0) {
        return true;
      }
      
      // Verifica se o email do usuário está na lista permitida
      const userEmail = user.email?.toLowerCase();
      if (!userEmail) {
        return false;
      }
      
      return allowedEmails.some(email => email.toLowerCase() === userEmail);
    },
  },
});
