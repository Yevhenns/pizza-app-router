import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  const products: Product[] = await Product.find({});

  return new Response(JSON.stringify({ data: products }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
