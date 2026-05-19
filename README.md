# 成长小树 - 儿童学习成长管理系统

一个适合 7~12 岁儿童使用的学习习惯养成系统，通过积分与成长体系提高持续性，让家长能轻度监督。

## 技术栈

- **Next.js 15** - App Router
- **TypeScript** - 类型安全
- **TailwindCSS** - 样式框架
- **shadcn/ui** - UI 组件库
- **Framer Motion** - 动画库
- **Prisma** - ORM
- **PostgreSQL** - 数据库
- **Zustand** - 状态管理
- **React Query** - 数据获取
- **Recharts** - 图表库

## 核心功能

### 1. 今日计划系统
- 根据固定作息自动生成每日计划
- 支持工作日、周五、周末不同时间表
- 时间轴 UI，支持打卡
- 自动统计完成率
- 支持连续完成 streak

### 2. 积分成长系统
- 任务奖励机制（英语打卡+10，阅读+15，数学+20等）
- 等级系统
- 金币系统
- 成长树系统
- 宠物解锁
- 勋章墙
- 连续签到奖励

### 3. 数据统计页面
- 周完成率
- 月度统计
- 阅读时长
- 英语打卡统计
- 数学完成率
- 睡眠规律
- 折线图、柱状图、热力图

### 4. 早餐规划模块
- 10分钟左右可完成的营养早餐
- 周计划自动生成
- 一键替换
- 收藏功能
- 自动采购清单

### 5. 家长模式
- PIN 码保护
- 查看孩子学习进度
- 查看详细统计
- 修改作息时间
- 设置奖励规则

## 项目结构

```
kids-growth-system/
├── prisma/
│   └── schema.prisma          # 数据库 Schema
├── public/
│   ├── manifest.json           # PWA 配置
│   └── sw.js                   # Service Worker
├── src/
│   ├── app/
│   │   ├── api/                # API Routes
│   │   │   ├── user/
│   │   │   ├── tasks/
│   │   │   ├── checkin/
│   │   │   ├── statistics/
│   │   │   ├── breakfast/
│   │   │   └── reading/
│   │   ├── badges/             # 勋章页面
│   │   ├── breakfast/          # 早餐页面
│   │   ├── parent/             # 家长模式页面
│   │   ├── settings/           # 设置页面
│   │   ├── statistics/         # 统计页面
│   │   ├── today/              # 今日计划页面
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   └── globals.css         # 全局样式
│   ├── components/
│   │   └── ui/                 # shadcn/ui 组件
│   ├── data/
│   │   └── mock.ts             # Mock 数据
│   ├── hooks/
│   │   ├── useTaskCompletion.ts
│   │   ├── useLevelProgress.ts
│   │   └── useStreak.ts
│   ├── lib/
│   │   ├── animations.ts       # 动画配置
│   │   ├── prisma.ts           # Prisma 客户端
│   │   └── utils.ts            # 工具函数
│   ├── store/
│   │   ├── useUserStore.ts
│   │   ├── useTaskStore.ts
│   │   ├── useGrowthStore.ts
│   │   ├── useBreakfastStore.ts
│   │   └── useStatisticsStore.ts
│   └── types/
│       ├── index.ts
│       ├── schedule.ts
│       └── breakfast.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env` 文件：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kids_growth?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. 初始化数据库

```bash
npx prisma generate
npx prisma db push
```

### 4. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 数据库 Schema

### User
- 用户基本信息
- 等级、经验、金币
- 家长模式设置

### DailyTask
- 每日任务
- 任务类型、完成状态
- 积分奖励

### CheckIn
- 签到记录
- 连续打卡天数
- 奖励金币

### Badge
- 勋章定义
- 获得条件

### UserBadge
- 用户获得的勋章

### BreakfastPlan
- 早餐计划
- 周计划配置

### ReadingRecord
- 阅读记录
- 书名、页数、时长

### Streak
- 连续完成记录
- 当前连续、最佳连续

### GrowthTree
- 成长树状态
- 等级、经验、健康值

### Pet
- 宠物系统
- 解锁、等级、快乐值

## UI/UX 特点

- 温暖、高级感的配色
- 柔和的圆角设计
- 流畅的动画效果
- 儿童友好的图标和文案
- 移动端优先的响应式设计
- 深浅色模式支持

## PWA 支持

- 可安装为桌面应用
- 离线缓存
- 推送通知支持
- 响应式图标

## 部署

### Vercel

```bash
npm run build
vercel deploy
```

### Docker

```bash
docker build -t kids-growth .
docker run -p 3000:3000 kids-growth
```

## MVP 开发路线

1. ✅ 项目初始化和配置
2. ✅ 数据库设计
3. ✅ 核心类型定义
4. ✅ 状态管理
5. ✅ API Routes
6. ✅ UI 组件
7. ✅ 页面开发
8. ✅ 动画效果
9. ✅ PWA 配置
10. ✅ Mock 数据

## 许可证

MIT
