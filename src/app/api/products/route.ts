import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();

  const products: Product[] = await Product.find({}).limit(40);

  return NextResponse.json({ data: products });
}
