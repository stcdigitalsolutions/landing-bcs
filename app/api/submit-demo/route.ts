import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// Rate limiting simples (em produção, use Redis ou serviço dedicado)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requisições
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos

function getRateLimitKey(request: NextRequest): string {
  // Usar IP do cliente
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
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

// Sanitizar e validar dados
function sanitizeString(input: string, maxLength: number): string {
  // Remove caracteres potencialmente perigosos
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove tags HTML
    .replace(/[&"']/g, '') // Remove caracteres especiais
    .replace(/\s+/g, ' ') // Normaliza espaços
    .trim();
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validatePhone(phone: string): boolean {
  // Remove caracteres não numéricos exceto + e espaços
  const cleaned = phone.replace(/[^\d+\s()-]/g, '');
  return cleaned.length >= 8 && cleaned.length <= 20;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Muitas requisições. Tente novamente em alguns minutos.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    let { name, email, phone, phoneCode, company } = body;

    // Validação básica
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      );
    }

    // Sanitizar e validar
    name = sanitizeString(name, 255);
    email = email.trim().toLowerCase().slice(0, 255);
    phone = phone.trim();
    phoneCode = phoneCode?.trim() || '+55';
    company = company ? sanitizeString(company, 100) : null;

    // Validações
    if (name.length < 2) {
      return NextResponse.json(
        { error: 'Nome deve ter pelo menos 2 caracteres' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Telefone inválido' },
        { status: 400 }
      );
    }

    // Formatar telefone
    const formattedPhone = `${phoneCode} ${phone}`;

    // Inserir no banco de dados
    const result = await sql`
      INSERT INTO demo_submissions (name, email, phone, company, status)
      VALUES (${name}, ${email}, ${formattedPhone}, ${company}, 'pending')
      RETURNING id, submitted_at
    `;

    const submission = result[0];

    return NextResponse.json(
      { 
        success: true, 
        message: 'Formulário enviado com sucesso! Nossa equipe entrará em contato em breve.',
        id: submission.id,
        submittedAt: submission.submitted_at
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Não logar dados sensíveis em produção
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao processar formulário:', error);
    }

    // Verificar se é erro de duplicação (email já existe)
    if (error.code === '23505' || error.message?.includes('duplicate')) {
      // Mensagem genérica para não revelar que email existe
      return NextResponse.json(
        { error: 'Formulário recebido. Nossa equipe entrará em contato em breve.' },
        { status: 200 } // Retornar 200 para não revelar duplicação
      );
    }

    return NextResponse.json(
      { error: 'Erro ao processar formulário. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
