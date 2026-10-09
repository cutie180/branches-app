import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const revalidate = 86400

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const type = searchParams.get('type') || 'logo'

  if (!id) {
    return new NextResponse('Missing id', { status: 400 })
  }

  try {
    const docRef = doc(db, 'businesses', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.redirect(new URL('/placeholder-logo.png', request.url))
    }

    const data = docSnap.data()
    const rawImage = (type === 'cover' ? (data.coverImage || data.coverUrl) : (data.logo || data.logoUrl || '')) as string

    if (!rawImage || typeof rawImage !== 'string') {
      return NextResponse.redirect(new URL('/placeholder-logo.png', request.url))
    }

    if (rawImage.startsWith('data:image/')) {
      const parts = rawImage.split(';base64,')
      if (parts.length === 2) {
        const mimeType = parts[0].replace('data:', '') || 'image/png'
        const buffer = Buffer.from(parts[1], 'base64')

        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Content-Length': buffer.length.toString(),
          },
        })
      }
    }

    if (rawImage.startsWith('http://') || rawImage.startsWith('https://')) {
      return NextResponse.redirect(rawImage)
    }

    return NextResponse.redirect(new URL('/placeholder-logo.png', request.url))
  } catch (error) {
    console.error('Error serving business image:', error)
    return NextResponse.redirect(new URL('/placeholder-logo.png', request.url))
  }
}
