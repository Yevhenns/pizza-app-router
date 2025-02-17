import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export const dynamic = 'force-dynamic';

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags:
 *     - Products
 *     description: Returns all products
 *     responses:
 *       200:
 *         description: products
 */
export async function GET() {
  await dbConnect();

  const products: Product[] = await Product.find({});

  return new Response(JSON.stringify({ data: products }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: Request) {
  const body: ProductCreateDto = await request.json();

  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ error: 'Токен не надано' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayloadCustom;

    if (!decoded.userId || decoded.role !== 'Admin') {
      return new Response(
        JSON.stringify({ error: 'Невірний токен або доступ заборонено' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await dbConnect();

    const created = new Product(body);
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
