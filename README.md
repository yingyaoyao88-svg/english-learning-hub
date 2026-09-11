# 英语学习导航

面向成人自学者的英语学习资源导航站。公开页面提供搜索、分类、水平和价格筛选；访客可以免登录推荐网站；管理员通过 ChatGPT 登录审核、编辑、批准或拒绝投稿。

## 本地运行

```powershell
npm run install:ci
npm run db:generate
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_safe_rocket_racer.sql
npm run dev
```

打开开发服务器输出的本地地址。开发环境使用 Sites 提供的模拟 ChatGPT 登录账号。

## 验证

```powershell
npm test
npm run build
```

测试覆盖首页核心入口、资源搜索筛选、投稿字段和网址校验，以及投稿表单的可访问标签。完整人工验收流程：提交一个唯一网址，进入 `/admin` 登录，在待审核列表中编辑并批准，然后回到首页确认资源可搜索。

## 数据与审核

数据库结构定义在 `db/schema.ts`，生产迁移由 Drizzle 生成到 `drizzle/`。不要在运行时创建或修改表结构。公开资源接口只返回 `published` 状态；新投稿始终以 `pending` 状态创建。

可选的 `ADMIN_EMAIL` 环境变量用于把审核后台限制到一个指定的 ChatGPT 账号。生产值应通过 Sites 的运行时环境配置保存，不要写入源码或提交真实邮箱配置。
