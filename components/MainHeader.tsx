"use client"
import Link from "next/link"

export default function MainHeader() {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">StarShadows.AI</Link>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link href="/">首页</Link></li>
          <li><Link href="/clothing">AI服装</Link></li>
          <li><Link href="/gallery">作品模板</Link></li>
          <li><Link href="/tutorial">使用教程</Link></li>
          <li><Link href="/about">关于我们</Link></li>
          <li><Link href="/pricing">定价</Link></li>
        </ul>
      </nav>
      <div className="user-actions">
        <a href="#" className="btn">登录</a>
        <a href="#" className="btn btn-primary">注册</a>
      </div>
    </header>
  )
}