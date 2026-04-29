import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
  teekTheme: true, // 是否启用 Teek 主题
  teekHome: false, // 是否开启博客首页
  vpHome: true, // 是否启用 VitePress 首页风格，支持 teekHome 和 vpHome 同时存在
  sidebarTrigger: true, // 是否开启侧边栏折叠功能
  author: { name: "xiaozhai801", link: "https://github.com/xiaozhai801" },
  codeBlock: {
    copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
  // 博主信息，显示在首页左边第一个卡片。
  blogger: {
    name: "宅宅宅", // 博主昵称
    avatar: "", // 博主头像
    shape: "circle", // 头像风格：square 为方形头像，circle 为圆形头像，circle-rotate 可支持鼠标悬停旋转，circle-rotate-last 将会持续旋转 59s
    circleBgImg: "", // 背景图片
    circleBgMask: true, // 遮罩层是否显示，仅当 shape 为 circle 且 circleBgImg 配置时有效
    circleSize: 100, // 头像大小
    color: "#ffffff", // 字体颜色
    // 状态，仅当 shape 为 circle 相关值时有效
    status: {
      icon: "😪", // 状态图标
      size: 24, // 图标大小
      title: "困", // 鼠标悬停图标的提示语
    },
  },
  // 精选文章卡片配置
  topArticle: {
    enabled: false, // 是否启用精选文章卡片
  },
  // 分类卡片配置
  category: {
    enabled: true, // 是否启用分类卡片
    path: "/categories", // 分类页访问地址
    pageTitle: "全部分类", // 分类页卡片标题
    homeTitle: "文章分类", // 卡片标题
    moreLabel: "更多 ...", // 查看更多分类标签
    emptyLabel: "暂无文章分类", // 分类为空时的标签
    limit: 5, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },
  // 标签卡片配置
  tag: {
    enabled: true, // 是否启用标签卡片
    path: "/tags", // 标签页访问地址
    pageTitle: "全部标签", // 标签页页卡片标题
    homeTitle: "热门标签", // 卡片标题
    moreLabel: "更多 ...", //  查看更多分类标签
    emptyLabel: "暂无标签", // 标签为空时的标签
    limit: 10, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },
  friendLink: {
    enabled: false,
  },
  // 站点信息卡片配置
  docAnalysis: {
    enabled: true, // 是否启用站点信息卡片
    createTime: "2025-2-19", // 站点创建时间
    wordCount: true, // 是否开启文章页的字数统计
    readingTime: true, // 是否开启文章页的阅读时长统计
    // 自定义现有信息
    overrideInfo: [
      {
        key: "lastActiveTime",
        label: "活跃时间",
        value: (_, currentValue) => (currentValue + "").replace("前", ""),
        show: true,
      },
    ],
  },
    // 页脚配置
  footerInfo: {
    // 主题版权配置
    theme: {
      show: false, // 是否显示主题版权，建议显示
      name: "", // 自定义名称
      link: "", // 自定义链接
    },
    // 博客版权配置
    copyright: {
      show: true, // 是否显示博客版权
      createYear: 2025, // 创建年份
      suffix: "宅宅宅 Blog", // 后缀
    },
  },
  // 文章页底部的最近更新栏配置
  articleUpdate: {
    enabled: true, // 是否启用文章最近更新栏
    limit: 3, // 文章最近更新栏显示数量
  },
  // 滚动到评论区配置
  toComment: {
    enabled: false, // 是否启动滚动到评论区功能
  },
});
