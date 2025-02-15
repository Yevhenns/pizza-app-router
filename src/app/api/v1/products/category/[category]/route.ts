import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(
  _: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params;

  const translateCategory = () => {
    if (category === 'pizzas') return 'Піца';
    if (category === 'appetizers') return 'Закуски';
    if (category === 'drinks') return 'Напої';
    if (category === 'sushi') return 'Суші';
  };

  const categoryValue = translateCategory();

  await dbConnect();

  const products: Product[] = await Product.find({ category: categoryValue });

  return new Response(JSON.stringify({ data: products }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
