import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="#">StarShadows.AI</a>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/clothing">AI服装</Link></li>
          <li><Link to="/jewelry">AI珠宝</Link></li>
          <li><Link to="/makeup">AI美妆</Link></li>
          <li><Link to="/gallery">作品广场</Link></li>
        </ul>
      </nav>
      <div className="user-actions">
        <a href="#" className="btn">登录</a>
        <a href="#" className="btn btn-primary">注册</a>
      </div>
    </header>
  );
};

export default Header;