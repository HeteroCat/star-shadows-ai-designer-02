import { deleteDesign, getDesign } from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const found = getDesign(params.id)
  if (!found) return Response.json({ error: 'not found' }, { status: 404 })
  return Response.json(found)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  deleteDesign(params.id)
  return Response.json({ message: '设计作品已删除' })
}