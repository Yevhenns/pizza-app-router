import dbConnect from '@/lib/dbConnect';
import { compileOrderTemplate } from '@/lib/orderTemplate/compileOrderTemplate';
import { sendEmail } from '@/lib/sendEmail';
import UserOrder from '@/models/UserOrder';

export async function POST(request: Request) {
  const body: SummaryOrder = await request.json();
  const { customerInfo, order, orderSum } = body;
  const { name, number, comment, address, userId } = customerInfo;

  if (userId) {
    await dbConnect();

    await UserOrder.create(body);
  }

  const emailBody = compileOrderTemplate({
    name,
    number,
    comment,
    address,
    order,
    orderSum,
  });

  await sendEmail({ body: emailBody });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: { 'Content-type': 'application/json' },
  });
}
