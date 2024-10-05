import { compileOrderTemplate } from '@/lib/orderTemplate/compileOrderTemplate';
import { sendEmail } from '@/lib/sendEmail';

export async function POST(request: Request) {
  const body: SummaryOrder = await request.json();
  const { customerInfo, order, orderSum } = body;
  const { name, number, comment, address, userId } = customerInfo;

  const emailBody = compileOrderTemplate({
    name,
    number,
    comment,
    address,
    order,
    orderSum,
    userId,
  });

  await sendEmail({ body: emailBody });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: { 'Content-type': 'application/json' },
  });
}
