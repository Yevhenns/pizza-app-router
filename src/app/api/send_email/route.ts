import { compileOrderTemplate, sendEmail } from '@/lib/mail';

export async function POST(request: Request, response: Response) {
  await sendEmail({ body: compileOrderTemplate({ name: 'Oleg' }) });

  const data = await response.json();
  console.log(data);

  return Response.json(data);
}
