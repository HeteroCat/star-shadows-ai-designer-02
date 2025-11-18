function svgDataUrl(text: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'>
    <rect width='100%' height='100%' fill='#f0f0f0'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#666' font-family='sans-serif' font-size='18'>${text.replace(/</g, '&lt;')}</text>
  </svg>`
  const encoded = Buffer.from(svg, 'utf-8').toString('base64')
  return `data:image/svg+xml;base64,${encoded}`
}

export function createPlaceholderImage(prompt: string): string {
  return svgDataUrl(prompt.length > 60 ? prompt.slice(0, 60) + '…' : prompt)
}

export function buildPrompt(type: string, description: string, style?: string, color?: string): string {
  const parts = [description]
  if (style) parts.push(`风格：${style}`)
  if (color) parts.push(`颜色：${color}`)
  const typeMap: Record<string, string> = {
    clothing: '时尚服装设计，高质量，专业摄影',
    jewelry: '精美珠宝设计，闪亮光泽，奢华质感',
    makeup: '美妆造型设计，精致妆容，时尚美丽'
  }
  if (typeMap[type]) parts.push(typeMap[type])
  return parts.join(', ')
}