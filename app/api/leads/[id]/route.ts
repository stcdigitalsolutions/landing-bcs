import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * GET /api/leads/[id] - Buscar um lead específico
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        company,
        status,
        submitted_at,
        created_at,
        updated_at
      FROM demo_submissions
      WHERE id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: result[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar lead:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar lead' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/leads/[id] - Atualizar status de um lead
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { status } = body;

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    if (!status || !['pending', 'contacted', 'converted'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido. Use: pending, contacted ou converted' },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE demo_submissions
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id, name, email, status, updated_at
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Status atualizado com sucesso',
        data: result[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao atualizar lead:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar lead' },
      { status: 500 }
    );
  }
}
