"use client"
import Link from "next/link"
import { useState } from "react"

export default function TutorialPage() {
  const [activeCategory, setActiveCategory] = useState('beginner')

  const categories = [
    { id: 'beginner', name: '新手入门', icon: '🚀' },
    { id: 'basic', name: '基础操作', icon: '📝' },
    { id: 'advanced', name: '高级技巧', icon: '⭐' },
    { id: 'faq', name: '常见问题', icon: '❓' }
  ]

  const tutorials = {
    beginner: [
      {
        id: 1,
        title: '快速开始AI服装设计',
        description: '学习如何在3分钟内创建第一个AI服装设计作品',
        duration: '3分钟',
        level: '入门',
        video: false
      },
      {
        id: 2,
        title: '了解AI设计流程',
        description: '从输入描述到生成作品的完整流程介绍',
        duration: '5分钟',
        level: '入门',
        video: true
      },
      {
        id: 3,
        title: '界面功能概览',
        description: '熟悉各个功能区域和工具的使用方法',
        duration: '8分钟',
        level: '入门',
        video: true
      }
    ],
    basic: [
      {
        id: 4,
        title: '有效的描述词写作',
        description: '学习如何写出准确的AI提示词来获得理想效果',
        duration: '10分钟',
        level: '基础',
        video: true
      },
      {
        id: 5,
        title: '风格模板使用技巧',
        description: '掌握各种服装风格模板的应用方法',
        duration: '7分钟',
        level: '基础',
        video: true
      },
      {
        id: 6,
        title: '颜色和面料调整',
        description: '如何调整生成的服装颜色和面料材质',
        duration: '6分钟',
        level: '基础',
        video: false
      },
      {
        id: 7,
        title: '尺寸和比例优化',
        description: '调整服装的尺寸比例使其更符合需求',
        duration: '8分钟',
        level: '基础',
        video: true
      }
    ],
    advanced: [
      {
        id: 8,
        title: '批量生成和筛选',
        description: '高效的批量作品生成和筛选技巧',
        duration: '12分钟',
        level: '高级',
        video: true
      },
      {
        id: 9,
        title: '自定义风格训练',
        description: '创建符合个人品牌特色的AI风格',
        duration: '15分钟',
        level: '高级',
        video: true
      },
      {
        id: 10,
        title: '图片编辑和优化',
        description: '后期处理和优化生成作品的技巧',
        duration: '10分钟',
        level: '高级',
        video: false
      },
      {
        id: 11,
        title: 'API集成和自动化',
        description: '通过API实现设计流程的自动化',
        duration: '20分钟',
        level: '高级',
        video: false
      }
    ],
    faq: [
      {
        id: 12,
        title: '生成效果不理想怎么办？',
        description: '解决生成效果不符合预期的常见方法',
        duration: '5分钟',
        level: '全部',
        video: false
      },
      {
        id: 13,
        title: '如何提高生成速度？',
        description: '优化设计流程，提高工作效率的技巧',
        duration: '4分钟',
        level: '全部',
        video: false
      },
      {
        id: 14,
        title: '作品版权和商用说明',
        description: '了解生成作品的版权归属和商用规则',
        duration: '3分钟',
        level: '全部',
        video: false
      }
    ]
  }

  const quickTips = [
    "使用具体的描述词，如'夏季连衣裙'而不是'衣服'",
    "添加颜色和材质描述，如'棉质白色连衣裙'",
    "指定服装风格，如'极简主义'、'复古风'",
    "描述穿着场合，如'商务正装'、'休闲度假'"
  ]

  return (
    <div className="tutorial-page">
      {/* Hero Section */}
      <section className="tutorial-hero fade-in-section">
        <div className="tutorial-hero-content">
          <h1 className="tutorial-hero-title">AI服装设计教程</h1>
          <p className="tutorial-hero-subtitle">
            从零开始掌握AI服装设计技巧，让创作更加得心应手
          </p>
          <div className="tutorial-stats">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">精品教程</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">学习用户</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">用户评分</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="quick-tips fade-in-section fade-in-delay-1">
        <div className="tips-container">
          <h2 className="tips-title">💡 快速技巧</h2>
          <div className="tips-grid">
            {quickTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-number">{index + 1}</div>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="tutorial-categories fade-in-section fade-in-delay-1">
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Tutorial List */}
      <section className="tutorial-content fade-in-section fade-in-delay-2">
        <div className="tutorial-container">
          <div className="tutorial-grid">
            {tutorials[activeCategory as keyof typeof tutorials].map((tutorial: {
              id: number;
              title: string;
              description: string;
              duration: string;
              level: string;
              video: boolean;
            }) => (
              <div key={tutorial.id} className="tutorial-card">
                <div className="tutorial-thumbnail">
                  {tutorial.video ? (
                    <div className="video-indicator">▶️</div>
                  ) : (
                    <div className="article-indicator">📄</div>
                  )}
                </div>
                <div className="tutorial-info">
                  <div className="tutorial-meta">
                    <span className={`level-badge ${tutorial.level.toLowerCase()}`}>
                      {tutorial.level}
                    </span>
                    <span className="duration">⏱️ {tutorial.duration}</span>
                  </div>
                  <h3 className="tutorial-title">{tutorial.title}</h3>
                  <p className="tutorial-description">{tutorial.description}</p>
                  <button className="tutorial-start-btn">
                    {tutorial.video ? '观看视频' : '阅读教程'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="tutorial-resources fade-in-section fade-in-delay-3">
        <div className="resources-container">
          <h2 className="resources-title">学习资源</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>设计指南</h3>
              <p>完整的AI服装设计指南和最佳实践</p>
              <button className="resource-btn">下载指南</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🎨</div>
              <h3>提示词库</h3>
              <p>500+精选提示词模板，覆盖各种风格</p>
              <button className="resource-btn">查看词库</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">👥</div>
              <h3>社区论坛</h3>
              <p>与其他设计师交流经验和技巧</p>
              <button className="resource-btn">加入社区</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tutorial-cta fade-in-section fade-in-delay-4">
        <div className="cta-container">
          <h2>开始您的AI设计之旅</h2>
          <p>理论知识已备好，现在就动手实践吧！</p>
          <Link href="/clothing" className="btn btn-primary btn-large">
            立即开始设计
          </Link>
        </div>
      </section>
    </div>
  )
}