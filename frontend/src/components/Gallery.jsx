import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Gallery.css';

const Gallery = ({ onBack }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // 图片列表 - 基于pic文件夹中的图片
  const imageList = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg',
    '1f543916-68aa-4fa2-8b93-05371a8424d0.jpg',
    'DALL·E 2023-12-29 18.04.24 - A futuristic electric car, showcasing sleek and modern design. The car is depicted on a smooth, open road with a cityscape in the background. The focu.png',
    'DALL·E 2024-01-28 22.08.38 - A mystical night scene with a dark sky sprinkled with stars. In the center, a heart is depicted, entwined with tender, delicate threads, symbolizing a.png',
    '双子座.jpg', '双鱼座.jpg', '双鱼座的星座化身为人，头戴花冠、穿着皇家服装、背景为银河天空 (1).png',
    '处女座.jpg', '天秤座.jpg', '天蝎座.jpg', '射手座.jpg', '巨蟹座.jpg',
    '摩羯座.jpg', '水瓶座.jpg', '狮子座.jpg', '白羊座.jpg', '金牛座.jpg'
  ];

  useEffect(() => {
    // 模拟加载图片信息
    const loadImages = () => {
      const imageData = imageList.map((filename, index) => ({
        id: index + 1,
        src: `/pic/${filename}`,
        title: filename.split('.')[0],
        description: `AI生成作品 - ${filename.split('.')[0]}`,
        category: filename.includes('座') ? '星座系列' : 
                 filename.includes('DALL') ? 'AI艺术' : '设计作品',
        height: Math.floor(Math.random() * 200) + 250 // 随机高度用于瀑布流
      }));
      
      setImages(imageData);
      setLoading(false);
    };

    setTimeout(loadImages, 500); // 模拟加载延迟
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDownload = async (image) => {
    if (!image) return;
    
    try {
      // 对于本地图片，直接下载
      if (image.src.startsWith('/pic/')) {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = `${image.title}-${Date.now()}.${image.src.split('.').pop()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // 对于外部图片，使用代理下载接口
        const response = await fetch('http://localhost:8000/api/download-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: image.src })
        });
        
        if (!response.ok) {
          throw new Error('下载失败');
        }
        
        // 创建blob对象
        const blob = await response.blob();
        
        // 创建下载链接
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${image.title}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 清理URL对象
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请重试');
    }
  };

  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="loading-spinner"></div>
        <p>正在加载作品...</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <Header />
      {/* 页面标题区域 */}
      <div className="gallery-page-header">
        <h1 className="gallery-title">作品广场</h1>
        <div className="gallery-stats">
          <span>{images.length} 件作品</span>
        </div>
      </div>

      {/* 瀑布流图片展示 */}
      <main className="gallery-main">
        <div className="masonry-grid">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="masonry-item"
              onClick={() => handleImageClick(image)}
            >
              <div className="image-card">
                <div className="image-wrapper">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/vite.svg'; // 备用图片
                    }}
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="category-tag">{image.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 图片详情模态框 */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="modal-image">
              <img src={selectedImage.src} alt={selectedImage.title} />
            </div>
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
              <div className="modal-meta">
                <span className="category">{selectedImage.category}</span>
                <div className="modal-actions">
                  <button className="action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    收藏
                  </button>
                  <button className="action-btn" onClick={() => handleDownload(selectedImage)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    下载
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;