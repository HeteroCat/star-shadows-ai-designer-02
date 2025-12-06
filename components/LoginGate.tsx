'use client';

import { useState } from 'react';

/**
 * 登录门禁组件
 * 简单的密钥验证，只有输入正确密钥才能访问内容
 */
export default function LoginGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ai-magic') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('密钥错误，请重试');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="stars-container">
      <div className="stars-1"></div>
      <div className="stars-2"></div>
      <div className="stars-3"></div>
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: '#f0f0f2',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          padding: '2rem',
        borderRadius: '1rem',
        backgroundColor: '#151518',
        border: '1px solid #232329',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Star Shadows
        </h1>
        <p style={{ marginBottom: '2rem', color: '#9aa0a6' }}>
          请输入访问密钥
        </p>
        
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入密钥..."
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #333',
              backgroundColor: '#0b0b0d',
              color: 'white',
              marginBottom: '1rem',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
          
          {error && (
            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#7c3aed',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
          >
            进入
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}
