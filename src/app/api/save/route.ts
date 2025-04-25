import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { ResponseData } from '@/types';

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data, 'data');

  const blob = await put(`survey/${Date.now()}.json`, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
  });
  console.log(blob, data);

  const response: ResponseData = {
    success: true,
    code: 200,
    message: 'Data saved',
    data: blob.url,
  };
  return NextResponse.json(response);
}
