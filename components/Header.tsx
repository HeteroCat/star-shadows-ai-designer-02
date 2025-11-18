'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="#">StarShadows.AI</a>
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
        <a href="#" className="btn">登录</a>
        <a href="#" className="btn btn-primary">注册</a>
      </div>
    </header>
  )
}