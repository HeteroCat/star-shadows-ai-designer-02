import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './AIMakeup.css';

const AIMakeup = ({ onBack }) => {
  const [formData, setFormData] = useState({
    description: '',
    style: '',
    occasion: '',
    skinTone: '',
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
          type: 'makeup',
          description: formData.description,
          style: formData.style,
          color: `${formData.occasion} ${formData.skinTone}`,
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
      link.download = `ai-makeup-${Date.now()}.png`;
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
    { value: '自然清新', label: '自然清新' },
    { value: '优雅经典', label: '优雅经典' },
    { value: '时尚前卫', label: '时尚前卫' },
    { value: '复古怀旧', label: '复古怀旧' },
    { value: '甜美可爱', label: '甜美可爱' },
    { value: '性感魅惑', label: '性感魅惑' },
    { value: '艺术创意', label: '艺术创意' }
  ];

  const occasionOptions = [
    { value: '', label: '选择场合' },
    { value: '日常生活', label: '日常生活' },
    { value: '职场商务', label: '职场商务' },
    { value: '约会聚会', label: '约会聚会' },
    { value: '婚礼庆典', label: '婚礼庆典' },
    { value: '晚宴派对', label: '晚宴派对' },
    { value: '舞台表演', label: '舞台表演' },
    { value: '摄影拍照', label: '摄影拍照' }
  ];

  const skinToneOptions = [
    { value: '', label: '选择肤色' },
    { value: '冷白皮', label: '冷白皮' },
    { value: '暖白皮', label: '暖白皮' },
    { value: '自然肤色', label: '自然肤色' },
    { value: '小麦色', label: '小麦色' },
    { value: '深色肌肤', label: '深色肌肤' }
  ];

  const modelOptions = [
    { value: 'doubao', label: '豆包 AI' },
    { value: 'google', label: '谷歌 AI' }
  ];

  return (
    <div className="ai-makeup">
      <Header />
      <div className="makeup-header">
        <h1>AI美妆设计</h1>
        
      </div>

      <div className="makeup-container">
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
                placeholder="请描述您想要的美妆效果，例如：一个精致的烟熏妆，突出眼部轮廓..."
                rows={4}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="style">妆容风格</label>
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
                <label htmlFor="occasion">适用场合</label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                >
                  {occasionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="skinTone">肤色类型</label>
                <select
                  id="skinTone"
                  name="skinTone"
                  value={formData.skinTone}
                  onChange={handleInputChange}
                >
                  {skinToneOptions.map(option => (
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
                <img src={generatedImage} alt="生成的美妆设计" />
                <div className="image-actions">
                  <button className="download-btn" onClick={handleDownload}>下载图片</button>
                  <button className="regenerate-btn" onClick={handleSubmit}>
                    重新生成
                  </button>
                </div>
              </div>
            ) : (
              <div className="placeholder">
                <div className="placeholder-icon">💄</div>
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
                    <span className="history-occasion">{formData.occasion}</span>
                    <span className="history-skin">{formData.skinTone}</span>
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

export default AIMakeup;