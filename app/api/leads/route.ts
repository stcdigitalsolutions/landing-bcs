import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * GET /api/leads - Listar todos os leads
 * Query params:
 * - status: filtrar por status (pending, contacted, converted)
 * - limit: limite de resultados (padrão: 50)
 * - offset: offset para paginação (padrão: 0)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query;
    let params: any[] = [limit, offset];

    if (status) {
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
    const countQuery = status
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
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar leads' },
      { status: 500 }
    );
  }
}
