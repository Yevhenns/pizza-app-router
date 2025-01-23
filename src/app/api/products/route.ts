import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();

  const products: Product[] = await Product.find({}).limit(40);

  return new Response(JSON.stringify({ data: products }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
