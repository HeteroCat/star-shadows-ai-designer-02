<div align="center">

# ✨ Star Shadows - AI设计师平台

*一个基于React前端和Python后端的AI设计师平台，提供AI服装、AI珠宝、AI美妆设计服务*

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

[🚀 快速开始](#快速开始) • [📖 API文档](#api文档) • [🎨 功能特性](#功能特性) • [🛠️ 技术栈](#技术栈) • [📦 部署](#部署说明)

</div>

---

## 📋 目录

- [项目概述](#项目概述)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [API文档](#api文档)
- [开发指南](#开发指南)
- [部署说明](#部署说明)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 🌟 项目概述

Star Shadows 是一个现代化的AI设计师平台，致力于为用户提供智能化的设计服务。平台采用前后端分离架构，结合了React的现代前端技术和FastAPI的高性能后端框架，为用户打造流畅的设计体验。

### 🎯 核心价值
- **智能设计**：集成AI技术，提供智能化设计建议
- **多元化服务**：涵盖服装、珠宝、美妆三大设计领域
- **用户体验**：星空主题UI设计，营造沉浸式体验
- **技术先进**：采用最新的前后端技术栈

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

## 🎨 功能特性

### 🖥️ 前端功能
| 功能 | 描述 | 状态 |
|------|------|------|
| ✨ 星空动效进入页面 | 沉浸式星空主题动画效果 | ✅ 已完成 |
| 🎨 AI设计师主页 | 无侧边栏的现代化设计 | ✅ 已完成 |
| 👗 AI服装设计模块 | 智能服装设计与推荐 | ✅ 已完成 |
| 💎 AI珠宝设计模块 | 个性化珠宝设计服务 | ✅ 已完成 |
| 💄 AI美妆设计模块 | 美妆搭配与建议 | ✅ 已完成 |
| 📱 响应式设计 | 完美适配移动端和桌面端 | ✅ 已完成 |
| 🌙 暗黑模式 | 护眼的暗色主题 | 🔄 开发中 |

### ⚙️ 后端功能
| 功能 | 描述 | 技术实现 |
|------|------|----------|
| 🚀 FastAPI框架 | 高性能异步Web框架 | Python + FastAPI |
| 🔄 CORS跨域支持 | 支持前后端分离部署 | FastAPI CORS中间件 |
| 📝 设计作品管理 | 完整的CRUD操作 | RESTful API |
| 🔐 用户认证 | JWT令牌认证机制 | 🔄 开发中 |
| 📊 数据分析 | 设计趋势分析 | 🔄 规划中 |
| 🤖 AI集成 | 智能设计算法 | 🔄 规划中 |

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: >= 16.0.0
- **Python**: >= 3.8
- **npm**: >= 8.0.0
- **Git**: 最新版本

### 🔧 安装步骤

#### 1️⃣ 克隆项目
```bash
git clone https://github.com/your-username/star-shadows.git
cd star-shadows
```

#### 2️⃣ 前端开发环境

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

🌐 前端服务将在 **http://localhost:5173** 运行

#### 3️⃣ 后端开发环境

```bash
# 进入后端目录
cd backend

# 创建虚拟环境（推荐）
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 安装Python依赖
pip install -r requirements.txt

# 启动后端服务器
python main.py
```

🔗 后端服务将在 **http://localhost:8000** 运行

### ⚡ 一键启动脚本

为了简化开发流程，你可以创建启动脚本：

**Windows (start.bat)**
```batch
@echo off
start cmd /k "cd frontend && npm run dev"
start cmd /k "cd backend && python main.py"
```

**macOS/Linux (start.sh)**
```bash
#!/bin/bash
gnome-terminal -- bash -c "cd frontend && npm run dev; exec bash"
gnome-terminal -- bash -c "cd backend && python main.py; exec bash"
```

## 📖 API文档

后端启动后，可以访问以下地址查看详细的API文档：

| 文档类型 | 访问地址 | 描述 |
|----------|----------|------|
| 🔍 **Swagger UI** | [http://localhost:8000/docs](http://localhost:8000/docs) | 交互式API文档，支持在线测试 |
| 📚 **ReDoc** | [http://localhost:8000/redoc](http://localhost:8000/redoc) | 美观的API文档展示 |
| 📋 **OpenAPI Schema** | [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json) | API规范的JSON格式 |

### 🔗 主要API端点

#### 基础接口
```http
GET  /                          # 根路径，健康检查
GET  /health                    # 服务健康状态
```

#### 设计作品管理
```http
GET    /api/designs             # 获取所有设计作品
POST   /api/designs             # 创建新的设计作品
GET    /api/designs/{design_id} # 获取特定设计作品
PUT    /api/designs/{design_id} # 更新设计作品
DELETE /api/designs/{design_id} # 删除设计作品
```

#### 设计分类
```http
GET    /api/designs/category/clothing  # 获取服装设计
GET    /api/designs/category/jewelry   # 获取珠宝设计
GET    /api/designs/category/makeup    # 获取美妆设计
```

### 📝 API使用示例

#### 创建设计作品
```javascript
const response = await fetch('http://localhost:8000/api/designs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '星空礼服设计',
    category: 'clothing',
    description: '灵感来源于星空的晚礼服设计',
    tags: ['星空', '礼服', '优雅']
  })
});

const design = await response.json();
console.log('创建成功:', design);
```

## 🛠️ 技术栈

### 🎨 前端技术

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| **React** | 18.0+ | 用户界面构建 | [reactjs.org](https://reactjs.org/) |
| **Vite** | 4.0+ | 构建工具和开发服务器 | [vitejs.dev](https://vitejs.dev/) |
| **CSS3** | - | 样式设计和动画效果 | [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| **JavaScript** | ES6+ | 编程语言 | [javascript.info](https://javascript.info/) |
| **React Router** | 6.0+ | 路由管理 | [reactrouter.com](https://reactrouter.com/) |

### ⚙️ 后端技术

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| **Python** | 3.8+ | 编程语言 | [python.org](https://python.org/) |
| **FastAPI** | 0.100+ | Web框架 | [fastapi.tiangolo.com](https://fastapi.tiangolo.com/) |
| **Uvicorn** | 0.20+ | ASGI服务器 | [uvicorn.org](https://uvicorn.org/) |
| **Pydantic** | 2.0+ | 数据验证 | [pydantic.dev](https://pydantic.dev/) |
| **SQLAlchemy** | 2.0+ | ORM数据库操作 | [sqlalchemy.org](https://sqlalchemy.org/) |

### 🔧 开发工具

- **代码编辑器**: VS Code / WebStorm
- **版本控制**: Git
- **包管理**: npm (前端) / pip (后端)
- **API测试**: Postman / Insomnia
- **部署平台**: Vercel / Railway / Docker

## 🎨 设计特色

### 🌌 视觉设计
- **🌟 星空主题**: 独特的星空背景动效，营造科技感氛围
- **🎭 流畅动效**: 精心设计的页面切换和交互动画
- **🎨 现代简约**: 遵循Material Design设计原则
- **📐 清爽布局**: 无侧边栏设计，最大化内容展示区域
- **🌈 渐变配色**: 和谐的色彩搭配，提升视觉体验

### 💻 用户体验
- **⚡ 响应式设计**: 完美适配各种设备尺寸
- **🚀 快速加载**: 优化的资源加载策略
- **♿ 无障碍访问**: 遵循WCAG 2.1标准
- **🔍 直观导航**: 清晰的信息架构和导航设计

## 🔧 开发指南

### 📁 项目架构
```
前后端分离架构
├── 前端 (React + Vite)
│   ├── 组件化开发
│   ├── 状态管理
│   └── 路由管理
└── 后端 (FastAPI)
    ├── RESTful API
    ├── 数据验证
    └── 异步处理
```

### 🔄 开发流程
1. **代码规范**: 使用ESLint + Prettier进行代码格式化
2. **版本控制**: 遵循Git Flow工作流
3. **测试驱动**: 单元测试 + 集成测试
4. **持续集成**: GitHub Actions自动化部署
5. **热重载**: 支持前后端热重载开发

### 📝 代码规范
- **命名规范**: 使用驼峰命名法
- **组件规范**: 函数式组件 + Hooks
- **API规范**: RESTful设计原则
- **注释规范**: JSDoc + Python Docstring

## 📦 部署说明

### 🌐 生产环境部署

#### 前端部署 (Vercel推荐)

```bash
# 构建生产版本
cd frontend
npm run build

# 预览构建结果
npm run preview

# 部署到Vercel
npx vercel --prod
```

#### 后端部署 (Railway/Heroku)

```bash
# 生产环境启动
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT --workers 4

# 或使用Gunicorn (推荐)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
```

### 🐳 Docker部署

#### 前端Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
```

#### 后端Dockerfile
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://...
```

### 🔧 环境变量配置

#### 前端环境变量 (.env)
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_TITLE=Star Shadows
VITE_ENABLE_ANALYTICS=true
```

#### 后端环境变量 (.env)
```env
DATABASE_URL=postgresql://user:password@localhost/dbname
SECRET_KEY=your-secret-key
ALLOWED_ORIGINS=https://your-frontend-domain.com
DEBUG=false
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

### 📋 贡献流程

1. **Fork项目** 到你的GitHub账户
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送分支** (`git push origin feature/AmazingFeature`)
5. **创建Pull Request**

### 📝 提交规范

使用[Conventional Commits](https://conventionalcommits.org/)规范：

```
type(scope): description

[optional body]

[optional footer]
```

**类型说明**:
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 🐛 问题报告

发现bug？请[创建Issue](https://github.com/your-username/star-shadows/issues/new)并包含：

- 🔍 **问题描述**: 清晰描述遇到的问题
- 🔄 **复现步骤**: 详细的复现步骤
- 💻 **环境信息**: 操作系统、浏览器版本等
- 📸 **截图**: 如果适用，请提供截图

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

---

<div align="center">

**如果这个项目对你有帮助，请给我们一个 ⭐️**

[🐛 报告Bug](https://github.com/your-username/star-shadows/issues) • [✨ 请求功能](https://github.com/your-username/star-shadows/issues) • [💬 讨论](https://github.com/your-username/star-shadows/discussions)

 Made with ❤️ by [Your Name](https://github.com/your-username)

</div>