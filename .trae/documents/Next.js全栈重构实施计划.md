## 现状与变更说明
- 现状：前端为 React+Vite（`frontend/`），后端为 FastAPI（`backend/`），Vercel 仅构建前端。
- 变更：后端无需保留，统一迁移到 Next.js 14（App Router + TypeScript）并在 API 路由里直接对接 DMX 的图片生成/编辑接口。

## 目标
- 前端迁移为 Next.js 文件路由，保留现有路径（`/`、`/clothing`、`/jewelry`、`/makeup`、`/gallery`）。
- API 统一为 Next.js `app/api/*`，以 DMXAPI 作为后端能力来源，不再依赖 Python。
- 部署收敛至 Vercel 单应用，配置环境变量与安全策略。

## 新目录结构
- `next/`（新主应用）
  - `app/`：`page.tsx`、`clothing/page.tsx`、`jewelry/page.tsx`、`makeup/page.tsx`、`gallery/page.tsx`
  - `app/api/`：`designs`、`generate-image`、`download-image`、`images`、`health` 等路由
  - `components/`：迁移的 UI 组件（Client Components）
  - `lib/`：`dmx.ts`（DMX API 封装）、`ai.ts`（提示词拼装与兜底）、`db.ts`（会话内存存储）
  - `public/`：静态与 `pic/`

## 页面迁移
- 将 `frontend/src/App.jsx:26-37` 的路由拆分为 `app/*/page.tsx`，保留导航和引导逻辑；`StarShadowsIntro`、`Header` 等迁移到 `components/`，必要处标注 `"use client"`。

## DMX 接口集成
- Base URL 与鉴权：
  - 使用国内站：`https://www.dmxapi.cn/v1/images/generations`（Bearer Token）
  - 环境变量：`DMX_API_KEY`；必要时支持 `ARK_API_KEY`（文档示例也有引用）
  - 参考文档：
    - 文生图（Seedream）：[doc.dmxapi.cn/img-seedream.html]
    - 多图融合（Seedream MaxImages）：[doc.dmxapi.cn/img-seedream-maximages.html]
    - Base64编辑（Seedream Edit Base64）：[doc.dmxapi.cn/img-seedream-edit-base64.html]
    - 轻量模型（Nano Banana）：[doc.dmxapi.cn/img-nano-banana.html]
- `lib/dmx.ts` 封装：
  - `generateSeedream({ model, prompt, ... })` → POST `/v1/images/generations`
  - `generateSeedreamMaxImages({ model, prompt, image: string[] })`
  - `editSeedreamBase64({ model, prompt, image_base64: string })`
  - `generateNanoBanana({ model, prompt, ... })`（按文档定义字段）
  - 标准返回：统一解析为 `{ imageUrl: string }` 或 `{ images: string[] }`
- 提示词与参数：在 `lib/ai.ts` 里将原有类型描述（服装/珠宝/美妆）拼装为 `prompt`；支持比例、尺寸映射（如 1:1→1328x1328 等文档建议）。

## API 路由实现
- `app/api/designs/route.ts`：
  - `POST`：接收 `type/description/style/color/model`，构建 `prompt`，调用 `lib/dmx`，返回设计对象并入内存列表
  - `GET`：返回列表
- `app/api/designs/[id]/route.ts`：`GET`、`DELETE`
- `app/api/generate-image/route.ts`：互斥选择：
  - `mode: "t2i"` → `generateSeedream`
  - `mode: "maximages"` → `generateSeedreamMaxImages`
  - `mode: "edit_base64"` → `editSeedreamBase64`
  - `mode: "nano"` → `generateNanoBanana`
- `app/api/download-image/route.ts`：支持 Base64 与 URL 下载，设置 `Content-Disposition`
- `app/api/images/route.ts`：读取 `public/pic` 列表
- `app/api/health/route.ts`：返回运行状态

## 数据模型（TypeScript）
- `DesignRequest`、`ImageGenerationRequest`（含 `mode` 与各模式专属参数）、`DownloadRequest`、`DesignResponse`
- 字段与旧版保持一致，新增 `mode` 和 `images/base64` 可选项以支持 DMX 多模态

## 安全与容错
- 密钥：仅放 `.env.local`/Vercel 环境变量；绝不写入代码或日志
- 容错：DMX 调用失败时返回占位图（Node 生成 PNG/SVG），同时在响应里标记 `error`
- 速率与重试：对 429/5xx 做指数退避；日志采样而非全量输出

## 构建与部署
- 开发：`npm run dev`（Next 默认 `3000`）
- 构建：`npm run build`；生产：`npm start`
- Vercel：默认 Next 部署；配置 `DMX_API_KEY` 等环境变量

## 迁移与清理
- 迁移 `frontend/pic/*` → `next/public/pic/*`
- 更新前端 `fetch` 至同源 `/api/*`；删除 Vite 代理与 `vercel.json` 的 SPA 重写
- 按需保留 `backend/` 作为备份，验收后删除

## 验证
- 页面往返导航与表单交互
- API：
  - `POST /api/designs` → 列表含新项
  - `POST /api/generate-image`（四种 `mode`）返回有效图片 URL/数据
  - `POST /api/download-image` 能下载 Base64 与远程资源
  - `GET /api/images` 返回 `public/pic` 列表

## 规范与注释
- 命名：驼峰/帕斯卡
- 注释：为每个文件与函数撰写用途、参数、返回值与异常说明；代码更新同步维护注释

## 里程碑
1. 初始化 Next 应用与目录；接入环境变量
2. 迁移 UI 与路由，打通页面
3. 封装 `lib/dmx.ts` 并实现 `app/api/*`
4. 静态资源迁移与下载接口完善
5. 本地联调与验证；上线 Vercel

确认后我将开始实施，并在关键节点进行演示与验证。