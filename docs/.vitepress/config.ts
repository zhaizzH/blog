import { defineConfig } from "vitepress";
import { teekConfig } from "./teekConfig";
import { RssPlugin } from 'vitepress-plugin-rss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  title: "zzz's Blog",
  base: "/",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "https://img.zhaizz.top/file/avatar/obVInnoY.png" }],
    ["link", { rel: "apple-touch-icon", type: "image/png", href: "https://img.zhaizz.top/file/avatar/obVInnoY.png" }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS 订阅', href: '/feed.rss' }]
  ],
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-CN",
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "首页", link: "/" },
      {
        text: "指南",
        link: "/guide/cmd-proxy",
        activeMatch: "/02.指南/",
      },
      {
        text: "备忘录",
        link: "/memo/android-apk",
        activeMatch: "/03.备忘录/"
      },
      {
        text: "功能页",
        items: [
          { text: "归档页", link: "/archives" },
          { text: "清单页", link: "/articleOverview" },
          { text: "分类页", link: "/categories" },
          { text: "标签页", link: "/tags" },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/xiaozhai801",
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"><path d="M977.2 208.2c33.4 36.2 48.8 79.4 46.6 131.4v404.8c-0.8 52.8-18.4 96.2-53 130.2-34.4 34-78.2 51.8-131 53.4H184.04c-52.9-1.6-96.42-19.6-130.56-54.4C19.364 838.8 1.534 793 0 736.4V339.6c1.534-52 19.364-95.2 53.48-131.4C87.62 175.5 131.14 157.54 184.04 156h58.76L192.1 104.38c-11.5-11.46-17.26-26-17.26-43.58 0-17.6 5.76-32.12 17.26-43.594C203.6 5.736 218.2 0 235.8 0s32.2 5.736 43.8 17.206L426.2 156h176l149-138.794C763.4 5.736 778.4 0 796 0c17.6 0 32.2 5.736 43.8 17.206 11.4 11.474 17.2 25.994 17.2 43.594 0 17.58-5.8 32.12-17.2 43.58L789.2 156h58.6c52.8 1.54 96 19.5 129.4 52.2z m-77.6 139.4c-0.8-19.2-7.4-34.8-21.4-47-10.4-12.2-28-18.8-45.4-19.6H192.1c-19.18 0.8-34.9 7.4-47.16 19.6-12.28 12.2-18.8 27.8-19.56 47v388.8c0 18.4 6.52 34 19.56 47s28.76 19.6 47.16 19.6H832.8c18.4 0 34-6.6 46.6-19.6 12.6-13 19.4-28.6 20.2-47V347.6z m-528.6 85.4c12.6 12.6 19.4 28.2 20.2 46.4V546c-0.8 18.4-7.4 33.8-19.6 46.4-12.4 12.6-28 19-47.2 19-19.2 0-35-6.4-47.2-19-12.2-12.6-18.8-28-19.6-46.4v-66.6c0.8-18.2 7.6-33.8 20.2-46.4 12.6-12.6 26.4-19.2 46.6-20 18.4 0.8 34 7.4 46.6 20z m383 0c12.6 12.6 19.4 28.2 20.2 46.4V546c-0.8 18.4-7.4 33.8-19.6 46.4-12.2 12.6-28 19-47.2 19-19.2 0-34.8-6.4-47.2-19-14-12.6-18.8-28-19.4-46.4v-66.6c0.6-18.2 7.4-33.8 20-46.4 12.6-12.6 28.2-19.2 46.6-20 18.4 0.8 34 7.4 46.6 20z"></path></svg>'
        },
        link: 'https://space.bilibili.com/452972953'
      },
    ],
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
  },
  sitemap: {
    hostname: 'https://blog.zhaizz.top',
  },
  vite: {
    plugins: [
      RssPlugin({
        filter: (post) => {
          if (post.filepath.includes('@pages/')) {
            return false
          }
          if (post.filepath.endsWith('目录.md')) {
            return false
          }
          return true
        },
        title: 'zzz\' Blog',
        baseUrl: 'https://blog.zhaizz.top',
        limit: 3,
      })
    ]
  },
});
