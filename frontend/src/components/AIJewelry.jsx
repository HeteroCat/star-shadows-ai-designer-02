import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './AIJewelry.css';

const AIJewelry = ({ onBack }) => {
  const [formData, setFormData] = useState({
    description: '',
    style: '',
    material: '',
    gemstone: '',
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
    if (e) e.preventDefault();
    
    if (!formData.description.trim()) {
      alert('请输入设计描述');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch('http://localhost:8000/api/designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'jewelry',
          description: formData.description,
          style: formData.style,
          color: `${formData.material} ${formData.gemstone}`,
          model: formData.model
        }),
      });

      if (!response.ok) {
        throw new Error('生成失败');
      }

      const result = await response.json();
      setGeneratedImage(result.image_url);
      
      // 添加到设计历史
      setDesigns(prev => [result, ...prev]);
      
    } catch (error) {
      console.error('生成错误:', error);
      alert('生成失败，请重试');
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
      link.download = `ai-jewelry-${Date.now()}.png`;
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
    { value: '经典优雅', label: '经典优雅' },
    { value: '现代简约', label: '现代简约' },
    { value: '复古华丽', label: '复古华丽' },
    { value: '民族风情', label: '民族风情' },
    { value: '前卫艺术', label: '前卫艺术' },
    { value: '自然有机', label: '自然有机' },
    { value: '几何抽象', label: '几何抽象' }
  ];

  const materialOptions = [
    { value: '', label: '选择材质' },
    { value: '黄金', label: '黄金' },
    { value: '白金', label: '白金' },
    { value: '玫瑰金', label: '玫瑰金' },
    { value: '银', label: '银' },
    { value: '钛金', label: '钛金' },
    { value: '不锈钢', label: '不锈钢' },
    { value: '陶瓷', label: '陶瓷' }
  ];

  const gemstoneOptions = [
    { value: '', label: '选择宝石' },
    { value: '钻石', label: '钻石' },
    { value: '红宝石', label: '红宝石' },
    { value: '蓝宝石', label: '蓝宝石' },
    { value: '祖母绿', label: '祖母绿' },
    { value: '珍珠', label: '珍珠' },
    { value: '翡翠', label: '翡翠' },
    { value: '紫水晶', label: '紫水晶' },
    { value: '海蓝宝石', label: '海蓝宝石' },
    { value: '无宝石', label: '无宝石' }
  ];

  const modelOptions = [
    { value: 'doubao', label: '豆包 AI' },
    { value: 'google', label: '谷歌 AI' }
  ];

  return (
    <div className="ai-jewelry">
      <Header />
      <div className="jewelry-header">
        <h1>AI珠宝设计</h1>
        
      </div>

      <div className="jewelry-container">
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
                placeholder="请描述您想要的珠宝设计，例如：一枚精致的订婚戒指，镶嵌着闪亮的钻石..."
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
                <label htmlFor="material">主要材质</label>
                <select
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                >
                  {materialOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gemstone">宝石类型</label>
                <select
                  id="gemstone"
                  name="gemstone"
                  value={formData.gemstone}
                  onChange={handleInputChange}
                >
                  {gemstoneOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                <img src={generatedImage} alt="生成的珠宝设计" />
                <div className="image-actions">
                  <button className="download-btn" onClick={handleDownload}>下载图片</button>
                  <button className="regenerate-btn" onClick={handleSubmit}>
                    重新生成
                  </button>
                </div>
              </div>
            ) : (
              <div className="placeholder">
                <div className="placeholder-icon">💎</div>
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
                    <span className="history-material">{formData.material}</span>
                    <span className="history-gemstone">{formData.gemstone}</span>
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

export default AIJewelry;