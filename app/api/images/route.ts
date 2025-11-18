import fs from 'node:fs'
import path from 'node:path'

export async function GET() {
  try {
    const picDir = path.join(process.cwd(), 'public', 'pic')
    if (!fs.existsSync(picDir)) {
      return Response.json([])
    }
    const files = fs.readdirSync(picDir)
    const allow = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp'])
    const images = files.filter(f => allow.has(path.extname(f).toLowerCase())).sort()
    return Response.json(images)
  } catch (e) {
    return Response.json({ error: 'failed to read images' }, { status: 500 })
  }
}