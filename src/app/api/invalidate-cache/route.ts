import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  revalidateTag('release-notes', 'max');
  revalidateTag('faqs', 'max');
  revalidateTag('news', 'max');
  return new NextResponse('ok');
}
