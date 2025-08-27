# Vercel 部署检查清单

## ✅ 部署前准备

### 1. 本地构建测试
- [ ] `npm run generate` 执行成功
- [ ] `.output/public` 目录存在
- [ ] 包含以下文件：
  - [ ] `index.html` (主页)
  - [ ] `admin/index.html` (管理页面)
  - [ ] `project/[1-8]/index.html` (项目详情页)
  - [ ] `_nuxt/` 目录 (静态资源)
  - [ ] `404.html` 和 `200.html` (错误页面)

### 2. 配置文件检查
- [ ] `vercel.json` 存在且配置正确
- [ ] `.vercelignore` 排除了不必要的文件
- [ ] `nuxt.config.ts` 中 `ssr: true` 
- [ ] 所有路由在 `nitro.prerender.routes` 中配置

### 3. 项目文件检查  
- [ ] `package.json` 包含正确的构建脚本
- [ ] `Node.js >= 16.0.0` 版本要求
- [ ] 图片使用外部 URL (Unsplash 等)
- [ ] 无硬编码的本地路径

### 4. Git 仓库状态
- [ ] 所有更改已提交到 Git
- [ ] 推送到 GitHub main 分支
- [ ] 仓库中包含 `Main_Website` 目录

## 🚀 Vercel 控制台配置

### 项目设置
```
Framework Preset: Nuxt.js
Build Command: npm run generate  
Output Directory: .output/public
Install Command: npm install
Node.js Version: 18.x
```

### 环境变量 (可选)
```
无需额外环境变量
```

### 域名配置
```
Custom Domain: biyeshunli.top
DNS Record: CNAME biyeshunli.top -> cname.vercel-dns.com
```

## 🔍 部署后验证

### 功能测试
- [ ] 主页正常加载
- [ ] 项目卡片显示正确
- [ ] 搜索筛选功能正常
- [ ] 项目详情页可访问
- [ ] 购买链接跳转正常
- [ ] 管理页面仅在开发环境显示(生产环境不显示)

### 性能检查
- [ ] Google PageSpeed Insights 评分
- [ ] 所有图片正常加载
- [ ] CSS 样式完整
- [ ] 字体加载正常
- [ ] 响应式设计正常

### SEO 检查
- [ ] 页面标题正确
- [ ] Meta 描述完整
- [ ] 结构化数据正确
- [ ] sitemap.xml 生成

## 🆘 常见问题解决

### 构建失败
```bash
# 本地调试
npm run generate --verbose

# 清除缓存重试  
npm run clean
npm install
npm run generate
```

### 404 页面
- 检查 `nuxt.config.ts` 中的路由配置
- 确保所有页面都预渲染
- 验证 `vercel.json` 路由规则

### 样式丢失
- 检查 CSS 导入顺序
- 确认 Element Plus 正确配置
- 验证字体文件路径

### 功能异常
- 确认是静态生成兼容的功能
- 检查客户端/服务端代码分离
- 验证环境变量配置

---

**最后检查**: 一切准备就绪后，推送代码到 GitHub，Vercel 将自动开始部署！