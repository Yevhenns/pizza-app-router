import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Supplement from '@/models/Supplement';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  const supplements: Supplement[] = await Supplement.find({});

  return new Response(JSON.stringify({ data: supplements }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body: SupplementDto = await request.json();
    const ADMIN_ID = process.env.ADMIN_ID;
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId не передано' }), {
        status: 400,
      });
    }

    if (ADMIN_ID !== userId) {
      return new Response(JSON.stringify({ error: 'Доступ заборонено' }), {
        status: 403,
      });
    }

    await dbConnect();

    const created = new Supplement(body);
    await created.save();

    return new Response(
      JSON.stringify({
        message: 'Товар додано',
        product: created,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Помилка створення товару:', error);
    return new Response(
      JSON.stringify({ message: 'Помилка створення товару' }),
      {
        status: 500,
      }
    );
  }
}
