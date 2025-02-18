import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(
  _: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params;

  const translateCategory = (): Categories | undefined => {
    if (!category) return undefined;
    if (category === 'pizzas') return 'Піца';
    if (category === 'appetizers') return 'Закуски';
    if (category === 'drinks') return 'Напої';
    if (category === 'sushi') return 'Суші';
  };

  const categoryValue = translateCategory();

  if (!categoryValue) {
    return new Response(JSON.stringify({ error: 'Не знайдено' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await dbConnect();

    const products: Product[] = await Product.find({ category: categoryValue });

    return new Response(JSON.stringify({ data: products }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.error || 'Invalid request' },
      { status: error.status || 400 }
    );
  }
}
