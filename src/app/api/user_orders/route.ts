import dbConnect from '@/lib/dbConnect';
import UserOrder from '@/models/UserOrder';

export async function GET() {
  await dbConnect();

  const products: SummaryOrder[] = await UserOrder.find({});

  return Response.json({ data: products });
}
