import { NextRequest } from 'next/server'
import { addDesign, listDesigns } from '@/lib/db'
import { buildPrompt, createPlaceholderImage } from '@/lib/ai'
import { generateSeedream } from '@/lib/dmx'

export async function GET() {
  return Response.json({ designs: listDesigns() })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const type: string = body?.type || 'clothing'
  const description: string = body?.description || ''
  const style: string | undefined = body?.style
  const color: string | undefined = body?.color
  const model: string | undefined = body?.model

  const prompt = buildPrompt(type, description, style, color)
  const generated = await generateSeedream({ prompt, model })
  const imageUrl = generated?.imageUrl || createPlaceholderImage(prompt)

  const design = {
    id: crypto.randomUUID(),
    type,
    description,
    style,
    color,
    model: model || 'doubao',
    image_url: imageUrl,
    created_at: new Date().toISOString()
  }
  addDesign(design)
  return Response.json(design)
}