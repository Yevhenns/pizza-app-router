'use client';

import { useParams } from 'next/navigation';

export default function Verify() {
  const params = useParams<{ tag: string; item: string }>();
  console.log(params);

  return <div>Verify</div>;
}
