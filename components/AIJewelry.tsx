'use client'
import { useState } from 'react'
import Header from '@/components/Header'

export default function AIJewelry() {
  const [formData, setFormData] = useState({
    description: '',
    style: '',
    material: '',
    gemstone: '',
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
        type: 'jewelry',
        description: formData.description,
        style: formData.style,
        color: `${formData.material} ${formData.gemstone}`,
        model: formData.model
      }

      // 根据模式选择不同的API端点
      let apiUrl = '/api/designs'

      if (formData.uploadedImages.length > 0) {
        // 有上传图片时，使用 generate-image API
        apiUrl = '/api/generate-image'
        requestBody = {
          mode: 'maximages',
          prompt: `${formData.description} ${formData.style ? `风格：${formData.style}` : ''} ${formData.material ? `材质：${formData.material}` : ''} ${formData.gemstone ? `宝石：${formData.gemstone}` : ''} 精美珠宝设计，闪亮光泽，奢华质感`,
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
        console.error('珠宝设计生成失败:', errorData)
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
    const a = document.createElement('a'); a.href = url; a.download = `ai-jewelry-${Date.now()}.png`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
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
    a.download = `ai-jewelry-history-${Date.now()}.png`
    document.body.appendChild(a)
    a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const styleOptions = ['', '经典优雅', '现代简约', '复古华丽', '民族风情', '前卫艺术', '自然有机', '几何抽象']
  const materialOptions = ['', '黄金', '白金', '玫瑰金', '银', '钛金', '不锈钢', '陶瓷']
  const gemstoneOptions = ['', '钻石', '红宝石', '蓝宝石', '祖母绿', '珍珠', '翡翠', '紫水晶', '海蓝宝石', '无宝石']
  const modelOptions = [
    { value: 'doubao-seedream-4-0-250828', label: '豆包 Seedream 4.0' },
    { value: 'nano-banana', label: 'Nano Banana' }
  ]

  return (
    <div className="ai-jewelry">
      <Header />
      <div className="jewelry-header"><h1>AI珠宝设计</h1></div>
      <div className="jewelry-container">
        <div className="design-form">
          <h2>设计参数</h2>

          {/* 快捷提示词按钮 */}
          <div className="prompt-shortcuts">
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '精致的钻石订婚戒指，铂金戒托，中央镶嵌1克拉圆形钻石，周围环绕小钻，简约优雅的六爪镶嵌设计' }))}>
              钻石戒指
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '奢华的红宝石项链，18K黄金链条，主石为椭圆形红宝石，周围镶嵌钻石，展现高贵气质' }))}>
              红宝石项链
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '时尚的珍珠耳环，925银耳钩，天然淡水珍珠，简约设计，适合日常佩戴，展现优雅气质' }))}>
              珍珠耳环
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '复古风格的翡翠手镯，天然A货翡翠，圆润饱满，色泽翠绿，内圈抛光细腻，传统中式设计' }))}>
              翡翠手镯
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '现代几何风格胸针，玫瑰金材质，镶嵌蓝宝石和钻石，抽象几何图案，展现艺术感和时尚感' }))}>
              几何胸针
            </button>
            <button type="button" className="prompt-btn" onClick={() => setFormData(prev => ({ ...prev, description: '精美的紫水晶吊坠，纯银镶嵌，水滴形紫水晶主石，周围环绕小钻，配银链，神秘优雅' }))}>
              紫水晶吊坠
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
                placeholder="请描述您想要的珠宝设计，或点击上方快捷按钮..."
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
                <label htmlFor="style">设计风格</label>
                <select id="style" name="style" value={formData.style} onChange={handleInputChange}>
                  {styleOptions.map(v => <option key={v} value={v}>{v || '选择风格'}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="material">主要材质</label>
                <select id="material" name="material" value={formData.material} onChange={handleInputChange}>
                  {materialOptions.map(v => <option key={v} value={v}>{v || '选择材质'}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label htmlFor="gemstone">宝石类型</label><select id="gemstone" name="gemstone" value={formData.gemstone} onChange={handleInputChange}>{gemstoneOptions.map(v => <option key={v} value={v}>{v || '选择宝石'}</option>)}</select></div>
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
        <div className="preview-area"><h2>设计预览</h2><div className="preview-container">{isGenerating ? (<div className="loading"><div className="loading-spinner"></div><p>AI正在为您生成设计...</p></div>) : generatedImage ? (<div className="generated-image"><img src={generatedImage} alt="生成的珠宝设计" /><div className="image-actions"><button className="download-btn" onClick={handleDownload}>下载图片</button><button className="regenerate-btn" onClick={handleSubmit}>重新生成</button></div></div>) : (<div className="placeholder"><div className="placeholder-icon">💎</div><p>请填写设计参数并点击生成</p></div>)}</div></div>
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
                    <h4>设计风格</h4>
                    <p>{selectedHistory.style}</p>
                  </div>
                )}
                {selectedHistory.color && (
                  <div className="history-modal-section">
                    <h4>材质与宝石</h4>
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