'use client'
import { useState } from 'react'
import Header from '@/components/Header'

export default function AIMakeup() {
  const [formData, setFormData] = useState({ description: '', style: '', occasion: '', skinTone: '', model: 'doubao' })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [designs, setDesigns] = useState<any[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!formData.description.trim()) return alert('请输入设计描述')
    setIsGenerating(true); setGeneratedImage(null)
    try {
      const res = await fetch('/api/designs', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'makeup', description: formData.description, style: formData.style, color: `${formData.occasion} ${formData.skinTone}`, model: formData.model })
      })
      if (!res.ok) throw new Error('生成失败')
      const result = await res.json(); setGeneratedImage(result.image_url); setDesigns(prev => [result, ...prev])
    } catch { alert('生成失败，请重试') } finally { setIsGenerating(false) }
  }

  const handleDownload = async () => {
    if (!generatedImage) return alert('请先生成图片')
    const res = await fetch('/api/download-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: generatedImage }) })
    if (!res.ok) return alert('下载失败，请重试')
    const blob = await res.blob(); const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `ai-makeup-${Date.now()}.png`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  const styleOptions = ['', '自然清新', '优雅经典', '时尚前卫', '复古怀旧', '甜美可爱', '性感魅惑', '艺术创意']
  const occasionOptions = ['', '日常生活', '职场商务', '约会聚会', '婚礼庆典', '晚宴派对', '舞台表演', '摄影拍照']
  const skinToneOptions = ['', '冷白皮', '暖白皮', '自然肤色', '小麦色', '深色肌肤']
  const modelOptions = ['doubao', 'google']

  return (
    <div className="ai-makeup">
      <Header />
      <div className="makeup-header"><h1>AI美妆设计</h1></div>
      <div className="makeup-container">
        <div className="design-form">
          <h2>设计参数</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label htmlFor="description">设计描述</label><textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="请描述您想要的美妆效果，例如：一个精致的烟熏妆，突出眼部轮廓..." rows={4} required /></div>
            <div className="form-row">
              <div className="form-group"><label htmlFor="style">妆容风格</label><select id="style" name="style" value={formData.style} onChange={handleInputChange}>{styleOptions.map(v => <option key={v} value={v}>{v || '选择风格'}</option>)}</select></div>
              <div className="form-group"><label htmlFor="occasion">适用场合</label><select id="occasion" name="occasion" value={formData.occasion} onChange={handleInputChange}>{occasionOptions.map(v => <option key={v} value={v}>{v || '选择场合'}</option>)}</select></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label htmlFor="skinTone">肤色类型</label><select id="skinTone" name="skinTone" value={formData.skinTone} onChange={handleInputChange}>{skinToneOptions.map(v => <option key={v} value={v}>{v || '选择肤色'}</option>)}</select></div>
              <div className="form-group"><label htmlFor="model">AI模型</label><select id="model" name="model" value={formData.model} onChange={handleInputChange}>{modelOptions.map(v => <option key={v} value={v}>{v === 'doubao' ? '豆包 AI' : '谷歌 AI'}</option>)}</select></div>
            </div>
            <button type="submit" className="generate-btn" disabled={isGenerating || !formData.description.trim()}>{isGenerating ? '生成中...' : '生成设计'}</button>
          </form>
        </div>
        <div className="preview-area"><h2>设计预览</h2><div className="preview-container">{isGenerating ? (<div className="loading"><div className="loading-spinner"></div><p>AI正在为您生成设计...</p></div>) : generatedImage ? (<div className="generated-image"><img src={generatedImage} alt="生成的美妆设计" /><div className="image-actions"><button className="download-btn" onClick={handleDownload}>下载图片</button><button className="regenerate-btn" onClick={handleSubmit}>重新生成</button></div></div>) : (<div className="placeholder"><div className="placeholder-icon">💄</div><p>请填写设计参数并点击生成</p></div>)}</div></div>
      </div>
      {designs.length > 0 && (<div className="design-history"><h2>设计历史</h2><div className="history-grid">{designs.map((d, i) => (<div key={d.id || i} className="history-item"><img src={d.image_url} alt={d.description} /><div className="history-info"><p className="history-desc">{d.description}</p><div className="history-meta"><span className="history-style">{d.style}</span><span className="history-occasion">{formData.occasion}</span><span className="history-skin">{formData.skinTone}</span><span className="history-model">{d.model}</span></div></div></div>))}</div></div>)}
    </div>
  )
}