import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

/**
 * @swagger
 * /api/v1/products/id-list:
 *   get:
 *     tags:
 *       - Products
 *     description: Returns a list of product IDs from the database.
 *     responses:
 *       200:
 *         description: A list of product IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: objectId
 *             example: ["60c72b2f9b1e8b6d4f3a2c1e", "60c72b2f9b1e8b6d4f3a2c1f", "60c72b2f9b1e8b6d4f3a2c20"]
 *       404:
 *         description: No products found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Не знайдено"
 *       500:
 *         description: Server error, could not fetch product IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({}).distinct('_id');

    if (!products || products.length === 0) {
      return new Response(JSON.stringify({ message: 'Не знайдено' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Сталася помилка:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
