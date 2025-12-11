"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const router = useRouter()

  const plans = [
    {
      id: 'basic',
      name: '基础套餐',
      price: '免费',
      period: '',
      description: '适合个人用户和初学者',
      features: [
        '每月10次AI设计生成',
        '基础服装款式模板',
        '标准清晰度输出',
        '7天历史记录保存',
        '社区支持'
      ],
      cta: '立即使用',
      popular: false
    },
    {
      id: 'pro',
      name: '专业套餐',
      price: '¥99',
      period: '/月',
      description: '适合专业设计师和工作室',
      features: [
        '无限AI设计生成',
        '全部服装款式模板',
        '高清4K输出',
        '30天历史记录保存',
        '优先客服支持',
        '批量下载功能',
        '自定义风格训练',
        'API访问权限'
      ],
      cta: '立即升级',
      popular: true
    },
    {
      id: 'enterprise',
      name: '企业套餐',
      price: '定制',
      period: '',
      description: '适合企业和团队用户',
      features: [
        '专业套餐所有功能',
        '团队协作管理',
        '品牌定制化服务',
        '专属技术支持',
        '私有化部署选项',
        '定制化培训',
        '合同保障服务',
        '客户成功经理'
      ],
      cta: '联系销售',
      popular: false
    }
  ]

  

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero fade-in-section">
        <div className="pricing-hero-content">
          <h1 className="pricing-hero-title">选择适合您的套餐</h1>
          <p className="pricing-hero-subtitle">
            从免费体验到企业级服务，我们为不同需求的用户提供灵活的定价方案
          </p>
          <div className="pricing-billing-toggle">
            <span>月付</span>
            <span>年付享8折</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-plans fade-in-section fade-in-delay-1">
        <div className="pricing-container">
          <div className="pricing-grid">
            {plans.map((plan) => (
              <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">最受欢迎</div>}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <div className="pricing-price">
                    <span className="price-amount">{plan.price}</span>
                    {plan.period && <span className="price-period">{plan.period}</span>}
                  </div>
                  <p className="pricing-description">{plan.description}</p>
                </div>
                <div className="pricing-features">
                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`pricing-cta ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => plan.id === 'enterprise' ? router.push('/contact') : router.push('/signup')}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="pricing-cta fade-in-section fade-in-delay-3">
        <div className="cta-container">
          <h2>准备好开始您的AI设计之旅了吗？</h2>
          <p>立即注册，获得免费的AI设计体验</p>
          <Link href="/clothing" className="btn btn-primary btn-large">
            免费开始
          </Link>
        </div>
      </section>
    </div>
  )
}