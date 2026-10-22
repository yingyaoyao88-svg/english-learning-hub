# 英语学习导航 (English Learning Hub) 🧭

<div align="center">

<a href="https://imaomyying.com/#/project/english-learning-hub" target="_blank">
  <img src="https://img.shields.io/badge/🌐_在线演示与产品介绍展示页-Live_Showcase_&_Interactive_Sandbox-38bdf8?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Showcase & Interactive Sandbox" />
</a>

<br/>
<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2_(App_Router)-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare D1](https://img.shields.io/badge/Cloudflare_D1-SQLite_at_Edge-f38020.svg?style=flat-square&logo=cloudflare)](https://developers.cloudflare.com/d1/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.38-c5f74f.svg?style=flat-square)](https://orm.drizzle.team/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**面向成人自学者的精选英语学习资源导航与社区共建平台**  
*极速边缘架构 · 多维分级筛选 · 免登录共建投稿 · 安全审核流*

---

### 🌐 [点击进入产品在线介绍展示页 (Live Interactive Showcase)](https://imaomyying.com/#/project/english-learning-hub)
可在展示页内直接操作**实时多维检索沙盒**、体验**免登录投稿流程**，并查看**边缘架构与审核流流水线**！

---

</div>

## 📖 项目背景与初衷

成年人自学英语常常陷入以下困境：
1. **信息碎片化严重**：在各大社交媒体上收藏了成百上千篇“英语资源合集”，但真正要用时链接失效、广告泛滥，无法快速定位；
2. **缺乏科学难度分级**：许多推荐素材难度跨度极大（从低幼儿歌直接跳跃到经济学人原版），缺乏针对零基础、进阶磨耳朵与职场实战的阶梯式筛选；
3. **缺少开放的社区共创机制**：大量低调优秀的冷门学习网站散落在民间自学者手中，缺乏一个纯净、无商业推广打扰的共建索引库。

**English Learning Hub** 应运而生。它致力于成为成人英语自学者的第一站导航索引，汇集听力磨耳朵、口语发音、原版泛读与 AI 提效工具，打造一个真正好用、干净且持久维护的学习入口。

---

## 🌟 核心特性与架构亮点

- **⚡ 多维立体检索沙盒**
  - 支持关键词实时毫秒级搜索，按**技能分类**（听力精磨、口语发音、原版泛读、提效工具）、**适用水平**（零基础入门、进阶拓展、高阶挑战）与**价格模式**（完全免费、Freemium）进行多重交叉过滤。
- **🤝 免登录友好投稿生态**
  - 降低社区共建门槛，访客无需繁琐的账号注册，填写资源名称、官方网址及一句真实推荐心得即可一键提交。
  - 前端与服务端双重校验 URL 合法性，并自动去重与清洗。
- **🛡️ 安全可控的 ChatGPT 鉴权后台**
  - 管理员通过 ChatGPT 账号直接鉴权登录管理后台（`/admin`）。
  - 新投稿统一进入 `pending` 待审流，管理员可在后台一键编辑修改、批准发布（`published`）或驳回无价值链接。
- **🚀 Cloudflare Edge + D1 极致低延迟**
  - 全栈边缘部署于 Cloudflare Workers，结合分布式 SQLite 数据库 **Cloudflare D1** 与 **Drizzle ORM**，实现全球 &lt;50ms 极速冷启动，且拥有 0 服务器维护成本。
- **🎨 现代化响应式设计与极致体验**
  - 基于 Next.js 16 (App Router) + React 19 + Tailwind CSS v4 构建，完美适配手机移动端、平板与桌面宽屏，提供免广告打扰的沉浸式纯净体验。

---

## 🏗️ 系统架构设计

```mermaid
flowchart TD
    subgraph Client["访客端 (Web / Mobile)"]
        A["访客浏览 / 检索"] -->|多维分级筛选| B["资源瀑布流展示"]
        C["免登录投稿"] -->|提交 URL & 推荐语| D["表单前置合法性校验"]
    end

    subgraph Edge["Cloudflare 边缘运行时 (Edge Runtime)"]
        E["Next.js 16 App Router\nCloudflare Workers"]
        F["API 路由中间件\n(鉴权 / 频控 / 校验)"]
    end

    subgraph Storage["边缘持久化存储 (Storage & ORM)"]
        G["Drizzle ORM (全链路类型安全)"]
        H[("Cloudflare D1\n分布式 SQLite 数据库")]
    end

    subgraph Admin["管理与审核中心 (/admin)"]
        I["管理员访问"] -->|ChatGPT OAuth 鉴权| J["审核控制台"]
        J -->|审核通过 / 驳回| G
    end

    B <-->|Edge API 获取已发布项 (status=published)| E
    D -->|POST /api/submit (status=pending)| F
    E <--> F
    F <--> G
    G <--> H
```

---

## 🛠️ 技术栈清单

| 层次 / 领域 | 选型技术 | 核心优势 |
| :--- | :--- | :--- |
| **应用框架** | Next.js 16 (App Router) + React 19 | 最新 React Server Components 架构，首屏极致加载速度 |
| **边缘运行时** | Cloudflare Workers & Wrangler | 全球边缘节点分布式解析，零服务器冷启动 |
| **开发与构建** | Vinext + Vite 8 | 毫秒级 HMR 热更新与现代前端产物编译 |
| **编程语言** | TypeScript 5.9 | 端到端全链路类型安全守卫 |
| **数据与 ORM** | Cloudflare D1 + Drizzle ORM | 边缘原生 SQLite，类型安全无反射开销 |
| **样式与组件** | Tailwind CSS v4 + Radix UI + Lucide Icons | 原子化现代样式，极简深色/浅色自适应主题 |
| **测试套件** | Vitest + Testing Library + JSDOM | 覆盖全流程检索、表单校验与无障碍标签验证 |

---

## 🗄️ 数据库设计与审核状态流

数据模型定义于 `db/schema.ts`，由 Drizzle 负责生产级别的安全迁移。

```typescript
// 核心 resources 表结构规范
export const resources = sqliteTable("resources", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),      // listening | speaking | reading | tools
  level: text("level").notNull(),            // beginner | intermediate | advanced | all
  price: text("price").notNull(),            // free | freemium | paid
  status: text("status").notNull(),           // pending | published | rejected
  submittedBy: text("submitted_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  approvedAt: integer("approved_at", { mode: "timestamp" }),
});
```

- **数据安全准则**：公开接口只能查询 `status = 'published'` 的资源，彻底杜绝恶意注入或未审核链接外流。
- **审核状态闭环**：新提交项默认 `pending`，管理员在后台点击「批准」后状态更新为 `published`，边缘节点自动失效旧缓存并秒级同步。

---

## 🚀 本地开发与启动指南

### 环境依赖
- **Node.js**: `>= 22.13.0`
- **包管理器**: `npm` `>= 10.0`
- **Wrangler**: Cloudflare CLI 工具（已内置在项目 devDependencies）

### 快速启动

```bash
# 1. 克隆代码仓库
git clone https://github.com/yingyaoyao88-svg/english-learning-hub.git
cd english-learning-hub

# 2. 安装依赖并准备环境
npm run install:ci

# 3. 生成并执行本地 D1 数据库迁移
npm run db:generate
npm run build

# 4. 初始化本地 SQLite 边缘库
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_safe_rocket_racer.sql

# 5. 启动本地开发服务
npm run dev
```

启动完成后在浏览器打开控制台输出的本地地址（默认 `http://localhost:5173` 或 `http://localhost:3000`）。本地开发环境已内置模拟的 ChatGPT 鉴权凭证。

---

## 🧪 自动化测试与质量验收

```bash
# 执行单元测试与组件测试
npm test

# 生产环境编译打包校验
npm run build
```

**核心验收测试覆盖范围**：
1. **首页核心入口**：资源分类卡片渲染与快速跳转。
2. **多维搜索与筛选**：关键词组合检索、空状态容错与一键重置。
3. **免登录投稿表单**：输入合法性校验、URL 协议补全（自动补齐 `https://`）与 XSS 防护。
4. **后台审核流**：待审状态流转、编辑更新与已发布列表动态刷新。

---

## ⚙️ 环境变量配置

在生产环境或托管平台中配置以下环境变量（本地开发已提供默认 mock 配置）：

| 变量名 | 说明 | 示例 / 默认值 |
| :--- | :--- | :--- |
| `ADMIN_EMAIL` | 指定允许登录审核后台的管理员 ChatGPT 邮箱 | `your-email@example.com` |
| `CLOUDFLARE_D1_DATABASE_ID` | Cloudflare 生产环境 D1 数据库绑定的 ID | `d1-db-uuid-xxxx` |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号凭证 ID | `cf-account-id` |

---

## 🤝 参与贡献

我们极其欢迎任何形式的贡献，无论是提交 Bug 反馈、完善文档，还是提出新的实用功能！

1. **Fork** 本代码仓库并克隆到本地
2. 新建特性分支：`git checkout -b feat/your-feature-name`
3. 提交代码修改并确保通过测试：`npm test` 与 `npm run build`
4. 提交规范的 Commit 记录（推荐遵循 [Conventional Commits](https://www.conventionalcommits.org/)）
5. 推送分支并向 `main` 分支发起 Pull Request

---

## 💬 交流与社群联系

欢迎扫码添加作者微信（微信号：`15038098595`，添加请备注 GitHub 项目名），交流英语自学方法、AI 提效工具或独立全栈开发经验：

<div align="center">
  <img src="https://imaomyying.com/wechat-qrcode.jpg" width="220" alt="小A 微信二维码" />
  <p><b>扫码添加作者微信好友（微信号：15038098595）</b></p>
</div>

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 协议开源。欢迎自由学习、分享与二开使用。

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://imaomyying.com">@AomyYing (小A)</a> · 让自学英语不再迷茫</sub>
</div>
