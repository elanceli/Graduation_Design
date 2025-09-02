# 毕业设计作品辅导网站

#设计一个毕业设计作品售卖的网站，这些作品的主要受众就是大四学生，因为他们快毕业的，主要是计算机系的
#然后网站类似电影海报展示模块，每个都能展示相关的品类，内容介绍，价格，图片，链接，网站还能支持前端搜索功能
#暂时不需要用户注册，而是引流到闲鱼购买
#网站目前是纯前端的纯静态页面
#托管在vercel上，域名为biyeshunli.top，每次在本地更新代码后，vercel会自动更新
#使用nuxt.js，使用srg技术构建本网站，不是说售卖的东西就是nuxtjs的#使用element-ui


当前版本为v1.0.1

## 技术栈

- **框架**: Nuxt.js 3 (Vue 3)
- **UI组件库**: Element Plus
- **构建模式**: SSG (Static Site Generation)
- **样式**: CSS3 + Google Fonts
- **部署**: Vercel
- **域名**: biyeshunli.top

## 项目结构

```
Main_Website/
├── assets/                 # 静态资源
│   ├── css/
│   │   └── main.css        # 全局样式文件
│   └── images/             # 图片资源
├── components/             # Vue组件
│   ├── ProjectCard.vue     # 项目卡片组件
│   └── SearchFilter.vue    # 搜索筛选组件
├── data/                   # 数据文件
│   └── projects.js         # 项目数据和配置
├── pages/                  # 页面路由
│   ├── index.vue           # 首页
│   └── project/
│       └── [id].vue        # 项目详情页
├── public/                 # 公共静态文件
│   └── favicon.ico         # 网站图标
├── app.vue                 # 应用入口组件
├── nuxt.config.ts          # Nuxt配置文件
├── package.json            # 项目依赖配置
└── readme.md               # 项目说明文档
```

## 功能特性

### 🎯 核心功能

- **项目展示**: 海报式网格布局展示毕业设计作品
- **搜索筛选**: 支持关键词搜索、分类筛选、难度筛选、价格筛选
- **项目详情**: 详细的项目介绍、技术栈、功能特性展示
- **购买引流**: 一键跳转闲鱼购买链接
- **响应式设计**: 完美适配PC和移动端

### 🎨 UI特性

- **现代设计**: 采用渐变色彩和卡片式布局
- **动画效果**: 流畅的hover动画和页面切换效果
- **无障碍访问**: 支持键盘导航和屏幕阅读器
- **加载优化**: 图片懒加载和骨架屏效果

### 📊 项目数据

- **8个技术分类**: Web开发、移动应用、电子商务、物联网等
- **多种难度等级**: 简单、中等、困难
- **价格区间**: ￥100-599不等
- **完整交付**: 源码、文档、数据库、视频演示

## 安装运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 本地开发

```bash
# 1. 克隆项目
git clone <repository-url>
cd Main_Website

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器访问
# http://localhost:3000
```

### 构建部署

```bash
# 生成静态站点
npm run generate

# 生成的文件在 .output/public/ 目录
# 可直接部署到任何静态托管服务
```

### 预览构建结果

```bash
# 预览生产环境构建
npm run preview
```

## 🚀 快速上手

### 5分钟开始管理作品

1. **启动开发环境**

   ```bash
   npm run dev
   ```
2. **访问管理系统**

   - 打开 `http://localhost:3000`
   - 点击右上角的"作品管理"按钮
3. **添加第一个作品**

   - 点击"添加新作品"
   - 填写基本信息（标题、分类、价格等）
   - 保存并生成projects.js文件
4. **更新网站**

   - 下载生成的projects.js文件
   - 替换 `data/projects.js`文件
   - 刷新页面查看新作品

### 常用命令

```bash
# 开发环境
npm run dev          # 启动开发服务器（端口3000）

# 构建部署
npm run generate     # 生成静态网站
npm run preview      # 预览构建结果

# 维护
npm run clean        # 清理缓存
npm run build        # 构建生产版本
```

## 部署说明

### Vercel部署

#### 🚀 快速部署步骤

1. **推送代码到GitHub**

   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```
2. **Vercel控制台配置**

   - 访问 [vercel.com](https://vercel.com)
   - 连接GitHub仓库
   - 选择项目目录：`Main_Website`
   - 设置构建配置：
     ```
     Framework: Nuxt.js
     Build Command: npm run generate
     Output Directory: .output/public
     Install Command: npm install
     Node.js Version: 18.x
     ```
3. **环境变量（可选）**

   ```
   无需额外环境变量
   ```
4. **自定义域名**

   - 在Vercel控制台中添加域名：`biyeshunli.top`
   - 配置 DNS 记录：
     ```
     CNAME: biyeshunli.top -> cname.vercel-dns.com
     ```

#### 🔧 部署配置文件

项目包含以下配置文件以保证部署成功：

- **`vercel.json`**: Vercel部署配置
- **`.vercelignore`**: 排除不需要的文件
- **`nuxt.config.ts`**: Nuxt SSG 配置

#### ⚠️ 常见问题解决

**问题 1：构建失败 - “Command failed”**

```bash
# 本地测试构建
npm run generate

# 检查输出目录
ls -la .output/public
```

**问题 2："Function Runtimes must have a valid version"**

- 原因：`vercel.json` 中不必要的 `functions` 配置
- 解决：删除 `functions` 字段，纯静态网站不需要服务器函数

**问题 3：“404 - This page could not be found”**

- 检查 `vercel.json` 中的路由配置
- 确保所有页面都在 `nitro.prerender.routes` 中

**问题 3：静态资源加载失败**

- 检查 `nuxt.config.ts` 中的 `app.baseURL` 设置
- 确保图片路径使用绝对URL

**问题 4：Element Plus 样式丢失**

- 检查 CSS 导入顺序
- 确保 `build.transpile` 包含 `element-plus`

#### 📋 部署检查列表

部署前请确保：

- ✅ 本地 `npm run generate` 成功
- ✅ `.output/public` 目录存在且包含HTML文件
- ✅ 所有页面路由在 `nuxt.config.ts` 中配置
- ✅ 图片链接使用外部URL（如Unsplash）
- ✅ `package.json` 包含正确的构建脚本
- ✅ Node.js 版本兼容（>= 16.0.0）

### 环境变量

项目当前无需额外环境变量配置

## 开发指南

### 📋 项目管理系统

为了方便管理和新增作品，项目提供了一个可视化的管理系统，完全基于前端JSON操作，无需后端服务器。

#### 🚀 访问管理系统

**开发环境访问：**

1. 启动开发服务器：`npm run dev`
2. 访问主页：`http://localhost:3000`
3. 点击右上角的"作品管理"按钮
4. 或直接访问：`http://localhost:3000/admin`

> ⚠️ **注意**：管理入口仅在开发环境显示，生产环境不会出现

#### 📝 添加新作品流程

1. **打开管理界面**

   - 点击"添加新作品"按钮
2. **填写作品信息**

   ```
   ✅ 作品标题*     - 项目名称
   ✅ 分类*         - Web开发/移动应用等
   ✅ 作品描述*     - 详细描述
   ✅ 价格*         - 格式：￥299
   ✅ 难度*         - 简单/中等/困难
   ✅ 所需时间*     - 如：2-3周
   ✅ 项目图片*     - 图片URL地址
   ✅ 闲鱼链接*     - 购买链接
   ✅ 技术栈*       - 支持多选和自定义输入
   ⭕ 主要功能      - 可动态添加多个功能点
   ✅ 交付内容*     - 包含的文件和文档
   ```
3. **保存并生成文件**

   - 点击"添加"按钮保存
   - 系统提示是否生成新的projects.js文件
   - 选择"生成文件"自动下载
4. **更新项目文件**

   - 将下载的 `projects.js`文件
   - 手动替换 `data/projects.js`文件
   - 刷新网站查看新添加的作品

#### ✏️ 编辑现有作品

1. 在管理界面的作品列表中找到要编辑的作品
2. 点击"编辑"按钮（铅笔图标）
3. 　修改相应信息
4. 点击"更新"保存
5. 重复上述步骤3-4生成新文件

#### 🗑️ 删除作品

1. 在作品列表中找到要删除的作品
2. 点击"删除"按钮（垃圾桶图标）
3. 确认删除操作
4. 点击"生成 projects.js"更新文件

#### 💾 数据备份与恢复

**导出备份：**

- 点击"导出备份"按钮
- 下载包含完整数据的JSON文件
- 文件名格式：`projects-backup-YYYY-MM-DD-HH-mm-ss.json`

**导入数据：**

- 点击"导入数据"按钮
- 选择之前导出的JSON备份文件
- 系统自动恢复数据并提示生成新的projects.js文件

#### 🎯 管理系统特性

