import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { auth } from '@/auth';

/**
 * GET /api/leads - Listar todos os leads
 * REQUER AUTENTICAÇÃO
 * Query params:
 * - status: filtrar por status (pending, contacted, converted)
 * - limit: limite de resultados (padrão: 50)
 * - offset: offset para paginação (padrão: 0)
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // Máximo 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);

    let query;

    if (status && ['pending', 'contacted', 'converted'].includes(status)) {
      query = sql`
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
        WHERE status = ${status}
        ORDER BY submitted_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      query = sql`
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
        ORDER BY submitted_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    const leads = await query;

    // Contar total de leads
    const countQuery = status && ['pending', 'contacted', 'converted'].includes(status)
      ? sql`SELECT COUNT(*) as total FROM demo_submissions WHERE status = ${status}`
      : sql`SELECT COUNT(*) as total FROM demo_submissions`;
    
    const countResult = await countQuery;
    const total = countResult[0]?.total || 0;

    return NextResponse.json(
      {
        success: true,
        data: leads,
        pagination: {
          total: Number(total),
          limit,
          offset,
          hasMore: offset + limit < Number(total),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Não logar detalhes do erro em produção
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao buscar leads:', error);
    }
    return NextResponse.json(
      { error: 'Erro ao buscar leads' },
      { status: 500 }
    );
  }
}
