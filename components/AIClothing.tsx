'use client'
import { useState } from 'react'
import Header from '@/components/Header'

export default function AIClothing() {
  const [formData, setFormData] = useState({ description: '', style: '', color: '', model: 'doubao' })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [designs, setDesigns] = useState<any[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsGenerating(true)
    try {
      const res = await fetch('/api/designs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'clothing', ...formData }) })
      if (res.ok) {
        const result = await res.json()
        setGeneratedImage(result.image_url)
        setDesigns(prev => [result, ...prev])
      }
    } finally { setIsGenerating(false) }
  }

  const handleDownload = async () => {
    if (!generatedImage) return alert('请先生成图片')
    const res = await fetch('/api/download-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: generatedImage }) })
    if (!res.ok) return alert('下载失败，请重试')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-clothing-${Date.now()}.png`
    document.body.appendChild(a)
    a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  const styleOptions = ['', '现代简约', '复古经典', '街头潮流', '商务正装', '休闲运动', '民族风情', '未来科技']
  const colorOptions = ['', '黑色', '白色', '红色', '蓝色', '绿色', '紫色', '金色', '银色', '彩色渐变']
  const modelOptions = ['doubao', 'google']

  return (
    <div className="ai-clothing">
      <Header />
      <div className="clothing-header"><h1>AI服装设计</h1></div>
      <div className="clothing-container">
        <div className="design-form">
          <h2>设计参数</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label htmlFor="description">设计描述</label><textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="请描述您想要的服装设计，例如：一件优雅的晚礼服，带有蕾丝装饰..." rows={4} required /></div>
            <div className="form-row">
              <div className="form-group"><label htmlFor="style">设计风格</label><select id="style" name="style" value={formData.style} onChange={handleInputChange}>{styleOptions.map(v => <option key={v} value={v}>{v || '选择风格'}</option>)}</select></div>
              <div className="form-group"><label htmlFor="color">主要颜色</label><select id="color" name="color" value={formData.color} onChange={handleInputChange}>{colorOptions.map(v => <option key={v} value={v}>{v || '选择颜色'}</option>)}</select></div>
            </div>
            <div className="form-group"><label htmlFor="model">AI模型</label><select id="model" name="model" value={formData.model} onChange={handleInputChange}>{modelOptions.map(v => <option key={v} value={v}>{v === 'doubao' ? '豆包 AI' : '谷歌 AI'}</option>)}</select></div>
            <button type="submit" className="generate-btn" disabled={isGenerating || !formData.description.trim()}>{isGenerating ? '生成中...' : '生成设计'}</button>
          </form>
        </div>
        <div className="preview-area">
          <h2>设计预览</h2>
          <div className="preview-container">
            {isGenerating ? (
              <div className="loading"><div className="loading-spinner"></div><p>AI正在为您生成设计...</p></div>
            ) : generatedImage ? (
              <div className="generated-image"><img src={generatedImage} alt="生成的服装设计" /><div className="image-actions"><button className="download-btn" onClick={handleDownload}>下载图片</button><button className="regenerate-btn" onClick={handleSubmit}>重新生成</button></div></div>
            ) : (
              <div className="placeholder"><div className="placeholder-icon">👗</div><p>请填写设计参数并点击生成</p></div>
            )}
          </div>
        </div>
      </div>
      {designs.length > 0 && (
        <div className="design-history"><h2>设计历史</h2><div className="history-grid">{designs.map((d, i) => (<div key={d.id || i} className="history-item"><img src={d.image_url} alt={d.description} /><div className="history-info"><p className="history-desc">{d.description}</p><div className="history-meta"><span className="history-style">{d.style}</span><span className="history-color">{d.color}</span><span className="history-model">{d.model}</span></div></div></div>))}</div></div>
      )}
    </div>
  )
}