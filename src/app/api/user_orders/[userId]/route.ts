import dbConnect from '@/lib/dbConnect';
import UserOrder from '@/models/UserOrder';

export const dynamic = 'force-dynamic';

export async function GET(
  _: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  console.log('userId', userId);

  await dbConnect();

  const products = await UserOrder.find({ 'customerInfo.userId': userId });

  return new Response(JSON.stringify({ data: products }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
