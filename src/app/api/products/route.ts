import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();

  const products: Product[] = await Product.find({}).limit(40);

  return Response.json({ data: products });
}