- ✅ **无需后端**：完全基于前端JSON操作
- ✅ **数据验证**：表单字段自动验证
- ✅ **智能提示**：操作流程清晰指导
- ✅ **批量管理**：支持排序、分页、搜索
- ✅ **统计信息**：作品数量、分类统计、平均价格
- ✅ **备份恢复**：完整的数据备份与恢复功能

#### ⚠️ 重要注意事项

1. **文件替换**：每次修改后需手动替换 `data/projects.js`文件
2. **数据备份**：重要修改前建议先导出备份
3. **图片链接**：使用稳定的图片托管服务（如Unsplash）
4. **价格格式**：请保持￥xxx的格式统一
5. **开发环境**：管理功能仅在开发环境可用

### 🛠️ 手动添加新项目（传统方式）

编辑 `data/projects.js` 文件，在 `projects` 数组中添加新项目:

```javascript
{
  id: 9,
  title: '项目名称',
  category: '技术分类',
  description: '项目描述',
  price: '￥299',
  image: '项目图片URL',
  technologies: ['技术1', '技术2'],
  features: ['功能1', '功能2'],
  xianyuUrl: '闲鱼购买链接',
  difficulty: '难度等级',
  timeRequired: '完成时间',
  documentation: '交付说明'
}
```

### 自定义样式

- 全局样式: `assets/css/main.css`
- 组件样式: 各Vue组件的 `<style>` 部分
- 主题色: CSS变量定义在 `app.vue`

### 配置修改

- Nuxt配置: `nuxt.config.ts`
- 项目信息: `package.json`
- 分类和筛选: `data/projects.js`

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 许可证

本项目仅供学习参考使用

## 更新日志

### v1.1.0 (2024-08) - 管理系统版本

- ✅ **新增项目管理系统**：可视化管理界面
- ✅ **表单化操作**：通过表单添加/编辑作品
- ✅ **数据验证**：完整的表单字段验证
- ✅ **自动文件生成**：projects.js文件自动生成下载
- ✅ **数据备份恢复**：JSON备份导出导入功能
- ✅ **统计信息**：作品数量、分类、价格统计
- ✅ **开发环境入口**：主页右上角管理入口

### v1.0.0 (2024-08) - 初始版本

- ✅ 初始版本发布
- ✅ 基础项目展示功能
- ✅ 搜索筛选功能
- ✅ 响应式设计
- ✅ Vercel部署配置

## 项目结构

```
Main_Website/
├── assets/         # 静态资源 (CSS, 图片等)
├── components/     # Vue 组件
│   ├── ProjectCard.vue  # 项目卡片组件
│   └── SearchFilter.vue # 搜索和筛选组件
├── data/
│   └── projects.js    # 项目数据
├── layouts/
│   └── default.vue    # 默认布局
├── pages/          # 页面
│   ├── index.vue      # 首页
│   └── project/
│       └── [id].vue   # 项目详情页
├── public/         # 公共文件
├── nuxt.config.ts  # Nuxt 配置文件
└── package.json    # 项目依赖
```

## 使用方法

1. **安装依赖**

   ```bash
   npm install
   ```
2. **启动开发环境**

   ```bash
   npm run dev
   ```

   访问 `http://localhost:3000` 查看。
3. **构建生产版本**

   ```bash
   npm run build
   ```
4. **本地预览生产版本**

   ```bash
   npm run preview
   ```

## 数据修改

所有的项目数据都存储在 `data/projects.js` 文件中。您可以直接修改此文件来增加、删除或编辑项目信息。

## 🔧 故障排除

### 管理系统相关

**问题：管理入口不显示**

- 确保在开发环境运行：`npm run dev`
- 检查控制台是否有错误
- 清除浏览器缓存后重试

**问题：数据保存失败**

- 使用导出功能手动备份数据
- 检查浏览器下载权限设置
- 重启开发服务器后重试

**问题：生成的projects.js文件格式错误**

- 检查所有必填字段是否完整
- 确保价格格式为"￥数字"
- 验证图片URL是否有效

### 一般问题

**端口冲突**

```bash
# 查看占用端口3000的进程
lsof -ti:3000

# 杀死占用进程
kill -9 <进程ID>
```

**依赖问题**

```bash
# 清除node_modules重新安装
rm -rf node_modules package-lock.json
npm install
```

**构建失败**

```bash
# 检查Node.js版本
node --version  # 需要 >= 16.0.0

# 清除Nuxt缓存
npm run clean
npm run dev
```
