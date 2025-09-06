import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './AIClothing.css';

const AIClothing = ({ onBack }) => {
  const [formData, setFormData] = useState({
    description: '',
    style: '',
    color: '',
    model: 'doubao'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [designs, setDesigns] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit 被调用');
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      console.log('发送设计请求:', { type: 'clothing', ...formData });
      const response = await fetch('/api/designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'clothing',
          ...formData
        })
      });
      
      console.log('响应状态:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('生成结果:', result);
        setGeneratedImage(result.image_url);
        setDesigns(prev => [result, ...prev]);
      } else {
        const errorText = await response.text();
        console.error('生成失败:', response.status, errorText);
      }
    } catch (error) {
      console.error('请求错误:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) {
      alert('请先生成图片');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/download-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: generatedImage })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-clothing-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请重试');
    }
  };

  const styleOptions = [
    { value: '', label: '选择风格' },
    { value: '现代简约', label: '现代简约' },
    { value: '复古经典', label: '复古经典' },
    { value: '街头潮流', label: '街头潮流' },
    { value: '商务正装', label: '商务正装' },
    { value: '休闲运动', label: '休闲运动' },
    { value: '民族风情', label: '民族风情' },
    { value: '未来科技', label: '未来科技' }
  ];

  const colorOptions = [
    { value: '', label: '选择颜色' },
    { value: '黑色', label: '黑色' },
    { value: '白色', label: '白色' },
    { value: '红色', label: '红色' },
    { value: '蓝色', label: '蓝色' },
    { value: '绿色', label: '绿色' },
    { value: '紫色', label: '紫色' },
    { value: '金色', label: '金色' },
    { value: '银色', label: '银色' },
    { value: '彩色渐变', label: '彩色渐变' }
  ];

  const modelOptions = [
    { value: 'doubao', label: '豆包 AI' },
    { value: 'google', label: '谷歌 AI' }
  ];

  return (
    <div className="ai-clothing">
      <Header />
      <div className="clothing-header">
        <h1>AI服装设计</h1>
       
      </div>

      <div className="clothing-container">
        <div className="design-form">
          <h2>设计参数</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="description">设计描述</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="请描述您想要的服装设计，例如：一件优雅的晚礼服，带有蕾丝装饰..."
                rows={4}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="style">设计风格</label>
                <select
                  id="style"
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                >
                  {styleOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="color">主要颜色</label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="model">AI模型</label>
              <select
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
              >
                {modelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="generate-btn"
              disabled={isGenerating || !formData.description.trim()}
            >
              {isGenerating ? '生成中...' : '生成设计'}
            </button>
          </form>
        </div>

        <div className="preview-area">
          <h2>设计预览</h2>
          <div className="preview-container">
            {isGenerating ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>AI正在为您生成设计...</p>
              </div>
            ) : generatedImage ? (
              <div className="generated-image">
                <img src={generatedImage} alt="生成的服装设计" />
                <div className="image-actions">
                  <button className="download-btn" onClick={handleDownload}>下载图片</button>
                  <button className="regenerate-btn" onClick={handleSubmit}>
                    重新生成
                  </button>
                </div>
              </div>
            ) : (
              <div className="placeholder">
                <div className="placeholder-icon">👗</div>
                <p>请填写设计参数并点击生成</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {designs.length > 0 && (
        <div className="design-history">
          <h2>设计历史</h2>
          <div className="history-grid">
            {designs.map((design, index) => (
              <div key={design.id || index} className="history-item">
                <img src={design.image_url} alt={design.description} />
                <div className="history-info">
                  <p className="history-desc">{design.description}</p>
                  <div className="history-meta">
                    <span className="history-style">{design.style}</span>
                    <span className="history-color">{design.color}</span>
                    <span className="history-model">{design.model}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIClothing;