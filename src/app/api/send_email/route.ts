import { compileOrderTemplate, sendEmail } from '@/lib/mail';

export async function POST(request: Request) {
  console.log(request);

  const res = await sendEmail({ body: compileOrderTemplate({ name: 'dsa' }) });
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // });

  // const data = await res.json();

  return Response.json(res);
  // return Response.json(data);
}
