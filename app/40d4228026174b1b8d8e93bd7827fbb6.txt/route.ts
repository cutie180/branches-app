import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('40d4228026174b1b8d8e93bd7827fbb6', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
