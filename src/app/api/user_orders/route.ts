import dbConnect from '@/lib/dbConnect';
import UserOrder from '@/models/UserOrder';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  await dbConnect();

  const products = userId
    ? await UserOrder.find({ 'customerInfo.userId': userId })
    : await UserOrder.find({});

  return new Response(JSON.stringify({ data: products }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
