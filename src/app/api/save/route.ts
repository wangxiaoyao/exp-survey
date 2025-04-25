import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { ResponseData } from '@/types';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const blob = await put(
    `exp-survey/${Date.now()}-${crypto.randomUUID()}.json`,
    JSON.stringify(data, null, 2),
    {
      access: 'public',
      contentType: 'application/json',
    },
  );
  const response: ResponseData = {
    success: true,
    code: 200,
    message: 'Data saved',
    data: blob.url,
  };
  return NextResponse.json(response);
}
