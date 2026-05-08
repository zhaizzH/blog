import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
  teekTheme: true, // 是否启用 Teek 主题
  teekHome: true, // 是否开启博客首页
  vpHome: false, // 是否启用 VitePress 首页风格，支持 teekHome 和 vpHome 同时存在
  sidebarTrigger: true, // 是否开启侧边栏折叠功能
  codeBlock: {
    copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
  // 首页 Banner 配置，位于首页顶部
  banner: {
    enabled: true, // 是否启用 Banner
    name: "", // Banner 标题，默认读取 vitepress 的 title 属性
    bgStyle: "fullImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
    imgSrc: ["https://img.zhaizz.top/file/background/1778138055855_112167497_p0.png",
      "https://img.zhaizz.top/file/background/1778138052971_81471534_p0.jpg",
      "https://img.zhaizz.top/file/background/1778138036830_1.png",
      "https://img.zhaizz.top/file/background/1778143436352_2.png"
    ], // Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
    imgInterval: 13000, // 当多张图片时（imgSrc 为数组），设置切换时间，单位：毫秒
    imgShuffle: true, // 图片是否随机切换，为 false 时按顺序切换，bgStyle 为 partImg 或 fullImg 时生效
    imgWaves: true, // 是否开启 Banner 图片波浪纹，bgStyle 为 fullImg 时生效
    mask: true, // Banner 图片遮罩，bgStyle 为 partImg 或 fullImg 时生效
    maskBg: "rgba(0, 0, 0, 0.4)", // Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 partImg 或 fullImg 且 mask 为 true 时生效
    textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 pure 时为 '#000000'，其他为 '#ffffff'
    titleFontSize: "3.2rem", // 标题字体大小
    descFontSize: "2.7rem", // 描述字体大小
    descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
    description: ["Eat, sleep and drink well"], // 描述信息
    switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
    switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
    typesInTime: 230, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesOutTime: 100, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesNextTime: 1800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
    typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
    features: [{ title: "", details: "", link: "", image: "" }], // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
    featureCarousel: 4000, // feature 轮播间隔时间，单位：毫秒。仅在移动端生效（屏幕小于 719px）
  },
  // 壁纸模式，在首页 最顶部 进入全屏后开启，仅当 banner.bgStyle = 'fullImg' 或 bodyBgImg.imgSrc 存在才生效。
  wallpaper: {
    enabled: true, // 是否启用壁纸模式
    hideBanner: true, // 开启壁纸模式后，是否隐藏 Banner
    hideMask: false, // 开启壁纸模式后，是否隐藏 Banner 或 bodyBgImage 的遮罩层，则确保 banner.mask 和 bodyBgImage.mask 为 true 才生效
  },
  // 博主信息，显示在首页左边第一个卡片。
  blogger: {
    name: "宅宅宅", // 博主昵称
    avatar: "https://img.zhaizz.top/file/avatar/obVInnoY.png", // 博主头像
    shape: "circle", // 头像风格：square 为方形头像，circle 为圆形头像，circle-rotate 可支持鼠标悬停旋转，circle-rotate-last 将会持续旋转 59s
    circleBgImg: "https://img.zhaizz.top/file/avatar/1778138324526_avatar-background.png", // 背景图片
    circleBgMask: true, // 遮罩层是否显示，仅当 shape 为 circle 且 circleBgImg 配置时有效
    circleSize: 100, // 头像大小
    color: "#ffffff", // 字体颜色
    // 状态，仅当 shape 为 circle 相关值时有效
    status: {
      icon: "😪", // 状态图标
      size: 24, // 图标大小
      title: "sleep...", // 鼠标悬停图标的提示语
    },
  },
  // 文章配置
  post: {
    postStyle: "list", // 文章列表风格
    excerptPosition: "top", // 文章摘要位置
    showMore: true, // 是否显示更多按钮
    moreLabel: "阅读全文 >", // 更多按钮文字
    emptyLabel: "暂无文章", // 文章列表为空时的标签
    showCapture: true, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 300 个字符作为摘要
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
    bottomMessage: '<a href="/sitemap.xml" target="_blank">Site Map</a>&nbsp;|&nbsp;<a href="http://gh.8000150.xyz/" target="_blank">Github</a>',
    // 主题版权配置
    theme: {
      show: true, // 是否显示主题版权
    },
    // 博客版权配置
    copyright: {
      show: true,
      createYear: 2025,
      suffix: "宅宅宅的博客",
    },
  },
  // 文章页底部的最近更新栏配置
  articleUpdate: {
    enabled: false, // 是否启用文章最近更新栏
  },
  // 滚动到评论区配置
  toComment: {
    enabled: false, // 是否启动滚动到评论区功能
  },
});
