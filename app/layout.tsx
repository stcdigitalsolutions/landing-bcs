import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BCS Consultoria em Tecnologia",
  description: "Consultoria de IA aplicada. Ajudamos empresas e profissionais a ganhar produtividade com soluções testadas nos nossos laboratórios.",
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
