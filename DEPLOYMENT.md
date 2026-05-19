# 部署指南

## Vercel 部署（推荐）

### 1. 准备工作

确保你已经：
- 安装了 Node.js 18+
- 注册了 Vercel 账号
- 安装了 Vercel CLI

### 2. 部署步骤

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel
```

### 3. 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 4. 数据库设置

推荐使用 Supabase 或 Neon 作为 PostgreSQL 数据库提供商：

#### Supabase
1. 创建 Supabase 项目
2. 获取数据库连接字符串
3. 在 Vercel 中配置环境变量
4. 运行数据库迁移：

```bash
npx prisma db push
```

#### Neon
1. 创建 Neon 项目
2. 获取连接字符串
3. 配置环境变量
4. 运行数据库迁移

## Docker 部署

### 1. 创建 Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. 构建和运行

```bash
# 构建镜像
docker build -t kids-growth .

# 运行容器
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXT_PUBLIC_APP_URL="http://localhost:3000" \
  kids-growth
```

## 传统服务器部署

### 1. 安装依赖

```bash
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 配置环境变量

创建 `.env` 文件：

```env
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 4. 使用 PM2 运行

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "kids-growth" -- start

# 设置开机自启
pm2 startup
pm2 save
```

### 5. 配置 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 数据库迁移

### 首次部署

```bash
# 生成 Prisma Client
npx prisma generate

# 推送数据库 Schema
npx prisma db push
```

### 后续更新

```bash
# 创建迁移
npx prisma migrate dev --name migration-name

# 在生产环境应用迁移
npx prisma migrate deploy
```

## 监控和日志

### Vercel

Vercel 提供内置的监控和日志功能，可以在 Vercel 控制台查看。

### PM2

```bash
# 查看日志
pm2 logs kids-growth

# 查看状态
pm2 status

# 重启应用
pm2 restart kids-growth
```

## 性能优化

### 1. 启用 CDN

将静态资源上传到 CDN，如 Cloudflare 或 AWS CloudFront。

### 2. 启用缓存

配置 Redis 或 Memcached 来缓存频繁访问的数据。

### 3. 数据库优化

- 添加适当的索引
- 使用连接池
- 定期清理旧数据

## 安全建议

1. 使用 HTTPS
2. 配置 CORS
3. 设置强密码
4. 定期更新依赖
5. 启用速率限制
6. 使用环境变量存储敏感信息

## 故障排查

### 常见问题

1. **数据库连接失败**
   - 检查 DATABASE_URL 是否正确
   - 确认数据库服务器可访问
   - 检查防火墙设置

2. **构建失败**
   - 清除 node_modules 重新安装
   - 检查 Node.js 版本
   - 查看构建日志

3. **PWA 不工作**
   - 确保 manifest.json 正确配置
   - 检查 Service Worker 是否注册
   - 使用 HTTPS（PWA 要求）
