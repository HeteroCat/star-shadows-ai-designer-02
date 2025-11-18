import { NextRequest } from 'next/server'
import { buildPrompt, createPlaceholderImage } from '@/lib/ai'
import { editSeedreamBase64, generateNanoBanana, generateSeedream, generateSeedreamMaxImages } from '@/lib/dmx'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const mode: string = body?.mode || 't2i'
    const model: string | undefined = body?.model
    let result: { imageUrl?: string; images?: string[] } | null = null

    if (mode === 't2i') {
      const prompt = String(body?.prompt || '')
      result = await generateSeedream({ prompt, model })
    } else if (mode === 'maximages') {
      const prompt = String(body?.prompt || '')
      const image = Array.isArray(body?.image) ? body.image : []
      result = await generateSeedreamMaxImages({ prompt, image, model })
    } else if (mode === 'edit_base64') {
      const prompt = String(body?.prompt || '')
      const image_base64 = String(body?.image_base64 || '')
      result = await editSeedreamBase64({ prompt, image_base64, model })
    } else if (mode === 'nano') {
      const prompt = String(body?.prompt || '')
      result = await generateNanoBanana(prompt, model)
    }

    const imageUrl = result?.imageUrl || result?.images?.[0] || createPlaceholderImage('DMX API 未配置或调用失败')
    return Response.json({ image_url: imageUrl, model: model || 'doubao', created_at: new Date().toISOString() })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'bad request' }, { status: 400 })
  }
}