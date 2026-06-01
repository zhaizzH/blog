# zzz's Blog

> 个人技术博客，基于 VitePress + Teek 主题构建，通过 GitHub Actions 自动部署到 GitHub Pages。

博客地址：[https://blog.zhaizz.top](https://blog.zhaizz.top)

## 特性

- **VitePress 驱动** — 使用 VitePress 1.6 作为静态站点生成器
- **Teek 博客主题** — 集成 `vitepress-theme-teek`，提供博客风格首页、文章列表、分类/标签、归档等
- **全屏 Banner** — 6 张背景图轮播，支持打字机风格描述文案
- **壁纸模式** — 一键全屏沉浸式浏览
- **文章贡献图** — 基于 ECharts 的年度文章贡献热力图（归档页）
- **RSS 订阅** — 通过 `vitepress-plugin-rss` 生成 RSS 订阅源
- **追番页面** — 通过 `vitepress-plugin-bangumi` 集成 Bangumi 收藏数据
- **本地搜索** — VitePress 内置本地全文搜索，中文友好
- **响应式设计** — 移动端适配，含独立移动端样式优化
- **代码块增强** — 行号、折叠、语言标签、一键复制
- **主题增强** — 布局切换、聚光灯效果
- **站点统计** — 文章字数统计、阅读时长统计
- **GitHub Pages 部署** — 通过 GitHub Actions 自动构建并发布到 GitHub Pages

## 技术栈

| 工具 | 版本 |
|------|------|
| [VitePress](https://vitepress.dev/) | ^1.6.4 |
| [vitepress-theme-teek](https://github.com/teek-code/vitepress-theme-teek) | 1.6.0 |
| [Vue](https://vuejs.org/) | ^3.5.16 |
| [ECharts](https://echarts.apache.org/) | ^5.6.0 |
| [Sass](https://sass-lang.com/) | ^1.89.1 |
| [vitepress-plugin-rss](https://github.com/jakubmerinsky/vitepress-plugin-rss) | ^0.4.4 |
| [vitepress-plugin-bangumi](https://github.com/bangumi/plugins) | ^1.0.7 |
| [npm](https://www.npmjs.com/) | 10 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 本地预览构建结果
npm run docs:preview
```

## 部署

- **GitHub Pages（主站）**：提交代码到 `main` 分支后，GitHub Actions 自动执行构建并发布。
  工作流配置：[.github/workflows/deploy.yml](./.github/workflows/deploy.yml)

## 项目结构

```
blog/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts                # VitePress 主配置
│   │   ├── teekConfig.ts            # Teek 主题配置
│   │   └── theme/
│   │       ├── index.ts             # 主题入口
│   │       ├── components/          # 自定义 Vue 组件
│   │       │   ├── 404.vue                        # 自定义 404 页面
│   │       │   ├── BangumiCollectionWrapper.vue   # 追番收藏列表封装
│   │       │   ├── CalendarCard.vue               # 首页日历卡片
│   │       │   ├── ContributeChart.vue            # 文章贡献热力图
│   │       │   └── TeekLayoutProvider.vue         # 布局插槽编排
│   │       └── styles/              # 自定义样式
│   │           ├── code-bg.scss                     # 代码块背景
│   │           ├── custom.css                       # 全局自定义样式
│   │           ├── iframe.scss                      # iframe 样式
│   │           └── tk-archives-responsive.css       # 归档页响应式
│   ├── @pages/                      # 特殊页面（不参与文章分类）
│   │   ├── archivesPage.md          # 归档页
│   │   ├── articleOverviewPage.md   # 文章清单页
│   │   ├── bangumiPage.md           # 追番页
│   │   ├── categoriesPage.md        # 分类页
│   │   ├── riskLinkPage.md          # 失效链接页
│   │   └── tagsPage.md              # 标签页
│   ├── 01.学习/                     # 学习笔记
│   ├── 02.指南/                     # 指南类文章
│   ├── 03.备忘录/                   # 常用备忘录
│   ├── public/                      # 静态资源
│   │   ├── avatar.png               # 头像
│   │   ├── avatar-background.png    # 头像背景
│   │   ├── bangumi.json             # 追番缓存数据
│   │   ├── favicon.ico              # 站点图标
│   │   └── image/                   # 图片资源
│   └── index.md                     # 首页
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Actions 部署工作流
└── package.json
```

## 自定义组件

| 组件 | 说明 |
|------|------|
| **ContributeChart.vue** | 归档页顶部的文章贡献热力图，基于 ECharts 实现 |
| **CalendarCard.vue** | 首页日历卡片，展示每日写作情况 |
| **BangumiCollectionWrapper.vue** | 追番收藏列表组件，封装 Bangumi 数据展示 |
| **404.vue** | 自定义 404 页面 |
| **TeekLayoutProvider.vue** | 布局插槽编排，将自定义组件注入 Teek 主题布局 |
