"use client"
import Link from "next/link"

export default function MainFooter() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>星流图影.AI</h3>
            <p>专业的AI设计平台，为您提供智能化的设计解决方案。让创意与技术完美融合，打造独一无二的、符合市场的设计作品。</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>产品服务</h4>
              <ul>
                <li><Link href="/clothing">AI服装</Link></li>
                <li><Link href="/pricing">定价方案</Link></li>
                <li><Link href="/gallery">作品模板</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>支持帮助</h4>
              <ul>
                <li><Link href="/tutorial">使用教程</Link></li>
                <li><a href="#">常见问题</a></li>
                <li><a href="#">技术支持</a></li>
                <li><a href="#">联系客服</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>关于我们</h4>
              <ul>
                <li><Link href="/about">公司介绍</Link></li>
                <li><a href="#">发展历程</a></li>
                <li><a href="#">加入我们</a></li>
                <li><a href="#">联系我们</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2025 AI Designer. 保留所有权利。</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#">隐私政策</a>
              <a href="#">服务条款</a>
              <a href="#">Cookie政策</a>
              <a href="#">法律声明</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}