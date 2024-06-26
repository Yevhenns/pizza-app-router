import { compileOrderTemplate, sendEmail } from '@/lib/mail';

export async function POST(request: Request) {
  const body = await request.json();
  const { customerInfo, order, orderSum } = body;
  const { name, number, comment, address } = customerInfo;

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
