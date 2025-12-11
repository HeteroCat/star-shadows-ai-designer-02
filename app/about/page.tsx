"use client"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "张明",
      position: "创始人 & CEO",
      description: "AI设计领域专家，拥有10年机器学习和时尚行业经验",
      avatar: "/api/placeholder/150/150"
    },
    {
      name: "李娜",
      position: "技术总监",
      description: "深度学习专家，专注于计算机视觉和生成式AI技术",
      avatar: "/api/placeholder/150/150"
    },
    {
      name: "王涛",
      position: "设计总监",
      description: "国际知名设计师，曾任职于多家顶级时尚品牌",
      avatar: "/api/placeholder/150/150"
    }
  ]

  const milestones = [
    {
      year: "2023",
      title: "公司成立",
      description: "StarShadows.AI在深圳正式成立，开始AI服装设计的研发"
    },
    {
      year: "2024",
      title: "产品发布",
      description: "推出首个AI服装设计平台，获得用户广泛好评"
    },
    {
      year: "2025",
      title: "全球化发展",
      description: "服务用户突破10万，开始拓展国际市场"
    }
  ]

  const values = [
    {
      icon: "🎨",
      title: "创新设计",
      description: "运用最先进的AI技术，推动设计边界的不断突破"
    },
    {
      icon: "👥",
      title: "用户至上",
      description: "以用户需求为中心，提供最优质的设计体验"
    },
    {
      icon: "🌱",
      title: "可持续发展",
      description: "关注环保，倡导可持续的时尚设计理念"
    },
    {
      icon: "🚀",
      title: "技术领先",
      description: "持续投入研发，保持在AI设计领域的技术优势"
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero fade-in-section">
        <div className="about-hero-content">
          <h1 className="about-hero-title">关于星流图影.AI</h1>
          <p className="about-hero-subtitle">
            我们是一支充满激情的团队，致力于通过人工智能技术重新定义设计行业的未来。我们相信科技与创意的完美结合，能够为设计师和创作爱好者带来前所未有的创作体验。
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100K+</span>
              <span className="stat-label">活跃用户</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1M+</span>
              <span className="stat-label">设计作品</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">用户满意度</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section fade-in-section fade-in-delay-1">
        <div className="mission-container">
          <div className="mission-content">
            <h2 className="section-title">我们的使命</h2>
            <p className="mission-text">
              通过尖端的AI技术，让每个人都能成为设计师。我们致力于降低设计门槛，为用户提供专业、高效、创新的设计工具，让创意不再受限于技术。
            </p>
          </div>
          <div className="vision-content">
            <h2 className="section-title">我们的愿景</h2>
            <p className="vision-text">
              成为全球领先的AI设计平台，推动设计行业的数字化转型，让AI成为每个设计师的得力助手。
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section fade-in-section fade-in-delay-2">
        <div className="values-container">
          <h2 className="section-title">核心价值观</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section fade-in-section fade-in-delay-3">
        <div className="team-container">
          <h2 className="section-title">核心团队</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <img src={member.avatar} alt={member.name} />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="milestones-section fade-in-section fade-in-delay-4">
        <div className="milestones-container">
          <h2 className="section-title">发展历程</h2>
          <div className="milestones-timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="milestone-item">
                <div className="milestone-year">{milestone.year}</div>
                <div className="milestone-content">
                  <h3 className="milestone-title">{milestone.title}</h3>
                  <p className="milestone-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta fade-in-section fade-in-delay-4">
        <div className="contact-cta-container">
          <h2>加入我们的旅程</h2>
          <p>如果您对我们的工作感兴趣，欢迎联系我们了解更多</p>
          <div className="cta-buttons">
            <Link href="/clothing" className="btn btn-primary">开始体验</Link>
            <a href="mailto:contact@starshadows.ai" className="btn btn-secondary">联系我们</a>
          </div>
        </div>
      </section>
    </div>
  )
}