export const projects = [
  {
    id: 1,
    title: 'Flask图书信息管理系统',
    category: 'Web开发',
    description: '基于Flask+Vue的图书管理系统，包含图书增删改查、用户管理、借阅管理等功能。适合Web开发方向毕业设计。',
    price: '￥299',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    technologies: ['Flask', 'Vue.js', 'MySQL', 'Python'],
    features: [
      '图书信息管理（增删改查）',
      '用户注册登录系统',
      '图书借阅归还功能',
      '数据统计与报表',
      '响应式前端界面'
    ],
    xianyuUrl: 'https://2.taobao.com/item.htm?id=example1',
    difficulty: '中等',
    timeRequired: '2-3周',
    documentation: '包含完整源码、数据库设计文档、部署说明'
  },
  {
    id: 2,
    title: '电影信息管理系统',
    category: 'Web开发',
    description: '基于Python Flask的电影信息管理系统，支持电影信息录入、分类管理、评分系统等功能。',
    price: '￥199',
    image: 'https://images.unsplash.com/photo-1489599639319-fb8935c2a8ea?w=400',
    technologies: ['Flask', 'SQLite', 'HTML/CSS', 'JavaScript'],
    features: [
      '电影信息管理',
      '分类标签系统',
      '用户评分功能',
      '搜索筛选功能',
      '管理员后台'
    ],
    xianyuUrl: 'https://2.taobao.com/item.htm?id=example2',
    difficulty: '简单',
    timeRequired: '1-2周',
    documentation: '包含源码、数据库脚本、使用说明'
  },
  {
    id: 3,
    title: '餐厅点餐系统',
    category: '移动应用',
    description: '基于Flask和Vue的餐厅点餐系统，包含顾客点餐、厨房管理、订单统计等完整功能。',
    price: '￥399',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400',
    technologies: ['Flask', 'Vue.js', 'Element UI', 'MySQL'],
    features: [
      '顾客在线点餐',
      '菜品分类管理',
      '订单实时跟踪',
      '厨房订单管理',
      '营业统计分析'
    ],
    xianyuUrl: 'https://2.taobao.com/item.htm?id=example3',
    difficulty: '中等',
    timeRequired: '3-4周',
    documentation: '完整项目文档、API接口说明、部署指南'
  },
  {
    id: 4,
    title: '电商商品管理系统',
    category: '电子商务',
    description: '功能完整的电商商品管理系统，包含商品管理、用户系统、购物车、订单管理等核心功能。',
    price: '￥499',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    technologies: ['Flask', 'SQLAlchemy', 'Bootstrap', 'jQuery'],
    features: [
      '商品分类管理',
      '用户注册登录',
      '购物车功能',
      '订单管理系统',
      '管理员后台'
    ],
    xianyuUrl: 'https://2.taobao.com/item.htm?id=example4',
    difficulty: '中等',
    timeRequired: '3-4周',
    documentation: '项目源码、数据库设计、系统说明书'
  },
  {
    id: 5,
    title: '智能农业监测系统',
    category: '物联网',
    description: '基于Python的智能农业环境监测与控制系统，包含传感器数据采集、环境监控、智能控制等功能。',
    price: '￥599',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
    technologies: ['Python', 'Flask', 'SQLite', 'Chart.js'],
    features: [
      '环境数据监测',
      '实时数据图表',
      '阈值报警系统',
      '设备控制功能',
      '历史数据分析'
    ],
    xianyuUrl: 'https://2.taobao.com/item.htm?id=example5',
    difficulty: '困难',
    timeRequired: '4-5周',
    documentation: '完整源码、硬件清单、部署文档、论文模板'
  },
  {
    id: 6,
    title: 'Spring Boot博客系统',
    category: 'Java开发',
    description: '基于Spring Boot + MyBatis的个人博客系统，支持文章发布、分类管理、评论系统等功能。',
    price: '￥399',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
    technologies: ['Spring Boot', 'MyBatis', 'MySQL', 'Thymeleaf'],
    features: [
      '文章发布管理',
      '分类标签系统',
      '用户评论功能',
      '文章搜索功能',
      '后台管理系统'
    ],
    xianyuUrl: 'https://2.taobao.com/item.htm?id=example6',
    difficulty: '中等',
    timeRequired: '3-4周',
    documentation: 'Java项目源码、数据库脚本、配置说明'
  },
  {
    id: 7,
    title: 'React在线考试系统',
    category: '前端开发',
    description: '基于React + Node.js的在线考试系统，包含题库管理、考试功能、成绩统计等完整功能。',
    price: '￥459',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    features: [
      '题库管理系统',
      '在线考试功能',
      '自动阅卷系统',
      '成绩查询统计',
      '考试时间控制'
    ],
    xianyuUrl: 'https://2.taobao.com/item.htm?id=example7',
    difficulty: '中等',
    timeRequired: '3-4周',
    documentation: '前后端源码、数据库设计、API文档'
  },
  {
    id: 8,
    title: '微信小程序商城',
    category: '小程序开发',
    description: '功能完整的微信小程序商城，包含商品展示、购物车、订单管理、支付功能等。',
    price: '￥599',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    technologies: ['微信小程序', 'Node.js', 'MySQL', '微信支付'],
    features: [
      '商品浏览购买',
      '购物车管理',
      '订单系统',
      '微信支付集成',
      '用户个人中心'
    ],
    xianyuUrl: 'https://2.taobao.com/item.htm?id=example8',
    difficulty: '困难',
    timeRequired: '4-5周',
    documentation: '小程序源码、后端API、支付配置文档'
  }
];

export const categories = [
  '全部',
  'Web开发',
  '移动应用',
  '电子商务',
  '物联网',
  'Java开发',
  '前端开发',
  '小程序开发'
];

export const difficulties = [
  '全部',
  '简单',
  '中等',
  '困难'
];

export const priceRanges = [
  { label: '全部', min: 0, max: Infinity },
  { label: '￥100以下', min: 0, max: 100 },
  { label: '￥100-299', min: 100, max: 299 },
  { label: '￥300-499', min: 300, max: 499 },
  { label: '￥500以上', min: 500, max: Infinity }
];