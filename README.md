# Star Shadows AI Designer

<div align="center">
  <h2>🌟 AI 驱动的设计工具平台</h2>
  <p>基于 Next.js 14 构建的智能设计助手，支持服装、珠宝和美妆设计</p>

  [![Next.js](https://img.shields.io/badge/Next.js-14.2.13-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## ✨ 功能特性

### 🎨 AI 设计模块
- **服装设计** - 基于描述生成时尚服装设计图
- **珠宝设计** - 创建精美的珠宝首饰设计
- **美妆设计** - 生成专业的美妆造型方案
- **作品展示** - 浏览和管理所有设计作品

### 🤖 AI 生成能力
- **文生图 (t2i)** - 基于文本描述生成高质量图片
- **多图融合 (maximages)** - 融合多张图片创建新设计
- **智能编辑 (edit_base64)** - 基于现有图片进行 AI 编辑
- **快速生成 (nano)** - 轻量级模型快速生成设计稿

### 🚀 技术亮点
- Next.js 14 App Router 架构
- TypeScript 全栈类型安全
- 响应式设计，移动端友好
- API 路由集成 DMX AI 服务
- 内存会话管理

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **UI 库**: React 18 + CSS Modules
- **AI 服务**: DMX API
- **部署平台**: Vercel
- **开发工具**: ESLint

## 📦 快速开始

### 环境要求
- Node.js >= 18.17.0
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/star-shadows-ai-designer.git
cd star-shadows-ai-designer
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
复制环境变量示例文件：
```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，填入您的 API 密钥：
```env
DMX_API_KEY=your_dmx_api_key_here
```

📝 **获取 DMX API Key**：
- 访问 [DMX API 官网](https://www.dmxapi.cn/)
- 注册账号并获取 API Key
- 将 API Key 填入 `.env.local` 文件中

4. **启动开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🎯 使用指南

### 1. 首页导航
- 打开应用后，您会看到功能导航页面
- 选择您需要的设计类型：服装、珠宝或美妆

### 2. AI 设计流程
1. **描述需求** - 输入您的设计要求和风格偏好
2. **选择参数** - 设置颜色、风格和生成模式
3. **生成设计** - AI 将根据您的要求生成设计图
4. **保存作品** - 将满意的设计保存到作品集

### 3. 作品管理
- 在作品展示页面查看所有生成的设计
- 支持下载和分享功能

## 🔧 开发指南

### 项目结构
```
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── clothing/          # 服装设计页面
│   ├── jewelry/           # 珠宝设计页面
│   ├── makeup/            # 美妆设计页面
│   ├── gallery/           # 作品展示页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
├── lib/                   # 工具库
├── public/               # 静态资源
├── .env.local.example    # 环境变量示例文件
└── README.md
```

### 开发命令
```bash
# 开发环境
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

### API 端点
- `POST /api/designs` - 创建新设计
- `GET /api/designs` - 获取设计列表
- `POST /api/generate-image` - 生成 AI 图片
- `GET /api/images` - 获取图片列表
- `GET /api/health` - 健康检查

## 🌐 部署

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量 `DMX_API_KEY`
4. 自动部署完成

### 手动部署
```bash
npm run build
npm start
```

## 🔐 环境配置

### 必需环境变量
- `DMX_API_KEY` - DMX API 密钥（必需）

### 可选环境变量
- `ARK_API_KEY` - 备用 API 密钥

## 🎨 设计示例

### 服装设计提示词示例
```
"优雅的晚礼服，深蓝色，丝绸材质，现代简约风格，适合正式场合"
```

### 珠宝设计提示词示例
```
"精致的钻石项链，白金镶嵌，花朵造型，优雅奢华"
```

### 美妆设计提示词示例
```
"自然清透的日妆，大地色系，适合日常通勤，温柔气质"
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [DMX API](https://www.dmxapi.cn/) - AI 图片生成服务
- [Vercel](https://vercel.com/) - 部署平台

## 📞 联系方式

- 项目主页: [GitHub Repository](https://github.com/your-username/star-shadows-ai-designer)
- 问题反馈: [Issues](https://github.com/your-username/star-shadows-ai-designer/issues)
- 邮箱: your-email@example.com

---

<div align="center">
  <p>用 AI 点燃创意火花 ✨</p>
  <p>Made with ❤️ by Star Shadows Team</p>
</div>