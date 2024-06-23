import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(request: Request) {
  await dbConnect();

  const products = await Product.find({});

  return Response.json({ data: products });
}
