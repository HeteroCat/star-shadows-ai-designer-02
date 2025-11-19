'use client'
import { useState } from 'react'
import Header from '@/components/Header'

export default function AIMakeup() {
  const [formData, setFormData] = useState({
    description: '',
    style: '',
    occasion: '',
    skinTone: '',
    model: 'doubao-seedream-4-0-250828',
    mode: 't2i',
    uploadedImages: [] as string[]
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [designs, setDesigns] = useState<any[]>([])
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const imagePromises = Array.from(files).map(async (file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          // 移除 data:image/...;base64, 前缀，只保留 base64 数据
          const base64Data = result.split(',')[1]
          resolve(base64Data)
        }
        reader.readAsDataURL(file)
      })
    })

    try {
      const uploadedImages = await Promise.all(imagePromises)
      setFormData(prev => ({
        ...prev,
        uploadedImages,
        mode: uploadedImages.length > 0 ? 'maximages' : 't2i'
      }))
    } catch (error) {
      console.error('图片上传失败:', error)
      alert('图片上传失败，请重试')
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!formData.description.trim()) return alert('请输入设计描述')
    setIsGenerating(true)
    setGeneratedImage(null)
    try {
      let requestBody: any = {
        type: 'makeup',
        description: formData.description,
        style: formData.style,
        color: `${formData.occasion} ${formData.skinTone}`,
        model: formData.model
      }

      // 根据模式选择不同的API端点
      let apiUrl = '/api/designs'

      if (formData.uploadedImages.length > 0) {
        // 有上传图片时，使用 generate-image API
        apiUrl = '/api/generate-image'
        requestBody = {
          mode: 'maximages',
          prompt: `${formData.description} ${formData.style ? `风格：${formData.style}` : ''} ${formData.occasion ? `场合：${formData.occasion}` : ''} ${formData.skinTone ? `肤色：${formData.skinTone}` : ''} 美妆造型设计，精致妆容，时尚美丽`,
          image: formData.uploadedImages,
          model: formData.model
        }
      }

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (res.ok) {
        const result = await res.json()
        setGeneratedImage(result.image_url)

        // 只在使用 designs API 时才更新设计列表
        if (apiUrl === '/api/designs') {
          setDesigns(prev => [result, ...prev])
        }
      } else {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.error || '生成失败，请重试'
        alert(errorMessage)
        console.error('美妆设计生成失败:', errorData)
      }
    } catch (error) {
      console.error('网络请求失败:', error)
      alert('网络连接失败，请检查网络连接后重试')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!generatedImage) return alert('请先生成图片')
    const res = await fetch('/api/download-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: generatedImage }) })
    if (!res.ok) return alert('下载失败，请重试')
    const blob = await res.blob(); const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `ai-makeup-${Date.now()}.png`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  const handleHistoryClick = (design: any) => {
    setSelectedHistory(design)
  }

  const handleHistoryDownload = async (imageUrl: string) => {
    const res = await fetch('/api/download-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: imageUrl }) })
    if (!res.ok) return alert('下载失败，请重试')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-makeup-history-${Date.now()}.png`
    document.body.appendChild(a)
    a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const styleOptions = ['', '自然清新', '优雅经典', '时尚前卫', '复古怀旧', '甜美可爱', '性感魅惑', '艺术创意']
  const occasionOptions = ['', '日常生活', '职场商务', '约会聚会', '婚礼庆典', '晚宴派对', '舞台表演', '摄影拍照']
  const skinToneOptions = ['', '冷白皮', '暖白皮', '自然肤色', '小麦色', '深色肌肤']
  const modelOptions = [
    { value: 'doubao-seedream-4-0-250828', label: '豆包 Seedream 4.0' },
    { value: 'nano-banana', label: 'Nano Banana' }
  ]

  return (
    <div className="ai-makeup">
      <Header />
      <div className="makeup-header"><h1>AI美妆设计</h1></div>
      <div className="makeup-container">
        <div className="design-form">
          <h2>设计参数</h2>

          {/* 快捷提示词按钮 */}
          <div className="prompt-shortcuts">
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '自然清新日常妆容，裸妆底妆，淡粉色腮红，自然眉形，豆沙色唇膏，突出好气色，适合日常上班' }))}>
              自然日常妆
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '性感烟熏妆，深邃眼妆，黑色眼线，浓密睫毛，高光修容，酒红色唇膏，展现魅惑气质' }))}>
              烟熏妆
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '甜美粉色系妆容，粉嫩底妆，樱花粉腮红，细长眼线，水润粉色唇彩，打造少女感' }))}>
              甜美粉妆
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '复古红唇妆容，哑光底妆，精致眼线，浓密睫毛，经典正红色唇膏，展现优雅复古气质' }))}>
              复古红唇
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '韩系清透妆容，水光肌底妆，自然眉毛，淡橘色眼影，咬唇妆，清新自然，展现少女感' }))}>
              韩系清透
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '欧美立体妆容，高光修容，深邃眼窝，浓密假睫毛，丰满唇形，展现立体五官和气场' }))}>
              欧美立体
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="description">设计描述</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="请描述您想要的美妆效果，或点击上方快捷按钮..."
                rows={4}
                required
              />
            </div>

            {/* 图片上传功能 */}
            <div className="form-group">
              <label htmlFor="images">参考图片（可选）</label>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <label htmlFor="images" className="file-upload-label">
                  <span className="upload-icon">📁</span>
                  <span>点击或拖拽上传图片</span>
                  <span className="upload-hint">支持 JPG、PNG 格式，可上传多张图片作为参考</span>
                </label>
              </div>

              {/* 已上传图片预览 */}
              {formData.uploadedImages.length > 0 && (
                <div className="uploaded-images">
                  <p className="uploaded-count">已上传 {formData.uploadedImages.length} 张图片</p>
                  <div className="image-preview-grid">
                    {formData.uploadedImages.map((image, index) => (
                      <div key={index} className="image-preview-item">
                        <img
                          src={`data:image/jpeg;base64,${image}`}
                          alt={`参考图片 ${index + 1}`}
                        />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              uploadedImages: prev.uploadedImages.filter((_, i) => i !== index),
                              mode: prev.uploadedImages.length <= 1 ? 't2i' : 'maximages'
                            }))
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="style">妆容风格</label>
                <select id="style" name="style" value={formData.style} onChange={handleInputChange}>
                  {styleOptions.map(v => <option key={v} value={v}>{v || '选择风格'}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="occasion">适用场合</label>
                <select id="occasion" name="occasion" value={formData.occasion} onChange={handleInputChange}>
                  {occasionOptions.map(v => <option key={v} value={v}>{v || '选择场合'}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label htmlFor="skinTone">肤色类型</label><select id="skinTone" name="skinTone" value={formData.skinTone} onChange={handleInputChange}>{skinToneOptions.map(v => <option key={v} value={v}>{v || '选择肤色'}</option>)}</select></div>
              <div className="form-group">
                <label htmlFor="model">AI模型</label>
                <select id="model" name="model" value={formData.model} onChange={handleInputChange}>
                  {modelOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="generate-btn" disabled={isGenerating || !formData.description.trim()}>{isGenerating ? '生成中...' : '生成设计'}</button>
          </form>
        </div>
        <div className="preview-area"><h2>设计预览</h2><div className="preview-container">{isGenerating ? (<div className="loading"><div className="loading-spinner"></div><p>AI正在为您生成设计...</p></div>) : generatedImage ? (<div className="generated-image"><img src={generatedImage} alt="生成的美妆设计" /><div className="image-actions"><button className="download-btn" onClick={handleDownload}>下载图片</button><button className="regenerate-btn" onClick={handleSubmit}>重新生成</button></div></div>) : (<div className="placeholder"><div className="placeholder-icon">💄</div><p>请填写设计参数并点击生成</p></div>)}</div></div>
      </div>

      {/* 设计历史 */}
      {designs.length > 0 && (
        <div className="design-history">
          <h2>设计历史</h2>
          <div className="history-grid">
            {designs.map((d, i) => (
              <div
                key={d.id || i}
                className="history-item"
                onClick={() => handleHistoryClick(d)}
                style={{ cursor: 'pointer' }}
              >
                <img src={d.image_url} alt={d.description} />
                <div className="history-info">
                  <p className="history-desc" title={d.description}>
                    {truncateText(d.description, 100)}
                  </p>
                  <div className="history-meta">
                    {d.style && <span className="history-style">{d.style}</span>}
                    {d.color && <span className="history-color">{truncateText(d.color, 30)}</span>}
                    {d.model && <span className="history-model">{truncateText(d.model, 20)}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 历史详情模态框 */}
      {selectedHistory && (
        <div
          className="history-modal-overlay"
          onClick={() => setSelectedHistory(null)}
        >
          <div
            className="history-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="history-modal-header">
              <h3>设计详情</h3>
              <button
                className="history-modal-close"
                onClick={() => setSelectedHistory(null)}
              >
                ×
              </button>
            </div>
            <div className="history-modal-content">
              <div className="history-modal-image">
                <img src={selectedHistory.image_url} alt={selectedHistory.description} />
              </div>
              <div className="history-modal-info">
                <div className="history-modal-section">
                  <h4>设计描述</h4>
                  <p>{selectedHistory.description}</p>
                </div>
                {selectedHistory.style && (
                  <div className="history-modal-section">
                    <h4>妆容风格</h4>
                    <p>{selectedHistory.style}</p>
                  </div>
                )}
                {selectedHistory.color && (
                  <div className="history-modal-section">
                    <h4>场合与肤色</h4>
                    <p>{selectedHistory.color}</p>
                  </div>
                )}
                {selectedHistory.model && (
                  <div className="history-modal-section">
                    <h4>AI模型</h4>
                    <p>{selectedHistory.model}</p>
                  </div>
                )}
                <button
                  className="history-download-btn"
                  onClick={() => handleHistoryDownload(selectedHistory.image_url)}
                >
                  下载图片
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}