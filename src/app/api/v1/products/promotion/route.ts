import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

/**
 * @swagger
 * /api/v1/products/promotion:
 *   get:
 *     tags:
 *     - Products
 *     description: Returns promotion products
 *     responses:
 *       200:
 *         description: products
 */
export async function GET() {
  await dbConnect();

  const products: Product[] = await Product.find({ promotion: true });

  return new Response(JSON.stringify({ data: products }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
