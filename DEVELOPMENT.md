# 开发指南

## 开发环境设置

### 1. 克隆项目

```bash
git clone <repository-url>
cd kids-growth-system
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env` 文件：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kids_growth?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. 初始化数据库

```bash
# 生成 Prisma Client
npx prisma generate

# 推送数据库 Schema
npx prisma db push

# 可选：查看数据库
npx prisma studio
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构说明

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── badges/            # 勋章页面
│   ├── breakfast/         # 早餐页面
│   ├── parent/            # 家长模式页面
│   ├── settings/          # 设置页面
│   ├── statistics/        # 统计页面
│   ├── today/             # 今日计划页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/           # React 组件
│   └── ui/               # shadcn/ui 组件
├── data/                 # Mock 数据
├── hooks/                # 自定义 Hooks
├── lib/                  # 工具库
│   ├── animations.ts     # 动画配置
│   ├── prisma.ts         # Prisma 客户端
│   └── utils.ts          # 工具函数
├── store/                # Zustand 状态管理
└── types/                # TypeScript 类型定义
```

## 开发规范

### 代码风格

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用 PascalCase
- 文件使用 kebab-case

### 组件开发

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ComponentProps {
  // props 定义
}

export function Component({ prop }: ComponentProps) {
  const [state, setState] = useState()

  useEffect(() => {
    // 副作用
  }, [])

  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### API Route 开发

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // 业务逻辑
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### 状态管理

使用 Zustand 进行状态管理：

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  // 状态定义
  actions: {
    // 操作定义
  }
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      // 状态和操作
    }),
    { name: 'storage-name' }
  )
)
```

## 数据库操作

### 查询数据

```typescript
const users = await prisma.user.findMany({
  where: { age: { gte: 7 } },
  include: { tasks: true },
})
```

### 创建数据

```typescript
const user = await prisma.user.create({
  data: {
    name: '小明',
    age: 9,
  },
})
```

### 更新数据

```typescript
const user = await prisma.user.update({
  where: { id: userId },
  data: { coins: { increment: 10 } },
})
```

### 删除数据

```typescript
await prisma.user.delete({
  where: { id: userId },
})
```

## 测试

### 单元测试

```bash
npm run test
```

### E2E 测试

```bash
npm run test:e2e
```

## 调试

### 使用 Prisma Studio

```bash
npx prisma studio
```

### 查看日志

开发服务器会输出详细的日志信息。

### 浏览器 DevTools

使用 React DevTools 和 Redux DevTools 调试状态。

## 添加新功能

### 1. 添加新页面

在 `src/app/` 下创建新目录和 `page.tsx` 文件。

### 2. 添加新 API Route

在 `src/app/api/` 下创建新目录和 `route.ts` 文件。

### 3. 添加新组件

在 `src/components/` 下创建新组件文件。

### 4. 添加新类型

在 `src/types/` 下添加类型定义。

### 5. 添加新状态

在 `src/store/` 下创建新的 store 文件。

## 性能优化

### 1. 代码分割

Next.js 自动进行代码分割，可以使用动态导入进一步优化：

```typescript
const Component = dynamic(() => import('./Component'), {
  loading: () => <Loading />,
})
```

### 2. 图片优化

使用 Next.js Image 组件：

```typescript
import Image from 'next/image'

<Image src="/image.jpg" alt="Description" width={500} height={300} />
```

### 3. 缓存策略

使用 React Query 进行数据缓存：

```typescript
const { data } = useQuery({
  queryKey: ['key'],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000, // 5 分钟
})
```

## 常见问题

### 1. Prisma 连接错误

确保 DATABASE_URL 正确，数据库服务器可访问。

### 2. 样式不生效

检查 Tailwind 配置，确保类名正确。

### 3. 动画不流畅

减少动画复杂度，使用 CSS transform 代替布局属性。

### 4. 状态不更新

确保正确使用 Zustand store，检查 persist 配置。

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT
