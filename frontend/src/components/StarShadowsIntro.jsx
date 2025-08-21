import React, { useEffect, useRef } from 'react';
import './StarShadowsIntro.css';

const StarShadowsIntro = ({ onEnter }) => {
  const starsRef = useRef(null);

  useEffect(() => {
    // 生成随机星星
    const createStars = () => {
      const starsContainer = starsRef.current;
      if (!starsContainer) return;
      
      const numberOfStars = 100;
      
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // 随机大小
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // 随机动画延迟
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
      }
    };

    // 创建流星
    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // 随机起始位置
      shootingStar.style.left = Math.random() * 100 + '%';
      shootingStar.style.top = Math.random() * 50 + '%';
      
      document.body.appendChild(shootingStar);
      
      // 3秒后移除
      setTimeout(() => {
        if (shootingStar.parentNode) {
          shootingStar.parentNode.removeChild(shootingStar);
        }
      }, 3000);
    };

    // 鼠标移动效果
    const handleMouseMove = (e) => {
      const glow = document.querySelector('.glow');
      if (glow) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`;
      }
    };

    createStars();
    
    // 定期创建流星
    const shootingStarInterval = setInterval(createShootingStar, 2000);
    
    // 添加鼠标移动监听
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(shootingStarInterval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    if (onEnter) {
      onEnter();
    }
  };

  return (
    <div className="intro-container" onClick={handleClick}>
      {/* 星空背景 */}
      <div className="stars" ref={starsRef}></div>
      
      {/* 光晕效果 */}
      <div className="glow"></div>
      
      {/* 主内容 */}
      <div className="container">
        <div className="main-title">
          <h1 className="hello-world">Hello, Star Shadows</h1>
          <p className="enter-text">点击任意位置进入</p>
        </div>
      </div>
    </div>
  );
};

export default StarShadowsIntro;