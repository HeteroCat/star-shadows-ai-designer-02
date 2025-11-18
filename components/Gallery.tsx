'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

export default function Gallery() {
  const [images, setImages] = useState<{ id: number; src: string; title: string; description: string; category: string; height: number }[]>([])
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const shuffleArray = (arr: any[]) => {
    const s = [...arr]
    for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]] }
    return s
  }

  const getImageList = async () => {
    try { const res = await fetch('/api/images'); if (res.ok) return await res.json() } catch {}
    return []
  }

  useEffect(() => { (async () => {
    const list = await getImageList()
    const shuffled = shuffleArray(list)
    const data = shuffled.map((filename: string, index: number) => ({ id: index + 1, src: `/pic/${filename}`, title: filename.split('-')[1] || filename.split('.')[0], description: `AI生成作品 - ${filename.includes('clothing') ? 'AI服装设计' : filename.includes('jewelry') ? 'AI珠宝设计' : filename.includes('makeup') ? 'AI美妆设计' : '设计作品'}`, category: filename.includes('clothing') ? 'AI服装设计' : filename.includes('jewelry') ? 'AI珠宝设计' : filename.includes('makeup') ? 'AI美妆设计' : '设计作品', height: Math.floor(Math.random() * 200) + 250 }))
    setImages(data); setLoading(false)
  })() }, [])

  const handleDownload = async (image: any) => {
    if (!image) return
    if (image.src.startsWith('/pic/')) { const a = document.createElement('a'); a.href = image.src; a.download = `${image.title}-${Date.now()}.${image.src.split('.').pop()}`; document.body.appendChild(a); a.click(); document.body.removeChild(a); return }
    const res = await fetch('/api/download-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: image.src }) })
    if (!res.ok) return alert('下载失败')
    const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${image.title}-${Date.now()}.png`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  if (loading) return (<div className="gallery-loading"><div className="loading-spinner"></div><p>正在加载作品...</p></div>)

  return (
    <div className="gallery-container">
      <Header />
      <div className="gallery-page-header"><h1 className="gallery-title">作品广场</h1><div className="gallery-stats"><span>{images.length} 件作品</span></div></div>
      <main className="gallery-main"><div className="masonry-grid">{images.map((image) => (<div key={image.id} className="masonry-item" onClick={() => setSelectedImage(image)}><div className="image-card"><div className="image-wrapper"><img src={image.src} alt={image.title} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = '/favicon.ico' }} /><div className="image-overlay"><div className="overlay-content"><span className="category-tag">{image.category}</span></div></div></div></div></div>))}</div></main>
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <div className="modal-image"><img src={selectedImage.src} alt={selectedImage.title} /></div>
            <div className="modal-info"><h2>{selectedImage.title}</h2><p>{selectedImage.description}</p><div className="modal-meta"><span className="category">{selectedImage.category}</span><div className="modal-actions"><button className="action-btn">收藏</button><button className="action-btn" onClick={() => handleDownload(selectedImage)}>下载</button></div></div></div>
          </div>
        </div>
      )}
    </div>
  )
}