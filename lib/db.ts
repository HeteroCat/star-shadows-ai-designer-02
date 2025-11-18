export type Design = {
  id: string
  type: string
  description: string
  style?: string
  color?: string
  model?: string
  image_url: string
  created_at: string
}

const designs: Design[] = []

export function addDesign(d: Design) {
  designs.push(d)
}

export function listDesigns() {
  return designs
}

export function getDesign(id: string) {
  return designs.find(d => d.id === id) || null
}

export function deleteDesign(id: string) {
  const idx = designs.findIndex(d => d.id === id)
  if (idx >= 0) designs.splice(idx, 1)
}