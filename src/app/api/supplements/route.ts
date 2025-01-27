import dbConnect from '@/lib/dbConnect';
import Supplement from '@/models/Supplement';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  const supplements: Option[] = await Supplement.find({});

  return new Response(JSON.stringify({ data: supplements }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
