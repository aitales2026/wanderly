# Wanderly

AI 驱动的中国城市旅行行程规划器

## 项目简介

Wanderly 是一个基于 AI 的旅行规划应用，帮助用户快速生成个性化的中国城市旅行行程。用户只需选择目的地、天数、人数和兴趣偏好，AI 就能生成详细的每日行程安排。

## 功能特性

- 🎯 支持 8 个中国热门旅游城市（北京、上海、成都、重庆、西安、杭州、广州、厦门）
- 🤖 AI 智能生成个性化行程
- 📅 灵活的行程配置（1-7 天，1-10 人）
- 🎨 8 种兴趣偏好选择
- 💰 三种预算级别（经济、舒适、高端）
- 🎭 三种旅行风格（轻松、均衡、特种兵）
- 📱 响应式设计，支持桌面和移动端
- 💾 本地存储保存行程

## 技术栈

- **框架**: Next.js 15.5 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **UI 组件**: shadcn/ui
- **AI SDK**: Vercel AI SDK v7
- **AI Provider**: 火山引擎方舟 (OpenAI 兼容接口)
- **数据验证**: Zod v4
- **部署**: Vercel

## 项目结构

```
wanderly/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 首页
│   ├── trip/page.tsx        # 行程结果页
│   ├── api/
│   │   └── generate-trip/   # AI 行程生成 API
│   ├── layout.tsx           # 根布局
│   └── globals.css          # 全局样式
├── components/
│   ├── home/                # 首页组件
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TripForm.tsx
│   │   ├── DestinationGrid.tsx
│   │   └── PlanningState.tsx
│   └── trip/                # 行程页组件
│       ├── TripClient.tsx
│       ├── TripHero.tsx
│       ├── TripSummary.tsx
│       ├── DayNavigation.tsx
│       ├── DaySection.tsx
│       ├── ActivityCard.tsx
│       └── TravelTips.tsx
├── lib/
│   ├── ai.ts               # AI 集成
│   ├── schema.ts           # Zod 验证模式
│   ├── trip-prompt.ts      # AI 提示词
│   ├── labels.ts           # 标签映射
│   ├── storage.ts          # 本地存储
│   └── images.ts           # 图片映射
├── types/
│   └── trip.ts             # TypeScript 类型定义
├── data/
│   └── destinations.ts     # 城市数据
└── public/
    └── images/             # 静态图片资源
```

## 本地开发

### 环境要求

- Node.js 18+
- npm

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入你的火山引擎方舟 API 配置：

```bash
ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/coding/v3
ARK_API_KEY=your_api_key_here
AI_MODEL=your_model_id_here
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量：
   - `ARK_BASE_URL`
   - `ARK_API_KEY`
   - `AI_MODEL`
4. 点击部署

## 图片资源

项目需要 24 张图片资源：
- 8 个城市的 hero 图片（1920x1080）
- 8 个城市的 card 图片（1000x1250）
- 8 个活动类别的通用图片（1200x900）

请将图片放置在 `public/images/` 目录下：
```
public/images/
├── destinations/
│   ├── beijing/hero.jpg
│   ├── beijing/card.jpg
│   ├── shanghai/hero.jpg
│   ├── shanghai/card.jpg
│   └── ... (其他城市)
└── activities/
    ├── food.jpg
    ├── culture.jpg
    ├── nature.jpg
    ├── nightlife.jpg
    ├── shopping.jpg
    ├── relaxation.jpg
    ├── coffee.jpg
    └── family.jpg
```

## 设计理念

- **温暖**: 使用暖色调背景，避免冷冰冰的 SaaS 风格
- **编辑**: 像旅游杂志一样的排版和视觉层次
- **电影感**: 使用高质量摄影图片，营造旅行氛围
- **留白**: 给内容足够的呼吸空间
- **AI 原生**: AI 交互自然流畅，不刻意强调 AI 属性

## 许可证

MIT
