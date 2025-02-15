import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  const products = await Product.find({}).select('_id');

  return new Response(JSON.stringify(products), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
