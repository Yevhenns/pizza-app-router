import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import jwt, { JwtPayload } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  const { productId } = params;

  if (!token) {
    return new Response(JSON.stringify({ error: 'Токен не надано' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayloadCustom;

    if (!decoded.userId && decoded.role !== 'Admin') {
      return new Response(
        JSON.stringify({ error: 'Невірний токен або доступ заборонено' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await dbConnect();

    const deletedProduct = await Product.findByIdAndDelete(productId);

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

export async function PATCH(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const body: ProductCreateDto = await request.json();
  const { productId } = params;
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ error: 'Токен не надано' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayloadCustom;

    if (!decoded.userId && decoded.role !== 'Admin') {
      return new Response(
        JSON.stringify({ error: 'Невірний токен або доступ заборонено' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await dbConnect();

    const editedProduct = await Product.findByIdAndUpdate(productId, body, {
      new: true,
    });

    if (!editedProduct) {
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
        message: 'Товар оновлено',
        product: editedProduct,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Помилка оновлення товару:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Помилка оновлення товару' }),
      {
        status: 500,
      }
    );
  }
}
