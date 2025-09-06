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

### ⚙️ 后端功能
| 功能 | 描述 | 技术实现 |
|------|------|----------|
| 🚀 FastAPI框架 | 高性能异步Web框架 | Python + FastAPI |
| 🔄 CORS跨域支持 | 支持前后端分离部署 | FastAPI CORS中间件 |
| 🤖 AI图像生成 | 集成豆包和OpenRouter API | 多AI模型支持 |
| 📝 设计作品管理 | 完整的CRUD操作 | RESTful API |

## 🛠️ 技术栈

### 🎨 前端技术
- **React 18+**: 用户界面构建
- **Vite**: 构建工具和开发服务器
- **CSS3**: 样式设计和动画效果
- **JavaScript ES6+**: 编程语言

### ⚙️ 后端技术
- **Python 3.8+**: 编程语言
- **FastAPI**: Web框架
- **Uvicorn**: ASGI服务器
- **豆包API**: AI图像生成服务
- **OpenRouter API**: 多模型AI服务

## 📁 项目结构

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
│   ├── requirements.txt         # Python依赖
│   └── .env                     # 环境变量（已忽略）
├── .gitignore                   # Git忽略文件
├── .vercelignore               # Vercel部署忽略文件
├── vercel.json                 # Vercel配置
├── DEPLOYMENT.md               # 部署说明
└── README.md                   # 项目说明
```

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: >= 16.0.0
- **Python**: >= 3.8
- **npm**: >= 8.0.0
- **Git**: 最新版本

### 🔧 安装步骤

#### 1️⃣ 克隆项目
```bash
git clone <your-repository-url>
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

# 配置环境变量
# 复制 .env.example 到 .env 并填入你的API密钥
cp .env.example .env

# 启动后端服务器
python main.py
```

🔗 后端服务将在 **http://localhost:8000** 运行

### ⚙️ 环境变量配置

在 `backend/.env` 文件中配置以下环境变量：

```env
# AI API配置
DOUBAO_API_KEY=your_doubao_api_key
DOUBAO_API_URL=https://ark.cn-beijing.volces.com/api/v3/images/generations

OPENROUTER_API_KEY=your_openrouter_api_key

# 服务器配置
PORT=8000
HOST=0.0.0.0

# 开发模式
DEBUG=True
```

⚠️ **重要提示**: 请确保不要将包含真实API密钥的 `.env` 文件提交到版本控制系统中。

## 📖 API文档

后端启动后，可以访问以下地址查看详细的API文档：

| 文档类型 | 访问地址 | 描述 |
|----------|----------|------|
| 🔍 **Swagger UI** | [http://localhost:8000/docs](http://localhost:8000/docs) | 交互式API文档，支持在线测试 |
| 📚 **ReDoc** | [http://localhost:8000/redoc](http://localhost:8000/redoc) | 美观的API文档展示 |

### 🔗 主要API端点

```http
GET  /                          # 根路径，健康检查
GET  /health                    # 服务健康状态
POST /generate-image            # AI图像生成接口
```

## 🔧 开发指南

### 📝 代码规范
- **命名规范**: 使用驼峰命名法
- **组件规范**: 函数式组件 + Hooks
- **API规范**: RESTful设计原则
- **注释规范**: JSDoc + Python Docstring

### 🔄 开发流程
1. **代码规范**: 使用ESLint + Prettier进行代码格式化
2. **版本控制**: 遵循Git Flow工作流
3. **环境隔离**: 使用虚拟环境管理Python依赖
4. **热重载**: 支持前后端热重载开发

## 📦 部署说明

### 🌐 生产环境部署

#### 前端部署 (Vercel推荐)

```bash
# 构建生产版本
cd frontend
npm run build

# 部署到Vercel
npx vercel --prod
```

#### 后端部署

```bash
# 生产环境启动
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### 🔧 环境变量配置

生产环境中，请确保正确配置所有必要的环境变量，特别是API密钥和数据库连接信息。

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

1. **Fork项目** 到你的GitHub账户
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送分支** (`git push origin feature/AmazingFeature`)
5. **创建Pull Request**

### 🐛 问题报告

发现bug？请创建Issue并包含：

- 🔍 **问题描述**: 清晰描述遇到的问题
- 🔄 **复现步骤**: 详细的复现步骤
- 💻 **环境信息**: 操作系统、浏览器版本等
- 📸 **截图**: 如果适用，请提供截图

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

---

<div align="center">

**如果这个项目对你有帮助，请给我们一个 ⭐️**

[🐛 报告Bug](../../issues) • [✨ 请求功能](../../issues) • [💬 讨论](../../discussions)

 Made with ❤️ by Star Shadows Team

</div>