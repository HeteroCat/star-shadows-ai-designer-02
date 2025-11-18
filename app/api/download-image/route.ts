import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (typeof url !== 'string' || !url.length) {
      return Response.json({ error: 'invalid url' }, { status: 400 })
    }

    if (url.startsWith('data:image/')) {
      const [header, data] = url.split(',', 1)[0] && url.split(',', 2)
      const mime = header.split(';')[0].split(':')[1]
      const buf = Buffer.from(data, 'base64')
      return new Response(buf, {
        headers: {
          'Content-Type': mime,
          'Content-Disposition': `attachment; filename=ai-design-${Date.now()}.png`
        }
      })
    }

    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0'
    }
    if (url.includes('googleusercontent.com') || url.includes('google.com')) {
      headers['Referer'] = 'https://google.com'
      headers['Accept'] = 'image/webp,image/apng,image/*,*/*;q=0.8'
    }

    const res = await fetch(url, { headers })
    if (!res.ok) {
      return Response.json({ error: `download failed: ${res.status}` }, { status: 400 })
    }
    const contentType = res.headers.get('content-type') || 'image/png'
    const buf = Buffer.from(await res.arrayBuffer())
    return new Response(buf, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename=ai-design-${Date.now()}.png`
      }
    })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'download error' }, { status: 500 })
  }
}