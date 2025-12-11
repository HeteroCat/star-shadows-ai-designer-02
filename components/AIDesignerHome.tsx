'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MainFooter from '@/components/MainFooter'

export default function AIDesignerHome() {
  const [activeTab, setActiveTab] = useState('clothing')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const router = useRouter()

  const slides = [
    { id: 1, title: 'AI服装设计', description: '智能分析时尚趋势，为您定制专属服装设计方案', image: '/pic/AI服装.png', category: 'clothing' },
  ]

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)
  const goToSlide = (i: number) => setCurrentSlide(i)
  const toggleFaq = (i: number) => setActiveFaq(activeFaq === i ? null : i)

  return (
    <div className="ai-designer-home">
      <main className="main-content">
        <section className="hero-section fade-in-section">
          <div className="hero-inner">
            <div className="hero-content">
              <h1 className="hero-title">StarShadows<br />AI设计师</h1>
              <p className="hero-subtitle">利用人工智能技术，为您提供专业的服装设计服务。让创意与科技完美融合，打造独一无二的时尚作品。</p>
              <div className="hero-buttons">
                <Link href="/clothing" className="btn-hero btn-primary">开始设计</Link>
                <Link href="/gallery" className="btn-hero btn-secondary">作品模板</Link>
              </div>
            </div>

            <div className="hero-carousel">
              <div className="carousel-container">
                <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {slides.map((slide) => (
                    <div key={slide.id} className="carousel-slide">
                      <div className="slide-image">
                        <img src={slide.image} alt={slide.title} />
                      </div>
                      <div className="slide-content">
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                        <button
                          className="slide-btn"
                          onClick={() => router.push(`/${slide.category}`)}
                        >了解更多</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>&#8249;</button>
                <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>&#8250;</button>
                <div className="carousel-indicators">
                  {slides.map((_, idx) => (
                    <button key={idx} className={`indicator ${idx === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(idx)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="editors-pick-section fade-in-section fade-in-delay-1">
          <div className="section-header">
            <h2 className="section-title">编辑推荐 Editor's Pick</h2>
            <button onClick={() => router.push('/gallery')} className="view-more">查看更多</button>
          </div>
          <div className="editors-pick-grid">
            <div className="pick-card large">
              <div className="card-image"><img src="/ai-clothing-1759820351648.png" alt="AI服装设计" /></div>
              <div className="card-overlay"></div>
            </div>
            <div className="pick-card"><div className="card-image"><img src="/ai-clothing-1759782798985.png" alt="时尚服装" /></div><div className="card-overlay"></div></div>
            <div className="pick-card"><div className="card-image"><img src="/ai-clothing-1759820596963.png" alt="创意服装" /></div><div className="card-overlay"></div></div>
            <div className="pick-card"><div className="card-image"><img src="/ai-clothing-1759820596963.png" alt="现代服装" /></div><div className="card-overlay"></div></div>
            <div className="start-creating-card"><div className="creating-content"><h3>Join Club</h3><p>加入我们的俱乐部</p><button className="btn-start-creating" onClick={() => setShowQRCode(true)}>立即加入</button></div></div>
          </div>
        </section>

        <section className="news-section fade-in-section fade-in-delay-3">
          <div className="section-header"><h2 className="section-title">最新资讯 Latest News</h2></div>
          <div className="news-container">
            <div className="news-card featured"><div className="news-image"><img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="2025春夏时尚趋势" /></div><div className="news-content"><div className="news-meta"><span className="news-category">时尚趋势</span><span className="news-date">2025-01-15</span></div><h3>2025春夏时尚趋势：AI设计引领未来</h3><p>探索人工智能如何重新定义时尚设计，从概念到成品的全新创作流程正在改变整个行业...</p><a href="#" className="read-more" onClick={(e) => e.preventDefault()}>阅读更多 →</a></div></div>
            <div className="news-grid">
              <div className="news-card"><div className="news-image"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="服装设计技巧" /></div><div className="news-content"><div className="news-meta"><span className="news-category">设计技巧</span><span className="news-date">2025-01-12</span></div><h3>AI服装设计中的色彩搭配原理</h3><p>了解如何运用AI技术进行色彩分析，创造出令人惊艳的服装作品...</p><a href="#" className="read-more" onClick={(e) => e.preventDefault()}>阅读更多 →</a></div></div>
              <div className="news-card"><div className="news-image"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="服装趋势" /></div><div className="news-content"><div className="news-meta"><span className="news-category">时尚趋势</span><span className="news-date">2025-01-10</span></div><h3>2025年服装设计流行趋势预测</h3><p>AI分析全球时尚数据，预测未来一年的服装设计流行趋势...</p><a href="#" className="read-more" onClick={(e) => e.preventDefault()}>阅读更多 →</a></div></div>
              <div className="news-card"><div className="news-image"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="可持续时尚" /></div><div className="news-content"><div className="news-meta"><span className="news-category">可持续发展</span><span className="news-date">2025-01-08</span></div><h3>可持续时尚：环保材料的创新应用</h3><p>探索如何在保持美观的同时，选择对环境友好的材料和工艺...</p><a href="#" className="read-more" onClick={(e) => e.preventDefault()}>阅读更多 →</a></div></div>
            </div>
          </div>
        </section>

        <section className="faq-section fade-in-section fade-in-delay-4">
          <div className="section-header"><h2 className="section-title">常见问题 FAQ</h2></div>
          <div className="faq-container">
            {[
              {
                question: 'AI设计的质量如何保证？',
                answer: '我们的AI系统经过大量专业设计数据训练，能够生成高质量的服装设计作品。系统支持多次迭代优化，您可以通过调整描述词、选择不同风格模板来达到理想效果。同时，我们还提供专业设计指导，帮助您获得最佳设计方案。'
              },
              {
                question: '设计周期需要多长时间？',
                answer: 'AI设计生成非常快速，通常在30秒到2分钟内即可完成一次设计生成。如果需要对结果进行调整优化，整个过程一般在10-30分钟内可以完成满意的设计作品。相比传统设计流程，AI设计效率提升10倍以上。'
              },
              {
                question: '支持哪些设计类型？',
                answer: '目前主要支持服装设计，包括但不限于：连衣裙、衬衫、外套、裤装、裙装等各种服装类型。风格涵盖日常休闲、商务正装、晚礼服、运动装、民族风等多种风格。未来还将扩展到配饰、鞋帽等更多时尚设计领域。'
              },
              {
                question: '价格如何计算？',
                answer: '我们提供灵活的定价方案：基础套餐免费使用，包含每月10次生成机会；专业套餐99元/月，支持无限生成和高级功能；企业套餐提供定制化报价。具体价格请参考定价页面，我们也会定期推出优惠活动。'
              },
              {
                question: '设计版权归谁所有？',
                answer: '根据我们的服务条款，通过AI生成的设计作品，您拥有完整的著作权和使用权，包括商业用途。您可以自由使用、修改、分享这些设计作品。我们不会对您的创作设置任何限制，但请确保遵守相关法律法规。'
              },
              {
                question: '如何开始设计项目？',
                answer: '开始使用非常简单：1）注册账户并登录；2）进入AI服装设计页面；3）输入您的设计描述和要求；4）选择风格模板；5）点击生成按钮；6）查看结果并进行优化调整。整个过程直观易用，即使没有设计经验也能快速上手。'
              }
            ].map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(idx)}>
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">{activeFaq === idx ? '-' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <div className="section-header"><h2 className="section-title">联系我们 Contact US</h2></div>
          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-card"><div className="contact-icon"></div><h3>电话咨询</h3><p>400-888-9999</p><span>工作日 9:00-18:00</span></div>
              <div className="contact-card"><div className="contact-icon"></div><h3>邮箱联系</h3><p>contact@starshadows.ai</p><span>24小时内回复</span></div>
              <div className="contact-card"><div className="contact-icon"></div><h3>公司地址</h3><p>深圳市龙岗区双子塔大厦</p><span>欢迎预约参观</span></div>
              <div className="contact-card"><div className="contact-icon"></div><h3>在线客服</h3><p>即时聊天支持</p><button className="chat-button">开始对话</button></div>
            </div>
            <div className="contact-form"><h3>发送消息</h3><form><div className="form-row"><input type="text" placeholder="您的姓名" required /><input type="email" placeholder="邮箱地址" required /></div><input type="text" placeholder="主题" required /><textarea placeholder="请描述您的需求或问题..." rows={5} required></textarea><button type="submit" className="submit-button">发送消息</button></form></div>
          </div>
        </section>

      </main>

      {showQRCode && (
        <div className="qr-modal-overlay" onClick={() => setShowQRCode(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qr-modal-header"><h3>扫描二维码加入俱乐部</h3></div>
            <div className="qr-modal-content"><div className="qr-code-container"><img src="/club.png" alt="加入俱乐部二维码" className="qr-code-image" /></div></div>
          </div>
        </div>
      )}

      <MainFooter />
    </div>
  )
}