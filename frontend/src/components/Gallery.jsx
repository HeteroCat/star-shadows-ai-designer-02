import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Gallery.css';

const Gallery = ({ onBack }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // 随机打乱数组的函数
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 动态获取pic文件夹中的所有图片
  const getImageList = async () => {
    try {
      // 尝试通过后端API获取图片列表
      const response = await fetch('/api/images');
      if (response.ok) {
        const imageFiles = await response.json();
        return imageFiles;
      }
    } catch (error) {
      console.log('无法通过API获取图片列表，使用默认列表');
    }
    
    // 如果API不可用，使用已知的图片列表
    const defaultImageList = [
      'ai-clothing-1759682758493.png',
      'ai-clothing-1759782788593.png',
      'ai-clothing-1759782798985.png',
      'ai-clothing-1759782832558.png',
      'ai-clothing-1759820300799.png',
      'ai-clothing-1759820332553.png',
      'ai-clothing-1759820351648.png',
      'ai-clothing-1759820429346.png',
      'ai-clothing-1759820555821.png',
      'ai-clothing-1759820574450.png',
      'ai-clothing-1759820596963.png',
      'ai-clothing-1759820616245.png',
      'ai-clothing-1759820638009.png',
      'ai-clothing-1759820661002.png',
      'ai-clothing-1759820679520.png',
      'ai-clothing-1759820706577.png',
      'ai-clothing-1759820757858.png',
      'ai-clothing-1759820786531.png',
      'ai-clothing-1759820816953.png',
      'ai-clothing-1759820881856.png',
      'ai-jewelry-1759821030024.png',
      'ai-jewelry-1759821048856.png',
      'ai-jewelry-1759821079768.png',
      'ai-jewelry-1759821113492.png',
      'ai-jewelry-1759821132686.png',
      'ai-jewelry-1759821162005.png',
      'ai-jewelry-1759821183989.png',
      'ai-jewelry-1759821233020.png',
      'ai-jewelry-1759821248216.png',
      'ai-jewelry-1759821266879.png',
      'ai-jewelry-1759821289518.png',
      'ai-jewelry-1759821317144.png',
      'ai-makeup-1759821408698.png',
      'ai-makeup-1759821432392.png',
      'ai-makeup-1759821461821.png',
      'ai-makeup-1759821485057.png',
      'ai-makeup-1759821523121.png',
      'ai-makeup-1759821542574.png',
      'ai-makeup-1759821572688.png',
      'ai-makeup-1759821607297.png',
      'ai-makeup-1759821644297.png',
      'ai-makeup-1759821665676.png',
      'ai-makeup-1759821694453.png',
      'ai-makeup-1759821752177.png',
      'ai-makeup-1759821851238.png',
      'ai-makeup-1759821872583.png',
      'ai-makeup-1759821890053.png',
      'ai-makeup-1759821938516.png',
      'ai-makeup-1759821956450.png',
      'ai-makeup-1759821974188.png'
    ];
    
    return defaultImageList;
  };

  useEffect(() => {
    // 异步加载图片信息
    const loadImages = async () => {
      try {
        const imageList = await getImageList();
        // 随机打乱图片顺序，实现混合显示
        const shuffledImageList = shuffleArray(imageList);
        
        const imageData = shuffledImageList.map((filename, index) => ({
          id: index + 1,
          src: `/pic/${filename}`,
          title: filename.split('-')[1] || filename.split('.')[0], // 使用文件名的一部分作为标题
          description: `AI生成作品 - ${filename.includes('clothing') ? 'AI服装设计' : 
                       filename.includes('jewelry') ? 'AI珠宝设计' : 
                       filename.includes('makeup') ? 'AI美妆设计' : '设计作品'}`,
          category: filename.includes('clothing') ? 'AI服装设计' : 
                   filename.includes('jewelry') ? 'AI珠宝设计' : 
                   filename.includes('makeup') ? 'AI美妆设计' : '设计作品',
          height: Math.floor(Math.random() * 200) + 250 // 随机高度用于瀑布流
        }));
        
        setImages(imageData);
        setLoading(false);
      } catch (error) {
        console.error('加载图片失败:', error);
        setLoading(false);
      }
    };

    loadImages();
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