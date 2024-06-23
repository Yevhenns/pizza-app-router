import { getProducts33 } from '@/lib/products';

export async function GET(request: Request) {
  console.log('das');

  const products = await getProducts33();
  return Response.json({ data: products });
}

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'GET') {
//     try {
//       const { products, error } = await getProducts33();
//       if (error) throw new Error(error);
//       return res.status(200).json(products);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }

//   res.setHeader('Allow', ['GET']);
//   res.status(425).end(`Method ${req.method} is not allowed`);
// };

// export default handler;
