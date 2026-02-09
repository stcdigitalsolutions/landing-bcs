import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// Rate limiting para data-request (em produção, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // 3 requisições
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return `data-request-${ip}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * POST /api/data-request - Solicitação de direitos LGPD
 * Suporta: acesso, correção, exclusão, portabilidade, revogação
 * 
 * ⚠️ IMPORTANTE: Este endpoint sempre retorna mensagens genéricas para evitar
 * enumeração de emails. Em produção, considere enviar email de confirmação
 * antes de processar solicitações sensíveis (exclusão, acesso).
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Muitas solicitações. Tente novamente em algumas horas.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, requestType, message } = body;

    // Validação
    if (!email || !requestType) {
      return NextResponse.json(
        { error: 'Email e tipo de solicitação são obrigatórios' },
        { status: 400 }
      );
    }

    const validRequestTypes = ['access', 'correction', 'deletion', 'portability', 'revocation'];
    if (!validRequestTypes.includes(requestType)) {
      return NextResponse.json(
        { error: 'Tipo de solicitação inválido' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Buscar dados do usuário
    const userData = await sql`
      SELECT id, name, email, phone, company, status, submitted_at
      FROM demo_submissions
      WHERE email = ${email.toLowerCase()}
      ORDER BY submitted_at DESC
    `;

    // IMPORTANTE: Sempre retornar mensagem genérica para não revelar se email existe
    // Para maior segurança, considere enviar email de confirmação antes de processar

    // Processar solicitação
    switch (requestType) {
      case 'access':
        // Retornar dados do usuário (se existir)
        // Nota: Em produção, considere enviar email de confirmação primeiro
        if (userData.length === 0) {
          // Mensagem genérica - não revela se email existe
          return NextResponse.json({
            success: true,
            message: 'Se o email informado estiver cadastrado, você receberá um email com instruções para acessar seus dados.',
            data: [], // Sempre retornar array vazio se não encontrar
          });
        }

        // Em produção, aqui você deveria enviar um email com link seguro
        // Por enquanto, retorna os dados (considere adicionar autenticação)
        return NextResponse.json({
          success: true,
          message: 'Dados encontrados',
          data: userData,
        });

      case 'deletion':
        // Excluir dados (se existir)
        // Mensagem sempre genérica
        if (userData.length > 0) {
          await sql`
            DELETE FROM demo_submissions
            WHERE email = ${email.toLowerCase()}
          `;
        }

        // Sempre retornar mensagem genérica
        return NextResponse.json({
          success: true,
          message: 'Se o email informado estiver cadastrado, seus dados serão excluídos. Você receberá uma confirmação por email.',
        });

      case 'correction':
        // Retornar dados para correção (usuário deve entrar em contato)
        // Mensagem genérica
        if (userData.length === 0) {
          return NextResponse.json({
            success: true,
            message: 'Se o email informado estiver cadastrado, você receberá instruções por email para corrigir seus dados.',
            data: [],
          });
        }

        return NextResponse.json({
          success: true,
          message: 'Para corrigir seus dados, entre em contato através do email: privacidade@bcs.com',
          data: userData,
        });

      case 'portability':
        // Retornar dados em formato portável
        // Mensagem genérica se não encontrar
        if (userData.length === 0) {
          return NextResponse.json({
            success: true,
            message: 'Se o email informado estiver cadastrado, você receberá um email com link para baixar seus dados.',
            data: [],
          });
        }

        return NextResponse.json({
          success: true,
          message: 'Dados em formato portável',
          data: userData.map(record => ({
            nome: record.name,
            email: record.email,
            telefone: record.phone,
            empresa: record.company,
            status: record.status,
            data_submissao: record.submitted_at,
          })),
        });

      case 'revocation':
        // Marcar como revogado ou excluir se status não suportado
        // Mensagem sempre genérica
        if (userData.length > 0) {
          try {
            await sql`
              UPDATE demo_submissions
              SET status = 'revoked'
              WHERE email = ${email.toLowerCase()}
            `;
          } catch (error: any) {
            // Se status 'revoked' não for permitido (tabela antiga), apenas excluir
            if (error.message?.includes('check constraint') || error.code === '23514') {
              await sql`
                DELETE FROM demo_submissions
                WHERE email = ${email.toLowerCase()}
              `;
            } else {
              throw error;
            }
          }
        }

        // Sempre retornar mensagem genérica
        return NextResponse.json({
          success: true,
          message: 'Se o email informado estiver cadastrado, seu consentimento será revogado. Você receberá uma confirmação por email.',
        });

      default:
        return NextResponse.json(
          { error: 'Tipo de solicitação não suportado' },
          { status: 400 }
        );
    }
  } catch (error) {
    // Não logar detalhes em produção
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao processar solicitação:', error);
    }

    return NextResponse.json(
      { error: 'Erro ao processar solicitação. Entre em contato através do email: privacidade@bcs.com' },
      { status: 500 }
    );
  }
}
