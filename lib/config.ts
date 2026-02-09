// Configurações do sistema
export const config = {
  // Número do WhatsApp no formato: código do país + DDD + número (sem espaços ou caracteres especiais)
  // Exemplo para Brasil: 5511999999999 (55 = código do país, 11 = DDD, 999999999 = número)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999',
  
  // Mensagem padrão do WhatsApp
  whatsappDefaultMessage: 'Olá! Gostaria de agendar uma demonstração da plataforma BCS Consultoria.',
};
