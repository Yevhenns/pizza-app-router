import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();

  const products: Product[] = await Product.find({});

  return Response.json({ data: products });
}
