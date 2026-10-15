# 英语学习导航 (English Learning Hub)

<p align="left">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/node-%3E%3D22.13.0-brightgreen.svg" alt="Node.js: >=22.13.0" />
  <img src="https://img.shields.io/badge/Next.js-16.2-black.svg" alt="Next.js: 16.2" />
  <img src="https://img.shields.io/badge/React-19.2-61dafb.svg" alt="React: 19.2" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue.svg" alt="TypeScript: 5.9" />
  <img src="https://img.shields.io/badge/Vite-8.0-646cff.svg" alt="Vite: 8.0" />
</p>

面向成人自学者的精选英语学习资源导航站。公开页面提供搜索、分类、水平和价格筛选；访客可以免登录推荐网站；管理员通过 ChatGPT 登录审核、编辑、批准或拒绝投稿。

---

## 🌟 核心特性

- **多维资源检索**：支持关键词实时搜索，提供分类、适用水平（零基础/进阶等）及价格模式（免费/付费/Freemium）的多维度组合筛选。
- **免登录友好投稿**：学习者和访客无需注册登录即可提交推荐优质学习资源，表单自带完善的字段与网址有效性校验。
- **安全审核后台**：通过 ChatGPT 账号鉴权登录管理后台（`/admin`），支持对待审核资源进行快速编辑、一键批准或驳回。
- **现代化响应式 UI**：采用 Tailwind CSS v4 与 shadcn/ui 组件库，完美适配桌面端、平板与移动端。
- **类型安全与持久化**：使用 TypeScript + Drizzle ORM 操作 Cloudflare D1 / SQLite 数据库，全流程严格保障数据类型安全。

---

## 🛠️ 技术栈

| 层次 / 领域 | 技术方案 |
| :--- | :--- |
| **框架与运行时** | Next.js 16 (App Router) + React 19 + Node.js 22 |
| **开发与构建** | Vinext + Vite 8 + Cloudflare Workers / Wrangler |
| **语言与类型** | TypeScript 5.9 |
| **样式与组件** | Tailwind CSS v4 + Radix UI + shadcn/ui + Lucide Icons |
| **数据与 ORM** | Drizzle ORM + Cloudflare D1 (SQLite) |
| **测试套件** | Vitest + Testing Library + JSDOM |
| **部署托管** | Vercel / Cloudflare Workers |

---

## 🚀 本地运行

```powershell
npm run install:ci
npm run db:generate
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_safe_rocket_racer.sql
npm run dev
```

打开开发服务器输出的本地地址。开发环境使用 Sites 提供的模拟 ChatGPT 登录账号。

---

## ✅ 验证

```powershell
npm test
npm run build
```

测试覆盖首页核心入口、资源搜索筛选、投稿字段和网址校验，以及投稿表单的可访问标签。完整人工验收流程：提交一个唯一网址，进入 `/admin` 登录，在待审核列表中编辑并批准，然后回到首页确认资源可搜索。

---

## 🗄️ 数据与审核

数据库结构定义在 `db/schema.ts`，生产迁移由 Drizzle 生成到 `drizzle/`。不要在运行时创建或修改表结构。公开资源接口只返回 `published` 状态；新投稿始终以 `pending` 状态创建。

可选的 `ADMIN_EMAIL` 环境变量用于把审核后台限制到一个指定的 ChatGPT 账号。生产值应通过 Sites 的运行时环境配置保存，不要写入源码或提交真实邮箱配置。

---

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request 来完善本资源导航站！

1. Fork 本仓库并克隆到本地
2. 创建特性分支：`git checkout -b feat/your-feature-name`
3. 提交代码更改并确保格式与测试通过：`npm run lint` 与 `npm test`
4. 提交 Commit（推荐遵循 Conventional Commits 规范）
5. 推送分支并向 `main` 分支发起 Pull Request

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 许可协议开源。
