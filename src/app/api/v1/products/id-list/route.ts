import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

/**
 * @swagger
 * /api/v1/products/id-list:
 *   get:
 *     tags:
 *     - Products
 *     description: Returns all products id list
 *     responses:
 *       200:
 *         description: id list
 */
export async function GET() {
  await dbConnect();

  const products = await Product.find({}).distinct('_id');

  return new Response(JSON.stringify(products), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
