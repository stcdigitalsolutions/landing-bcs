import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, phoneCode, company } = body;

    // Validação básica
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Formatar telefone
    const formattedPhone = `${phoneCode || '+55'} ${phone}`;

    // Inserir no banco de dados
    const result = await sql`
      INSERT INTO demo_submissions (name, email, phone, company, status)
      VALUES (${name}, ${email}, ${formattedPhone}, ${company || null}, 'pending')
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
    console.error('Erro ao processar formulário:', error);

    // Verificar se é erro de duplicação (email já existe)
    if (error.code === '23505' || error.message?.includes('duplicate')) {
      return NextResponse.json(
        { error: 'Este email já foi cadastrado. Nossa equipe entrará em contato em breve.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao processar formulário. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
