# Star Shadows - AI设计师平台

一个基于React前端和Python后端的AI设计师平台，提供AI服装、AI珠宝、AI美妆设计服务。

## 项目结构

```
star-shadows/
├── frontend/                    # React前端项目
│   ├── public/                  # 静态资源
│   │   ├── AI服装.png
│   │   ├── AI珠宝.png
│   │   ├── AI美妆.png
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/          # React组件
│   │   │   ├── StarShadowsIntro.jsx    # 星空进入动效页面
│   │   │   ├── StarShadowsIntro.css
│   │   │   ├── AIDesignerHome.jsx      # AI设计师主页
│   │   │   └── AIDesignerHome.css
│   │   ├── assets/              # 静态资源
│   │   ├── App.jsx              # 主应用组件
│   │   ├── App.css
│   │   ├── index.css            # 全局样式
│   │   └── main.jsx             # 应用入口
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/                     # Python后端项目
│   ├── main.py                  # FastAPI主应用
│   └── requirements.txt         # Python依赖
├── .gitignore                   # Git忽略文件
├── .vercelignore               # Vercel部署忽略文件
├── vercel.json                 # Vercel配置
├── DEPLOYMENT.md               # 部署说明
└── README.md                   # 项目说明
```

## 功能特性

### 前端功能
- ✨ 星空动效进入页面
- 🎨 AI设计师主页（无侧边栏设计）
- 👗 AI服装设计模块
- 💎 AI珠宝设计模块
- 💄 AI美妆设计模块
- 📱 响应式设计，支持移动端

### 后端功能
- 🚀 FastAPI框架
- 🔄 CORS跨域支持
- 📝 设计作品CRUD操作
- 🎯 RESTful API设计

## 快速开始

### 前端开发

1. 进入前端目录：
```bash
cd frontend
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

前端将在 http://localhost:5173 运行

### 后端开发

1. 进入后端目录：
```bash
cd backend
```

2. 安装Python依赖：
```bash
pip install -r requirements.txt
```

3. 启动后端服务器：
```bash
python main.py
```

后端将在 http://localhost:8000 运行

## API文档

后端启动后，可以访问以下地址查看API文档：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 主要API端点

- `GET /` - 根路径
- `GET /api/designs` - 获取所有设计作品
- `POST /api/designs` - 创建新的设计作品
- `GET /api/designs/{design_id}` - 获取特定设计作品
- `DELETE /api/designs/{design_id}` - 删除设计作品

## 技术栈

### 前端
- React 18
- Vite
- CSS3 (原生CSS，包含动画效果)
- JavaScript ES6+

### 后端
- Python 3.8+
- FastAPI
- Uvicorn
- Pydantic

## 设计特色

- 🌟 星空主题设计，营造科技感氛围
- 🎭 流畅的页面切换动效
- 🎨 现代简约的UI设计
- 📐 无侧边栏的清爽布局
- 🌈 渐变色彩搭配
- ⚡ 响应式交互体验

## 开发说明

1. 项目采用前后端分离架构
2. 前端使用React + Vite构建
3. 后端使用FastAPI提供RESTful API
4. 支持热重载开发
5. 包含完整的星空动效和现代UI设计

## 部署说明

### 前端部署
```bash
cd frontend
npm run build
```

### 后端部署
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 许可证

MIT License