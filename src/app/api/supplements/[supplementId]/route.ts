import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function DELETE(
  req: Request,
  { params }: { params: { supplementId: string } }
) {
  const ADMIN_ID = process.env.ADMIN_ID;

  const { supplementId } = params;
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (ADMIN_ID === userId)
    try {
      await dbConnect();

      const deletedProduct = await Product.findByIdAndDelete(supplementId);

      if (!userId) {
        return new Response(JSON.stringify({ error: 'userId не передано' }), {
          status: 400,
        });
      }

      if (!deletedProduct) {
        return new Response(
          JSON.stringify({
            error: 'Товар не знайдено',
          }),
          {
            status: 404,
          }
        );
      }

      return new Response(
        JSON.stringify({
          message: 'Товар видалено',
          product: deletedProduct,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Помилка видалення товару:', error);
      return new NextResponse(
        JSON.stringify({ message: 'Помилка видалення товару' }),
        {
          status: 500,
        }
      );
    }
}
