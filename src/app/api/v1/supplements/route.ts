import dbConnect from '@/lib/dbConnect';
import Supplement from '@/models/Supplement';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export const dynamic = 'force-dynamic';

/**
 * @swagger
 * /api/v1/supplements:
 *   get:
 *     tags:
 *     - Supplements
 *     description: Returns all supplements
 *     responses:
 *       200:
 *         description: supplements
 */
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
  const body: SupplementCreateDto = await request.json();

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
