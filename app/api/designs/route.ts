import { NextRequest } from 'next/server'
import { addDesign, listDesigns } from '@/lib/db'
import { buildPrompt, createPlaceholderImage } from '@/lib/ai'
import { generateSeedream } from '@/lib/dmx'

export async function GET() {
  return Response.json({ designs: listDesigns() })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const type: string = body?.type || 'clothing'
    const description: string = body?.description || ''
    const style: string | undefined = body?.style
    const color: string | undefined = body?.color
    const model: string | undefined = body?.model

    // 验证必填字段
    if (!description.trim()) {
      return Response.json({ error: '设计描述不能为空' }, { status: 400 })
    }

    const prompt = buildPrompt(type, description, style, color)
    console.log(`生成设计 - 类型: ${type}, 提示词: ${prompt}`)

    const generated = await generateSeedream({ prompt, model })

    if (!generated?.imageUrl) {
      console.error('图片生成失败，使用占位图')
      const imageUrl = createPlaceholderImage('API 调用失败，请检查 DMX_API_KEY 配置')

      const design = {
        id: crypto.randomUUID(),
        type,
        description,
        style,
        color,
        model: model || 'doubao',
        image_url: imageUrl,
        created_at: new Date().toISOString(),
        error: true
      }
      addDesign(design)
      return Response.json(design)
    }

    const design = {
      id: crypto.randomUUID(),
      type,
      description,
      style,
      color,
      model: model || 'doubao',
      image_url: generated.imageUrl,
      created_at: new Date().toISOString()
    }
    addDesign(design)
    return Response.json(design)
  } catch (error) {
    console.error('设计生成 API 错误:', error)
    return Response.json(
      { error: '服务器内部错误，请稍后重试' },
      { status: 500 }
    )
  }
}