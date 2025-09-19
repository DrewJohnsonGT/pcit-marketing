import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  revalidateTag('release-notes');
  revalidateTag('faqs');
  revalidateTag('news');
  return new NextResponse('ok');
}
