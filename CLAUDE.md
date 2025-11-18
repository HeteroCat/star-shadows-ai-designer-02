# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Star Shadows AI Designer 是一个基于 Next.js 14 的 AI 设计工具，已从 React+Vite+FastAPI 架构重构为 Next.js 全栈应用。主要功能包括 AI 服装设计、珠宝设计、美妆设计和作品展示。

## 开发命令

```bash
# 安装依赖
npm install

# 开发环境（默认端口 3000）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 项目架构

### 技术栈
- **前端**: Next.js 14 (App Router) + TypeScript + React 18
- **样式**: CSS Modules + 全局样式
- **AI 集成**: DMX API（文生图、多图融合、编辑等功能）
- **部署**: Vercel

### 目录结构
```
app/                    # Next.js App Router
├── api/               # API 路由
│   ├── designs/       # 设计管理 API
│   ├── generate-image/ # AI 图片生成 API
│   ├── download-image/ # 图片下载 API
│   ├── images/        # 图片列表 API
│   └── health/        # 健康检查 API
├── clothing/          # 服装设计页面
├── jewelry/           # 珠宝设计页面
├── makeup/            # 美妆设计页面
├── gallery/           # 作品展示页面
├── layout.tsx         # 根布局
├── page.tsx           # 首页
└── globals.css        # 全局样式

components/            # React 组件
├── AIDesignerHome.jsx # 首页主组件
├── AIClothing.jsx     # 服装设计组件
├── AIJewelry.jsx      # 珠宝设计组件
├── AIMakeup.jsx       # 美妆设计组件
├── Gallery.jsx        # 作品展示组件
├── Header.jsx         # 导航头部
└── StarShadowsIntro.jsx # 介绍组件

lib/                   # 工具库
├── dmx.ts            # DMX API 封装
├── ai.ts             # AI 提示词与参数处理
└── db.ts             # 内存数据库（会话存储）

public/               # 静态资源
└── pic/              # 生成的图片存储
```

## 核心功能

### AI 图片生成模式
项目支持四种 AI 生成模式，通过 DMX API 实现：

1. **t2i** - 文生图（Seedream）：基于文本描述生成图片
2. **maximages** - 多图融合（Seedream MaxImages）：融合多张图片生成新图
3. **edit_base64** - Base64 编辑（Seedream Edit Base64）：基于 Base64 图片进行编辑
4. **nano** - 轻量模型（Nano Banana）：快速生成轻量级图片

### 页面路由
- `/` - AI 设计首页
- `/clothing` - 服装设计页面
- `/jewelry` - 珠宝设计页面
- `/makeup` - 美妆设计页面
- `/gallery` - 作品展示页面

### API 端点
- `POST /api/designs` - 创建新设计
- `GET /api/designs` - 获取设计列表
- `GET/DELETE /api/designs/[id]` - 设计详情/删除
- `POST /api/generate-image` - 生成 AI 图片（支持四种模式）
- `POST /api/download-image` - 下载图片
- `GET /api/images` - 获取图片列表
- `GET /api/health` - 健康检查

## 环境配置

### 必需环境变量
```
DMX_API_KEY=your_dmx_api_key  # DMX API 密钥
```

### 可选环境变量
```
ARK_API_KEY=your_ark_api_key  # 备用 API 密钥
```

## 开发指南

### TypeScript 配置
- 使用路径别名：`@/components/*` 和 `@/lib/*`
- 启用严格模式和增量编译
- 支持 Next.js 插件

### 组件开发
- 使用 Client Components：`"use client"`
- 保持与现有代码风格一致
- 使用中文注释

### API 开发
- 所有 API 路由使用 TypeScript
- 统一错误处理和响应格式
- 支持指数退避重试机制

### 安全原则
- API 密钥仅存储在环境变量中
- 不在代码或日志中暴露敏感信息
- 实现适当的错误边界和容错机制

## 部署

### Vercel 部署
项目配置为 Vercel 自动部署：
- 自动构建 Next.js 应用
- 环境变量需在 Vercel 控制台配置
- 支持自动 SSL 和 CDN

### 构建要求
- Node.js >= 18.17.0
- 自动安装依赖并构建
- 静态资源优化处理