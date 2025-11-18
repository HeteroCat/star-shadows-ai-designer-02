'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AIDesignerHome() {
  const [activeTab, setActiveTab] = useState('clothing')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const router = useRouter()

  const slides = [
    { id: 1, title: 'AI服装设计', description: '智能分析时尚趋势，为您定制专属服装设计方案', image: '/pic/AI服装.png', category: 'clothing' },
    { id: 2, title: 'AI珠宝设计', description: '运用AI算法生成独特珠宝设计，结合传统工艺与现代美学', image: '/pic/ai-jewelry-1759821162005.png', category: 'jewelry' },
    { id: 3, title: 'AI美妆设计', description: '基于面部特征分析，提供个性化美妆方案', image: '/pic/AI美妆.png', category: 'makeup' },
  ]

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)
  const goToSlide = (i: number) => setCurrentSlide(i)
  const toggleFaq = (i: number) => setActiveFaq(activeFaq === i ? null : i)

  return (
    <div className="ai-designer-home">
      <header className="header">
        <div className="logo">
          <a href="#" onClick={(e) => e.preventDefault()}>StarShadows.AI</a>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><Link href="/">首页</Link></li>
            <li><Link href="/clothing">AI服装</Link></li>
            <li><Link href="/jewelry">AI珠宝</Link></li>
            <li><Link href="/makeup">AI美妆</Link></li>
            <li><Link href="/gallery">作品广场</Link></li>
          </ul>
        </nav>
        <div className="user-actions">
          <a href="#" className="btn" onClick={(e) => e.preventDefault()}>登录</a>
          <a href="#" className="btn btn-primary" onClick={(e) => e.preventDefault()}>注册</a>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-content">
              <h1 className="hero-title">StarShadows<br/>AI设计师</h1>
              <p className="hero-subtitle">利用人工智能技术，为您提供专业的服装、珠宝、美妆服务。让创意与科技完美融合打造独一无二的时尚作品。</p>
              <div className="hero-buttons">
                <Link href="/clothing" className="btn-hero btn-primary">开始设计</Link>
                <Link href="/gallery" className="btn-hero btn-secondary">查看作品</Link>
              </div>
            </div>

            <div className="hero-carousel">
              <div className="carousel-container">
                <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}>
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

        <section className="editors-pick-section">
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
            <div className="pick-card"><div className="card-image"><img src="/ai-jewelry-1759821030024.png" alt="珠宝设计" /></div><div className="card-overlay"></div></div>
            <div className="start-creating-card"><div className="creating-content"><h3>Join Club</h3><p>加入我们的俱乐部</p><button className="btn-start-creating" onClick={() => setShowQRCode(true)}>立即加入</button></div></div>
          </div>
        </section>

        <section className="hot-pick-section">
          <div className="section-header">
            <h2 className="section-title">热门作品 Hot Pick</h2>
            <button onClick={() => router.push('/gallery')} className="view-more">查看更多</button>
          </div>
          <div className="hot-pick-grid">
            <div className="hot-card large"><div className="card-image"><img src="/ai-jewelry-1759821162005.png" alt="精美珠宝" /></div><div className="card-overlay"></div></div>
            <div className="hot-card"><div className="card-image"><img src="/ai-makeup-1759821408698.png" alt="美妆设计" /></div><div className="card-overlay"></div></div>
            <div className="hot-card"><div className="card-image"><img src="/ai-makeup-1759821523121.png" alt="时尚美妆" /></div><div className="card-overlay"></div></div>
            <div className="hot-card"><div className="card-image"><img src="/ai-makeup-1759821665676.png" alt="创意美妆" /></div><div className="card-overlay"></div></div>
            <div className="start-creating-card"><div className="creating-content"><h3>Start Creating</h3><p>探索更多可能性</p><button className="btn-start-creating" onClick={() => router.push('/clothing')}>开始创作</button></div></div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">三大AI功能 Our AI Services</h2>
          </div>
          <div className="ai-services-grid">
            <div className="ai-service-card">
              <div className="ai-service-image"><img src="/ai-clothing-1759820596963.png" alt="AI服装设计" /></div>
              <div className="ai-service-content">
                <h3>AI服装设计</h3>
                <p>运用先进的人工智能技术，为您量身定制独特的服装设计方案。从概念到成品，AI助您实现时尚梦想。</p>
                <div className="service-features"><span className="feature-tag">智能搭配</span><span className="feature-tag">风格定制</span><span className="feature-tag">快速生成</span></div>
              </div>
            </div>
            <div className="ai-service-card">
              <div className="ai-service-image"><img src="/ai-jewelry-1759821162005.png" alt="AI珠宝设计" /></div>
              <div className="ai-service-content">
                <h3>AI珠宝设计</h3>
                <p>精美绝伦的珠宝设计，由AI技术驱动。从经典到现代，从简约到奢华，为您打造专属的珠宝艺术品。</p>
                <div className="service-features"><span className="feature-tag">精工细作</span><span className="feature-tag">个性定制</span><span className="feature-tag">艺术创新</span></div>
              </div>
            </div>
            <div className="ai-service-card">
              <div className="ai-service-image"><img src="/ai-makeup-1759821523121.png" alt="AI美妆设计" /></div>
              <div className="ai-service-content">
                <h3>AI美妆设计</h3>
                <p>智能美妆方案，让每一次妆容都成为艺术。AI分析面部特征，为您推荐最适合的妆容风格和产品搭配。</p>
                <div className="service-features"><span className="feature-tag">面部分析</span><span className="feature-tag">妆容推荐</span><span className="feature-tag">色彩搭配</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-header"><h2 className="section-title">用户评价 Testimonials</h2></div>
          <div className="testimonials-grid">
            <div className="testimonial-card"><div className="testimonial-content"><div className="quote-icon">"</div><p>"Star Shadows的AI设计服务真的让我惊艳！作为一个时尚博主，我经常需要独特的服装设计灵感。这个平台不仅提供了创新的设计方案，还能根据我的个人风格进行定制。强烈推荐！"</p></div><div className="testimonial-author"><div className="author-avatar"><img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20young%20asian%20woman%2C%20fashion%20blogger%2C%20elegant%20style&image_size=square" alt="李小雅" /></div><div className="author-info"><div className="author-name">李小雅</div><div className="author-title">时尚博主</div></div></div></div>
            <div className="testimonial-card"><div className="testimonial-content"><div className="quote-icon">"</div><p>"作为珠宝设计师，我一直在寻找新的创作灵感。Star Shadows的AI珠宝设计功能给了我很多意想不到的创意。特别是3D预览功能，让我能够在制作前就看到最终效果。"</p></div><div className="testimonial-author"><div className="author-avatar"><img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20middle-aged%20man%2C%20jewelry%20designer%2C%20creative%20artist&image_size=square" alt="王大明" /></div><div className="author-info"><div className="author-name">王大明</div><div className="author-title">珠宝设计师</div></div></div></div>
            <div className="testimonial-card"><div className="testimonial-content"><div className="quote-icon">"</div><p>"我是一名美妆师，经常需要为客户设计独特的妆容。Star Shadows的AI美妆设计帮助我快速生成创意方案，大大提高了我的工作效率。客户们都很满意！"</p></div><div className="testimonial-author"><div className="author-avatar"><img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20young%20woman%2C%20makeup%20artist%2C%20beauty%20professional&image_size=square" alt="张美丽" /></div><div className="author-info"><div className="author-name">张美丽</div><div className="author-title">专业美妆师</div></div></div></div>
          </div>
        </section>

        <section className="news-section">
          <div className="section-header"><h2 className="section-title">最新资讯 Latest News</h2></div>
          <div className="news-container">
            <div className="news-card featured"><div className="news-image"><img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="2024春夏时尚趋势" /></div><div className="news-content"><div className="news-meta"><span className="news-category">时尚趋势</span><span className="news-date">2024-01-15</span></div><h3>2024春夏时尚趋势：AI设计引领未来</h3><p>探索人工智能如何重新定义时尚设计，从概念到成品的全新创作流程正在改变整个行业...</p><a href="#" className="read-more" onClick={(e) => e.preventDefault()}>阅读更多 →</a></div></div>
            <div className="news-grid">
              <div className="news-card"><div className="news-image"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="珠宝设计技巧" /></div><div className="news-content"><div className="news-meta"><span className="news-category">设计技巧</span><span className="news-date">2024-01-12</span></div><h3>珠宝设计中的黄金比例运用</h3><p>了解如何在珠宝设计中运用数学美学，创造出令人惊艳的作品...</p><a href="#" className="read-more" onClick={(e) => e.preventDefault()}>阅读更多 →</a></div></div>
              <div className="news-card"><div className="news-image"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="彩妆趋势" /></div><div className="news-content"><div className="news-meta"><span className="news-category">美妆趋势</span><span className="news-date">2024-01-10</span></div><h3>个性化彩妆：AI定制你的专属妆容</h3><p>通过面部识别和色彩分析，为每个人量身定制最适合的妆容方案...</p><a href="#" className="read-more" onClick={(e) => e.preventDefault()}>阅读更多 →</a></div></div>
              <div className="news-card"><div className="news-image"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="可持续时尚" /></div><div className="news-content"><div className="news-meta"><span className="news-category">可持续发展</span><span className="news-date">2024-01-08</span></div><h3>可持续时尚：环保材料的创新应用</h3><p>探索如何在保持美观的同时，选择对环境友好的材料和工艺...</p><a href="#" className="read-more" onClick={(e) => e.preventDefault()}>阅读更多 →</a></div></div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="section-header"><h2 className="section-title">常见问题 FAQ</h2></div>
          <div className="faq-container">
            {[ 'AI设计的质量如何保证？', '设计周期需要多长时间？', '支持哪些设计类型？', '价格如何计算？', '设计版权归谁所有？', '如何开始设计项目？' ].map((q, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(idx)}><h3>{q}</h3><span className="faq-toggle">+</span></div>
                <div className="faq-answer"><p>更多详情请联系在线客服或查看使用教程。</p></div>
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

        <section className="pricing-section">
          <div className="section-header">
            <h2 className="section-title">价格档位 Pricing Plans</h2>
          </div>
          <div className="pricing-container">
            <div className="pricing-card basic">
              <div className="pricing-header"><h3>基础设计套餐</h3><div className="price"><span className="currency">¥</span><span className="amount">29</span><span className="period">起</span></div></div>
              <div className="pricing-features"><ul><li>AI智能设计方案生成</li><li>基础风格定制</li><li>2次免费修改</li><li>高清效果图输出</li><li>7天交付周期</li></ul></div>
              <button className="pricing-btn">选择套餐</button>
            </div>
            <div className="pricing-card premium">
              <div className="pricing-header"><h3>高级设计套餐</h3><div className="price"><span className="currency">¥</span><span className="amount">1999</span><span className="period">起</span></div></div>
              <div className="pricing-features"><ul><li>专业AI设计师一对一服务</li><li>多风格方案对比</li><li>无限次修改</li><li>3D建模与渲染</li><li>技术规格文档</li><li>3天快速交付</li><li>专属客服支持</li></ul></div>
              <button className="pricing-btn">选择套餐</button>
            </div>
            <div className="pricing-card enterprise">
              <div className="pricing-header"><h3>企业合作</h3><div className="price"><span className="custom-price">定制报价</span></div></div>
              <div className="pricing-features"><ul><li>批量设计服务</li><li>品牌定制化方案</li><li>专业团队支持</li><li>灵活交付时间</li><li>长期合作优惠</li></ul></div>
              <div className="pricing-note"><p>具体价格根据设计复杂度、修改次数、交付时间等因素确定</p></div>
              <button className="pricing-btn">联系我们</button>
            </div>
          </div>
        </section>

        <footer className="footer-section">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-brand">
                <h3>星流图影.AI</h3>
                <p>专业的AI设计平台，为您提供智能化的设计解决方案。让创意与技术完美融合，打造独一无二的、符合市场的设计作品。</p>
              </div>
              <div className="footer-links">
                <div className="footer-column"><h4>产品服务</h4><ul><li><Link href="/clothing">AI服装</Link></li><li><Link href="/jewelry">AI珠宝</Link></li><li><Link href="/makeup">AI美妆</Link></li></ul></div>
                <div className="footer-column"><h4>支持帮助</h4><ul><li><a href="#">使用教程</a></li><li><a href="#">常见问题</a></li><li><a href="#">技术支持</a></li><li><a href="#">联系客服</a></li><li><a href="#">意见反馈</a></li></ul></div>
                <div className="footer-column"><h4>关于我们</h4><ul><li><a href="#">公司介绍</a></li><li><a href="#">发展历程</a></li><li><a href="#">加入我们</a></li></ul></div>
              </div>
            </div>
            <div className="footer-bottom"><div className="footer-bottom-content"><div className="copyright"><p>&copy; 2024 AI Designer. 保留所有权利。</p></div><div className="footer-bottom-links"><a href="#">隐私政策</a><a href="#">服务条款</a><a href="#">Cookie政策</a><a href="#">法律声明</a></div></div></div>
          </div>
        </footer>
      </main>

      {showQRCode && (
        <div className="qr-modal-overlay" onClick={() => setShowQRCode(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qr-modal-header"><h3>扫描二维码加入俱乐部</h3><button className="qr-modal-close" onClick={() => setShowQRCode(false)}>×</button></div>
            <div className="qr-modal-content"><div className="qr-code-container"><img src="/club.png" alt="加入俱乐部二维码" className="qr-code-image" /></div></div>
          </div>
        </div>
      )}
    </div>
  )
}