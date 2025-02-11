import dbConnect from '@/lib/dbConnect';
import UserOrder from '@/models/UserOrder';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ error: 'Токен не надано' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayloadCustom;

    if (!decoded.userId) {
      return new Response(
        JSON.stringify({ error: 'Невірний токен або доступ заборонено' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await dbConnect();

    const products = await UserOrder.find({
      'customerInfo.userId': decoded.userId,
    });

    return new Response(JSON.stringify({ data: products }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Невірний токен або помилка верифікації' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
