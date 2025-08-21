import React, { useState } from 'react';
import './AIDesignerHome.css';

const AIDesignerHome = () => {
  const [activeTab, setActiveTab] = useState('clothing');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const features = {
    clothing: {
      title: 'AI服装设计',
      description: '利用人工智能技术，为您提供专业的服装设计服务',
      items: ['时尚趋势分析', '个性化定制', '3D建模预览', '面料推荐']
    },
    jewelry: {
      title: 'AI珠宝设计', 
      description: '创新珠宝设计，融合传统工艺与现代科技',
      items: ['宝石搭配', '造型设计', '工艺优化', '价值评估']
    },
    makeup: {
      title: 'AI美妆设计',
      description: '智能美妆方案，打造独一无二的时尚作品',
      items: ['色彩搭配', '妆容设计', '产品推荐', '效果预览']
    }
  };

  const slides = [
    {
      id: 1,
      title: 'AI服装设计',
      description: '智能分析时尚趋势，为您定制专属服装设计方案',
      image: '/AI服装.png',
      category: 'clothing'
    },
    {
      id: 2,
      title: 'AI珠宝设计',
      description: '运用AI算法生成独特珠宝设计，结合传统工艺与现代美学',
      image: '/AI珠宝.png',
      category: 'jewelry'
    },
    {
      id: 3,
      title: 'AI美妆设计',
      description: '基于面部特征分析，提供个性化美妆方案',
      image: '/AI美妆.png',
      category: 'makeup'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="ai-designer-home">
      <style>{`
        .ai-designer-home {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #334155;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo a {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-subtitle {
          font-size: 0.875rem;
          font-weight: 400;
          color: #94a3b8;
          margin-left: 0.5rem;
        }

        .nav-menu ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 2rem;
        }

        .nav-menu a {
          color: #d1d5db;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-menu a:hover {
          color: #a855f7;
        }

        .user-actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .btn:first-child {
          color: #d1d5db;
          border-color: #374151;
          background: transparent;
        }

        .btn:first-child:hover {
          background: #374151;
          color: white;
        }

        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          color: white;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .main-content {
          padding: 0 2rem;
        }

        .hero-section {
          display: flex;
          align-items: center;
          min-height: 80vh;
          padding: 2rem 0;
          gap: 4rem;
        }

        .hero-content {
          flex: 1;
          max-width: 500px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #d1d5db;
          margin-bottom: 2rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-hero {
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-hero.btn-primary {
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          color: white;
        }

        .btn-hero.btn-primary:hover {
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
        }

        .btn-hero.btn-secondary {
          background: transparent;
          color: #d1d5db;
          border: 2px solid #374151;
        }

        .btn-hero.btn-secondary:hover {
          background: #374151;
          border-color: #6b7280;
          transform: translateY(-2px);
        }

        .hero-carousel {
          flex: 1;
          position: relative;
          min-height: 500px;
          height: 100%;
          margin-left: 2rem;
          margin-right: 2rem;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 500px;
          overflow: hidden;
          border-radius: 1rem;
          border: 1px solid #374151;
        }

        .carousel-wrapper {
          display: flex;
          width: 300%;
          height: 100%;
          transition: transform 0.5s ease-in-out;
        }

        .carousel-slide {
          width: 33.333%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .slide-image {
          flex: 1;
          overflow: hidden;
        }

        .slide-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .carousel-slide:hover .slide-image img {
          transform: scale(1.05);
        }

        .slide-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 3rem 2rem 2rem;
          color: white;
        }

        .slide-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .slide-content p {
          font-size: 0.9rem;
          line-height: 1.4;
          color: #d1d5db;
          margin-bottom: 1rem;
        }

        .slide-btn {
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .slide-btn:hover {
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .carousel-btn:hover {
          background: rgba(139, 92, 246, 0.8);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-btn-prev {
          left: 1rem;
        }

        .carousel-btn-next {
          right: 1rem;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #a855f7;
          transform: scale(1.2);
        }

        .indicator:hover {
          background: rgba(255,255,255,0.8);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(139,92,246,0.3));
          border-radius: 1rem;
          display: flex;
          align-items: flex-end;
          padding: 2rem;
        }

        .overlay-content {
          width: 100%;
        }

        .category-tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tag {
          background: rgba(139, 92, 246, 0.8);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .inspiration-note {
          margin-bottom: 1rem;
        }

        .inspiration-note h4 {
          color: white;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .inspiration-note p {
          color: #d1d5db;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .preview-gallery {
          display: flex;
          gap: 0.5rem;
        }

        .preview-item {
          width: 60px;
          height: 60px;
          border-radius: 0.5rem;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.3);
        }

        .preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .editors-pick-section,
        .hot-pick-section {
          padding: 4rem 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .view-more {
          color: #a855f7;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .view-more:hover {
          color: #8b5cf6;
        }

        .editors-pick-grid,
        .hot-pick-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 1rem;
          height: 500px;
        }

        .pick-card,
        .hot-card {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          background: #1e293b;
          border: 1px solid #334155;
          transition: transform 0.3s ease;
        }

        .pick-card:hover,
        .hot-card:hover {
          transform: translateY(-4px);
        }

        .pick-card.large,
        .hot-card.large {
          grid-row: 1 / 3;
        }

        .card-image {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 1.5rem;
          color: white;
        }

        .card-overlay h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .card-overlay p {
          color: #d1d5db;
          font-size: 0.875rem;
        }

        .start-creating-card {
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          border: none;
          transition: transform 0.3s ease;
        }

        .start-creating-card:hover {
          transform: translateY(-4px);
        }

        .start-creating-card.green {
          background: linear-gradient(135deg, #059669, #10b981);
        }

        .creating-content {
          text-align: center;
          color: white;
        }

        .creating-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .creating-content p {
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .btn-start-creating {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-start-creating:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .editors-pick-grid,
          .hot-pick-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            height: auto;
          }

          .pick-card.large,
          .hot-card.large {
            grid-row: auto;
          }
        }

        /* 服务特色区域样式 */
        .features-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #1e293b, #0f172a);
        }

        .section-subtitle {
          text-align: center;
          color: #94a3b8;
          font-size: 1.1rem;
          margin-top: 0.5rem;
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid #334155;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: #a855f7;
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.2);
        }

        .feature-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          border-radius: 50%;
          margin: 0 auto 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }

        .feature-card p {
           color: #94a3b8;
           line-height: 1.6;
           font-size: 0.95rem;
         }

         /* 数据统计区域样式 */
         .stats-section {
           padding: 4rem 0;
           background: linear-gradient(135deg, #8b5cf6, #a855f7);
           position: relative;
           overflow: hidden;
         }

         .stats-section::before {
           content: '';
           position: absolute;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
           opacity: 0.3;
         }

         .stats-container {
           max-width: 1200px;
           margin: 0 auto;
           padding: 0 2rem;
           position: relative;
           z-index: 1;
         }

         .stats-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
           gap: 3rem;
         }

         .stat-item {
           text-align: center;
           color: white;
         }

         .stat-number {
           font-size: 3rem;
           font-weight: 700;
           line-height: 1;
           margin-bottom: 0.5rem;
           background: linear-gradient(135deg, #ffffff, #a855f7);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           background-clip: text;
         }

         .stat-label {
           font-size: 1.25rem;
           font-weight: 600;
           margin-bottom: 0.5rem;
           color: #f1f5f9;
         }

         .stat-description {
            font-size: 0.95rem;
            color: #e2e8f0;
            opacity: 0.9;
          }

          /* 用户评价区域样式 */
          .testimonials-section {
            padding: 6rem 0;
            background: linear-gradient(135deg, #0f172a, #1e293b);
          }

          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .testimonial-card {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid #334155;
            border-radius: 1rem;
            padding: 2rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }

          .testimonial-card:hover {
            transform: translateY(-5px);
            border-color: #a855f7;
            box-shadow: 0 10px 30px rgba(168, 85, 247, 0.2);
          }

          .testimonial-content {
            margin-bottom: 1.5rem;
            position: relative;
          }

          .quote-icon {
            font-size: 4rem;
            color: #a855f7;
            font-family: serif;
            line-height: 1;
            position: absolute;
            top: -1rem;
            left: -0.5rem;
            opacity: 0.3;
          }

          .testimonial-content p {
            color: #d1d5db;
            line-height: 1.6;
            font-size: 1rem;
            font-style: italic;
            margin-left: 1rem;
          }

          .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .author-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #a855f7;
          }

          .author-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .author-name {
            font-weight: 600;
            color: white;
            font-size: 1rem;
          }

          .author-title {
            color: #94a3b8;
            font-size: 0.875rem;
          }

          /* 设计流程区域样式 */
          .process-section {
            padding: 80px 0;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          }

          .process-container {
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            flex-wrap: wrap;
            gap: 20px;
          }

          .process-step {
            flex: 1;
            min-width: 200px;
            text-align: center;
            padding: 30px 20px;
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid #334155;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            position: relative;
            backdrop-filter: blur(10px);
          }

          .process-step:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(168, 85, 247, 0.15);
          }

          .step-number {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, #a855f7, #8b5cf6);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.875rem;
          }

          .step-icon {
            margin: 20px 0 15px;
          }

          .process-step h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: white;
            margin-bottom: 10px;
          }

          .process-step p {
            color: #94a3b8;
            font-size: 0.875rem;
            line-height: 1.6;
          }

          .process-arrow {
            color: #a855f7;
            margin: 0 10px;
          }

          @media (max-width: 768px) {
            .process-container {
              flex-direction: column;
            }
            
            .process-arrow {
               transform: rotate(90deg);
               margin: 10px 0;
             }
           }

           /* 最新资讯区域样式 */
           .news-section {
             padding: 80px 0;
             background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
           }

           .news-container {
             max-width: 1200px;
             margin: 0 auto;
             padding: 0 20px;
           }

           .news-card {
             background: rgba(30, 41, 59, 0.5);
             border: 1px solid #334155;
             border-radius: 16px;
             overflow: hidden;
             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
             transition: all 0.3s ease;
             margin-bottom: 30px;
             backdrop-filter: blur(10px);
           }

           .news-card:hover {
             transform: translateY(-5px);
             box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
           }

           .news-card.featured {
             display: grid;
             grid-template-columns: 1fr 1fr;
             gap: 0;
             margin-bottom: 40px;
           }

           .news-image {
             position: relative;
             overflow: hidden;
           }

           .news-image img {
             width: 100%;
             height: 250px;
             object-fit: cover;
             transition: transform 0.3s ease;
           }

           .news-card.featured .news-image img {
             height: 300px;
           }

           .news-card:hover .news-image img {
             transform: scale(1.05);
           }

           .news-content {
             padding: 25px;
           }

           .news-meta {
             display: flex;
             justify-content: space-between;
             align-items: center;
             margin-bottom: 15px;
           }

           .news-category {
             background: linear-gradient(135deg, #a855f7, #8b5cf6);
             color: white;
             padding: 4px 12px;
             border-radius: 20px;
             font-size: 0.75rem;
             font-weight: 500;
           }

           .news-date {
             color: #94a3b8;
             font-size: 0.875rem;
           }

           .news-content h3 {
             font-size: 1.25rem;
             font-weight: 600;
             color: white;
             margin-bottom: 12px;
             line-height: 1.4;
           }

           .news-card.featured .news-content h3 {
             font-size: 1.5rem;
           }

           .news-content p {
             color: #94a3b8;
             font-size: 0.875rem;
             line-height: 1.6;
             margin-bottom: 15px;
           }

           .read-more {
             color: #a855f7;
             text-decoration: none;
             font-weight: 500;
             font-size: 0.875rem;
             transition: color 0.3s ease;
           }

           .read-more:hover {
             color: #8b5cf6;
           }

           .news-grid {
             display: grid;
             grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
             gap: 30px;
           }

           @media (max-width: 768px) {
             .news-card.featured {
               grid-template-columns: 1fr;
             }
             
             .news-grid {
               grid-template-columns: 1fr;
             }
           }



           /* FAQ常见问题区域样式 */
           .faq-section {
             padding: 80px 0;
             background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
           }

           .faq-container {
             max-width: 800px;
             margin: 0 auto;
             padding: 0 20px;
           }

           .faq-item {
             border: 1px solid #e5e7eb;
             border-radius: 12px;
             margin-bottom: 16px;
             overflow: hidden;
             transition: all 0.3s ease;
           }

           .faq-item:hover {
             border-color: #a855f7;
             box-shadow: 0 4px 20px rgba(168, 85, 247, 0.1);
           }

           .faq-question {
             padding: 24px;
             background: rgba(30, 41, 59, 0.3);
             cursor: pointer;
             display: flex;
             justify-content: space-between;
             align-items: center;
             transition: all 0.3s ease;
           }

           .faq-question:hover {
             background: rgba(30, 41, 59, 0.5);
           }

           .faq-question h3 {
             font-size: 1.125rem;
             font-weight: 600;
             color: white;
             margin: 0;
           }

           .faq-toggle {
             width: 24px;
             height: 24px;
             background: #a855f7;
             color: white;
             border-radius: 50%;
             display: flex;
             align-items: center;
             justify-content: center;
             font-size: 1.25rem;
             font-weight: bold;
             transition: all 0.3s ease;
           }

           .faq-item.active .faq-toggle {
             transform: rotate(45deg);
             background: #8b5cf6;
           }

           .faq-answer {
             padding: 0 24px;
             max-height: 0;
             overflow: hidden;
             transition: all 0.3s ease;
           }

           .faq-item.active .faq-answer {
             padding: 24px;
             max-height: 200px;
           }

           .faq-answer p {
             color: #94a3b8;
             line-height: 1.6;
             margin: 0;
           }

           @media (max-width: 768px) {
             .faq-question {
               padding: 20px;
             }
             
             .faq-question h3 {
               font-size: 1rem;
             }
           }

           /* 联系我们区域样式 */
           .contact-section {
             padding: 80px 0;
             background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
           }

           .contact-container {
             max-width: 1200px;
             margin: 0 auto;
             padding: 0 20px;
             display: grid;
             grid-template-columns: 1fr 1fr;
             gap: 60px;
             align-items: start;
           }

           .contact-info {
             display: grid;
             grid-template-columns: repeat(2, 1fr);
             gap: 24px;
           }

           .contact-card {
             background: rgba(30, 41, 59, 0.5);
             border: 1px solid rgba(168, 85, 247, 0.2);
             backdrop-filter: blur(10px);
             padding: 30px 24px;
             border-radius: 16px;
             text-align: center;
             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
             transition: all 0.3s ease;
           }

           .contact-card:hover {
             transform: translateY(-5px);
             box-shadow: 0 8px 30px rgba(168, 85, 247, 0.15);
           }

           .contact-icon {
             margin-bottom: 16px;
             display: flex;
             justify-content: center;
           }

           .contact-card h3 {
             font-size: 1.125rem;
             font-weight: 600;
             color: white;
             margin-bottom: 8px;
           }

           .contact-card p {
             color: #a855f7;
             font-weight: 500;
             margin-bottom: 4px;
           }

           .contact-card span {
             color: #94a3b8;
             font-size: 0.875rem;
           }

           .chat-button {
             background: linear-gradient(135deg, #a855f7, #8b5cf6);
             color: white;
             border: none;
             padding: 8px 16px;
             border-radius: 20px;
             font-size: 0.875rem;
             font-weight: 500;
             cursor: pointer;
             transition: all 0.3s ease;
             margin-top: 8px;
           }

           .chat-button:hover {
             transform: translateY(-1px);
             box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
           }

           .contact-form {
             background: rgba(30, 41, 59, 0.5);
             border: 1px solid rgba(168, 85, 247, 0.2);
             backdrop-filter: blur(10px);
             padding: 40px;
             border-radius: 16px;
             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
           }

           .contact-form h3 {
             font-size: 1.5rem;
             font-weight: 600;
             color: white;
             margin-bottom: 24px;
           }

           .form-row {
             display: grid;
             grid-template-columns: 1fr 1fr;
             gap: 16px;
             margin-bottom: 16px;
           }

           .contact-form input,
           .contact-form textarea {
             width: 100%;
             padding: 12px 16px;
             border: 1px solid rgba(148, 163, 184, 0.3);
             border-radius: 8px;
             font-size: 0.875rem;
             background: rgba(15, 23, 42, 0.5);
             color: white;
             transition: all 0.3s ease;
             margin-bottom: 16px;
           }

           .contact-form input:focus,
           .contact-form textarea:focus {
             outline: none;
             border-color: #a855f7;
             box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
           }

           .submit-button {
             width: 100%;
             background: linear-gradient(135deg, #a855f7, #8b5cf6);
             color: white;
             border: none;
             padding: 12px 24px;
             border-radius: 8px;
             font-size: 1rem;
             font-weight: 500;
             cursor: pointer;
             transition: all 0.3s ease;
           }

           .submit-button:hover {
             transform: translateY(-1px);
             box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
           }

           @media (max-width: 768px) {
             .contact-container {
               grid-template-columns: 1fr;
               gap: 40px;
             }
             
             .contact-info {
               grid-template-columns: 1fr;
             }
             
             .form-row {
               grid-template-columns: 1fr;
             }
             
             .contact-form {
               padding: 30px 24px;
             }
           }

           /* 页脚区域样式 */
           .footer-section {
             background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
             color: white;
             padding: 60px 0 0;
           }

           .footer-container {
             max-width: 1200px;
             margin: 0 auto;
             padding: 0 20px;
           }

           .footer-content {
             display: grid;
             grid-template-columns: 1fr 2fr;
             gap: 60px;
             padding-bottom: 40px;
             border-bottom: 1px solid #374151;
           }

           .footer-brand h3 {
             font-size: 1.5rem;
             font-weight: 700;
             color: #a855f7;
             margin-bottom: 16px;
           }

           .footer-brand p {
             color: #d1d5db;
             line-height: 1.6;
             margin-bottom: 24px;
           }

           .social-links {
             display: flex;
             gap: 12px;
           }

           .social-link {
             width: 40px;
             height: 40px;
             background: #374151;
             border-radius: 8px;
             display: flex;
             align-items: center;
             justify-content: center;
             color: #d1d5db;
             text-decoration: none;
             transition: all 0.3s ease;
           }

           .social-link:hover {
             background: #a855f7;
             color: white;
             transform: translateY(-2px);
           }

           .footer-links {
             display: grid;
             grid-template-columns: repeat(4, 1fr);
             gap: 40px;
           }

           .footer-column h4 {
             font-size: 1.125rem;
             font-weight: 600;
             color: white;
             margin-bottom: 20px;
           }

           .footer-column ul {
             list-style: none;
             padding: 0;
             margin: 0;
           }

           .footer-column li {
             margin-bottom: 12px;
           }

           .footer-column a {
             color: #d1d5db;
             text-decoration: none;
             font-size: 0.875rem;
             transition: color 0.3s ease;
           }

           .footer-column a:hover {
             color: #a855f7;
           }

           .footer-bottom {
             padding: 24px 0;
           }

           .footer-bottom-content {
             display: flex;
             justify-content: space-between;
             align-items: center;
           }

           .copyright p {
             color: #9ca3af;
             font-size: 0.875rem;
             margin: 0;
           }

           .footer-bottom-links {
             display: flex;
             gap: 24px;
           }

           .footer-bottom-links a {
             color: #9ca3af;
             text-decoration: none;
             font-size: 0.875rem;
             transition: color 0.3s ease;
           }

           .footer-bottom-links a:hover {
             color: #a855f7;
           }

           @media (max-width: 768px) {
             .footer-content {
               grid-template-columns: 1fr;
               gap: 40px;
             }
             
             .footer-links {
               grid-template-columns: repeat(2, 1fr);
               gap: 30px;
             }
             
             .footer-bottom-content {
               flex-direction: column;
               gap: 16px;
               text-align: center;
             }
             
             .footer-bottom-links {
               flex-wrap: wrap;
               justify-content: center;
               gap: 16px;
             }
           }

           @media (max-width: 480px) {
             .footer-links {
               grid-template-columns: 1fr;
             }
           }
         `}</style>

      {/* 顶部导航栏 */}
      <header className="header">
        <div className="logo">
          <a href="#">星流图影.AI</a>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#" onClick={() => setActiveTab('clothing')}>AI服装</a></li>
            <li><a href="#" onClick={() => setActiveTab('jewelry')}>AI珠宝</a></li>
            <li><a href="#" onClick={() => setActiveTab('makeup')}>AI美妆</a></li>
            <li><a href="#">作品广场</a></li>
          </ul>
        </nav>
        <div className="user-actions">
          <a href="#" className="btn">登录</a>
          <a href="#" className="btn btn-primary">注册</a>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="main-content">
        {/* 英雄区域 */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              星流图影<br />
              AI设计师
            </h1>
            <p className="hero-subtitle">
              利用人工智能技术，为您提供专业的服装、珠宝、美妆设计服务。<br />
              让创意与科技完美融合，打造独一无二的时尚作品。
            </p>
            <div className="hero-buttons">
              <button className="btn-hero btn-primary">开始设计</button>
              <button className="btn-hero btn-secondary">查看作品</button>
            </div>
          </div>
          
          {/* 图片轮播区域 */}
          <div className="hero-carousel">
            <div className="carousel-container">
              <div className="carousel-wrapper" style={{transform: `translateX(-${currentSlide * 33.333}%)`}}>
                {slides.map((slide, index) => (
                  <div key={slide.id} className="carousel-slide">
                    <div className="slide-image">
                      <img src={slide.image} alt={slide.title} />
                    </div>
                    <div className="slide-content">
                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                      <button 
                        className="slide-btn"
                        onClick={() => setActiveTab(slide.category)}
                      >
                        了解更多
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 轮播控制按钮 */}
              <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
                &#8249;
              </button>
              <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
                &#8250;
              </button>
              
              {/* 轮播指示器 */}
              <div className="carousel-indicators">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 编辑推荐区域 */}
        <section className="editors-pick-section">
          <div className="section-header">
            <h2 className="section-title">编辑推荐 Editor's Pick</h2>
            <a href="#" className="view-more">查看更多</a>
          </div>
          <div className="editors-pick-grid">
            <div className="pick-card large">
              <div className="card-image">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ethereal%20white%20flowing%20dress%20fashion%20design%2C%20minimalist%20elegant%20style%2C%20studio%20lighting&image_size=portrait_4_3" alt="优雅白裙" />
              </div>
              <div className="card-overlay">
                
              </div>
            </div>
            <div className="pick-card">
              <div className="card-image">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20sunglasses%20fashion%20accessory%2C%20sleek%20modern%20design%2C%20dark%20background&image_size=square" alt="未来眼镜" />
              </div>
              <div className="card-overlay">
                
              </div>
            </div>
            <div className="pick-card">
              <div className="card-image">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20brown%20fashion%20coat%2C%20textured%20fabric%2C%20high%20fashion%20photography&image_size=square" alt="奢华外套" />
              </div>
              <div className="card-overlay">
                
              </div>
            </div>
            <div className="pick-card">
              <div className="card-image">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20white%20wedding%20dress%2C%20romantic%20design%2C%20soft%20lighting&image_size=square" alt="婚纱设计" />
              </div>
              <div className="card-overlay">
                
              </div>
            </div>
            <div className="start-creating-card">
              <div className="creating-content">
                <h3>Start Creating</h3>
                <p>开始您的创作之旅</p>
                <button className="btn-start-creating">立即开始</button>
              </div>
            </div>
          </div>
        </section>

        {/* 热门作品区域 */}
        <section className="hot-pick-section">
          <div className="section-header">
            <h2 className="section-title">热门作品 Hot Pick</h2>
            <a href="#" className="view-more">查看更多</a>
          </div>
          <div className="hot-pick-grid">
            <div className="hot-card large">
              <div className="card-image">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20sci-fi%20cityscape%20architecture%2C%20cyberpunk%20style%2C%20neon%20lights%2C%20dark%20atmosphere&image_size=landscape_16_9" alt="未来城市" />
              </div>
              <div className="card-overlay">
               
              </div>
            </div>
            <div className="hot-card">
              <div className="card-image">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20black%20high%20heel%20shoes%2C%20elegant%20design%2C%20fashion%20photography&image_size=square" alt="奢华高跟鞋" />
              </div>
              <div className="card-overlay">
                
              </div>
            </div>
            <div className="hot-card">
              <div className="card-image">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20leather%20handbag%2C%20brown%20texture%2C%20high%20fashion%20accessory&image_size=square" alt="奢华手袋" />
              </div>
              <div className="card-overlay">
                
              </div>
            </div>
            <div className="hot-card">
              <div className="card-image">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20sneakers%20design%2C%20modern%20athletic%20shoes%2C%20premium%20materials&image_size=square" alt="运动鞋设计" />
              </div>
              <div className="card-overlay">
                
              </div>
            </div>
            <div className="start-creating-card green">
              <div className="creating-content">
                <h3>Start Creating</h3>
                <p>探索更多可能性</p>
                <button className="btn-start-creating">开始创作</button>
              </div>
            </div>
          </div>
        </section>

        {/* 服务特色区域 */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">服务特色 Our Features</h2>
            
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
                </svg>
              </div>
              <h3>AI智能设计</h3>
              <p>运用先进的人工智能算法，分析时尚趋势和用户偏好，生成独特的设计方案</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
                </svg>
              </div>
              <h3>个性化定制</h3>
              <p>根据您的身材、喜好和场合需求，提供量身定制的设计解决方案</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/>
                </svg>
              </div>
              <h3>3D可视化</h3>
              <p>提供高质量的3D建模和渲染，让您在制作前就能看到最终效果</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" fill="white"/>
                </svg>
              </div>
              <h3>快速迭代</h3>
              <p>支持快速修改和优化设计，多版本对比，确保最佳设计效果</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="white"/>
                </svg>
              </div>
              <h3>专业建议</h3>
              <p>基于行业经验和市场数据，提供专业的设计建议和趋势分析</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z" fill="white"/>
                </svg>
              </div>
              <h3>多平台支持</h3>
              <p>支持Web、移动端等多平台访问，随时随地进行设计创作</p>
            </div>
          </div>
         </section>

         

          {/* 用户评价区域 */}
          <section className="testimonials-section">
            <div className="section-header">
              <h2 className="section-title">用户评价 Testimonials</h2>
              
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p>"Star Shadows的AI设计服务真的让我惊艳！作为一个时尚博主，我经常需要独特的服装设计灵感。这个平台不仅提供了创新的设计方案，还能根据我的个人风格进行定制。强烈推荐！"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20young%20asian%20woman%2C%20fashion%20blogger%2C%20elegant%20style&image_size=square" alt="李小雅" />
                  </div>
                  <div className="author-info">
                    <div className="author-name">李小雅</div>
                    <div className="author-title">时尚博主</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p>"作为珠宝设计师，我一直在寻找新的创作灵感。Star Shadows的AI珠宝设计功能给了我很多意想不到的创意。特别是3D预览功能，让我能够在制作前就看到最终效果。"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20middle-aged%20man%2C%20jewelry%20designer%2C%20creative%20artist&image_size=square" alt="王大明" />
                  </div>
                  <div className="author-info">
                    <div className="author-name">王大明</div>
                    <div className="author-title">珠宝设计师</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p>"我是一名美妆师，经常需要为客户设计独特的妆容。Star Shadows的AI美妆设计帮助我快速生成创意方案，大大提高了我的工作效率。客户们都很满意！"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20young%20woman%2C%20makeup%20artist%2C%20beauty%20professional&image_size=square" alt="张美丽" />
                  </div>
                  <div className="author-info">
                    <div className="author-name">张美丽</div>
                    <div className="author-title">专业美妆师</div>
                  </div>
                </div>
              </div>
            </div>
           </section>

           {/* 设计流程区域 */}
           <section className="process-section">
             <div className="section-header">
               <h2 className="section-title">设计流程 Design Process</h2>
               
             </div>
             <div className="process-container">
               <div className="process-step">
                 <div className="step-number">01</div>
                 <div className="step-icon">
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#a855f7"/>
                   </svg>
                 </div>
                 <h3>需求描述</h3>
                 <p>详细描述您的设计需求，包括风格偏好、使用场合、预算范围等信息</p>
               </div>
               <div className="process-arrow">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="#a855f7"/>
                 </svg>
               </div>
               <div className="process-step">
                 <div className="step-number">02</div>
                 <div className="step-icon">
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#a855f7"/>
                   </svg>
                 </div>
                 <h3>AI分析</h3>
                 <p>我们的AI系统分析您的需求，结合时尚趋势和设计原理，生成初步方案</p>
               </div>
               <div className="process-arrow">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="#a855f7"/>
                 </svg>
               </div>
               <div className="process-step">
                 <div className="step-number">03</div>
                 <div className="step-icon">
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#a855f7"/>
                   </svg>
                 </div>
                 <h3>方案优化</h3>
                 <p>根据您的反馈进行方案调整和优化，确保设计完全符合您的期望</p>
               </div>
               <div className="process-arrow">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="#a855f7"/>
                 </svg>
               </div>
               <div className="process-step">
                 <div className="step-number">04</div>
                 <div className="step-icon">
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#a855f7"/>
                   </svg>
                 </div>
                 <h3>交付成果</h3>
                 <p>提供高质量的设计文件，包括3D效果图、技术规格和制作建议</p>
               </div>
             </div>
           </section>

           {/* 最新资讯区域 */}
           <section className="news-section">
             <div className="section-header">
               <h2 className="section-title">最新资讯 Latest News</h2>
               
             </div>
             <div className="news-container">
               <div className="news-card featured">
                 <div className="news-image">
                   <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="2024春夏时尚趋势" />
                 </div>
                 <div className="news-content">
                   <div className="news-meta">
                     <span className="news-category">时尚趋势</span>
                     <span className="news-date">2024-01-15</span>
                   </div>
                   <h3>2024春夏时尚趋势：AI设计引领未来</h3>
                   <p>探索人工智能如何重新定义时尚设计，从概念到成品的全新创作流程正在改变整个行业...</p>
                   <a href="#" className="read-more">阅读更多 →</a>
                 </div>
               </div>
               <div className="news-grid">
                 <div className="news-card">
                   <div className="news-image">
                     <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="珠宝设计技巧" />
                   </div>
                   <div className="news-content">
                     <div className="news-meta">
                       <span className="news-category">设计技巧</span>
                       <span className="news-date">2024-01-12</span>
                     </div>
                     <h3>珠宝设计中的黄金比例运用</h3>
                     <p>了解如何在珠宝设计中运用数学美学，创造出令人惊艳的作品...</p>
                     <a href="#" className="read-more">阅读更多 →</a>
                   </div>
                 </div>
                 <div className="news-card">
                   <div className="news-image">
                     <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="彩妆趋势" />
                   </div>
                   <div className="news-content">
                     <div className="news-meta">
                       <span className="news-category">美妆趋势</span>
                       <span className="news-date">2024-01-10</span>
                     </div>
                     <h3>个性化彩妆：AI定制你的专属妆容</h3>
                     <p>通过面部识别和色彩分析，为每个人量身定制最适合的妆容方案...</p>
                     <a href="#" className="read-more">阅读更多 →</a>
                   </div>
                 </div>
                 <div className="news-card">
                   <div className="news-image">
                     <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="可持续时尚" />
                   </div>
                   <div className="news-content">
                     <div className="news-meta">
                       <span className="news-category">可持续发展</span>
                       <span className="news-date">2024-01-08</span>
                     </div>
                     <h3>可持续时尚：环保材料的创新应用</h3>
                     <p>探索如何在保持美观的同时，选择对环境友好的材料和工艺...</p>
                     <a href="#" className="read-more">阅读更多 →</a>
                   </div>
                 </div>
               </div>
             </div>
           </section>



           {/* FAQ常见问题区域 */}
           <section className="faq-section">
             <div className="section-header">
               <h2 className="section-title">常见问题 FAQ</h2>
               
             </div>
             <div className="faq-container">
               <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                 <div className="faq-question" onClick={() => toggleFaq(0)}>
                   <h3>AI设计的质量如何保证？</h3>
                   <span className="faq-toggle">+</span>
                 </div>
                 <div className="faq-answer">
                   <p>我们的AI系统经过大量专业设计作品训练，结合资深设计师的审核和优化，确保每个设计方案都符合行业标准和美学要求。同时提供多轮修改服务，直到您满意为止。</p>
                 </div>
               </div>
               <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                 <div className="faq-question" onClick={() => toggleFaq(1)}>
                   <h3>设计周期需要多长时间？</h3>
                   <span className="faq-toggle">+</span>
                 </div>
                 <div className="faq-answer">
                   <p>根据设计复杂度不同，一般情况下：简单设计1-2个工作日，中等复杂度3-5个工作日，高复杂度定制设计7-10个工作日。紧急项目可提供加急服务。</p>
                 </div>
               </div>
               <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                 <div className="faq-question" onClick={() => toggleFaq(2)}>
                   <h3>支持哪些设计类型？</h3>
                   <span className="faq-toggle">+</span>
                 </div>
                 <div className="faq-answer">
                   <p>目前支持服装设计、珠宝设计、彩妆设计三大类别。包括但不限于：休闲装、正装、礼服、项链、戒指、耳环、日常妆、晚宴妆、主题妆等各种细分领域。</p>
                 </div>
               </div>
               <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                 <div className="faq-question" onClick={() => toggleFaq(3)}>
                   <h3>价格如何计算？</h3>
                   <span className="faq-toggle">+</span>
                 </div>
                 <div className="faq-answer">
                   <p>我们提供灵活的定价方案：基础设计套餐299元起，高级定制1999元起，企业合作可享受批量优惠。具体价格根据设计复杂度、修改次数、交付时间等因素确定。</p>
                 </div>
               </div>
               <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                 <div className="faq-question" onClick={() => toggleFaq(4)}>
                   <h3>设计版权归谁所有？</h3>
                   <span className="faq-toggle">+</span>
                 </div>
                 <div className="faq-answer">
                   <p>设计完成并付款后，设计版权完全归客户所有。我们承诺不会将您的设计用于其他商业用途，并可提供版权证明文件。</p>
                 </div>
               </div>
               <div className={`faq-item ${activeFaq === 5 ? 'active' : ''}`}>
                 <div className="faq-question" onClick={() => toggleFaq(5)}>
                   <h3>如何开始设计项目？</h3>
                   <span className="faq-toggle">+</span>
                 </div>
                 <div className="faq-answer">
                   <p>非常简单！只需注册账户，选择设计类型，填写详细需求描述，上传参考图片（可选），选择服务套餐并付款，我们的AI系统和设计师团队就会开始为您工作。</p>
                 </div>
               </div>
             </div>
           </section>

           {/* 联系我们区域 */}
           <section className="contact-section">
             <div className="section-header">
               <h2 className="section-title">联系我们 Contact US</h2>
               
             </div>
             <div className="contact-container">
               <div className="contact-info">
                 <div className="contact-card">
                   <div className="contact-icon">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                   <h3>电话咨询</h3>
                   <p>400-888-9999</p>
                   <span>工作日 9:00-18:00</span>
                 </div>
                 <div className="contact-card">
                   <div className="contact-icon">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       <polyline points="22,6 12,13 2,6" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                   <h3>邮箱联系</h3>
                   <p>contact@starshadows.ai</p>
                   <span>24小时内回复</span>
                 </div>
                 <div className="contact-card">
                   <div className="contact-icon">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       <circle cx="12" cy="10" r="3" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                   <h3>公司地址</h3>
                   <p>深圳市龙岗区双子塔大厦</p>
                   <span>欢迎预约参观</span>
                 </div>
                 <div className="contact-card">
                   <div className="contact-icon">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                   <h3>在线客服</h3>
                   <p>即时聊天支持</p>
                   <button className="chat-button">开始对话</button>
                 </div>
               </div>
               <div className="contact-form">
                 <h3>发送消息</h3>
                 <form>
                   <div className="form-row">
                     <input type="text" placeholder="您的姓名" required />
                     <input type="email" placeholder="邮箱地址" required />
                   </div>
                   <input type="text" placeholder="主题" required />
                   <textarea placeholder="请描述您的需求或问题..." rows="5" required></textarea>
                   <button type="submit" className="submit-button">发送消息</button>
                 </form>
               </div>
             </div>
           </section>

           {/* 页脚区域 */}
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
                       <li><a href="#">AI服装</a></li>
                       <li><a href="#">AI珠宝</a></li>
                       <li><a href="#">AI美妆</a></li>
                     </ul>
                   </div>
                   
                  
                   
                   <div className="footer-column">
                     <h4>支持帮助</h4>
                     <ul>
                       <li><a href="#">使用教程</a></li>
                       <li><a href="#">常见问题</a></li>
                       <li><a href="#">技术支持</a></li>
                       <li><a href="#">联系客服</a></li>
                       <li><a href="#">意见反馈</a></li>
                     </ul>
                   </div>
                   
                   <div className="footer-column">
                     <h4>关于我们</h4>
                     <ul>
                       <li><a href="#">公司介绍</a></li>
                       <li><a href="#">发展历程</a></li>
                       <li><a href="#">加入我们</a></li>
                       
                      
                     </ul>
                   </div>
                 </div>
               </div>
               
               <div className="footer-bottom">
                 <div className="footer-bottom-content">
                   <div className="copyright">
                     <p>&copy; 2024 AI Designer. 保留所有权利。</p>
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
         </main>
       </div>
     );
   };

export default AIDesignerHome;