<template>
  <div class="project-detail-page">
    <!-- 返回按钮 -->
    <div class="container">
      <div class="back-button">
        <el-button @click="goBack" type="text" size="large">
          <el-icon><ArrowLeft /></el-icon>
          返回作品列表
        </el-button>
      </div>
    </div>

    <!-- 项目详情内容 -->
    <div v-if="project" class="project-detail">
      <div class="container">
        <div class="detail-grid">
          <!-- 左侧：项目信息 -->
          <div class="project-info">
            <div class="project-header">
              <div class="category-badge">{{ project.category }}</div>
              <h1 class="project-title">{{ project.title }}</h1>
              <div class="project-meta-info">
                <span class="difficulty" :class="difficultyClass">
                  {{ project.difficulty }}
                </span>
                <span class="time-required">
                  预计完成时间：{{ project.timeRequired }}
                </span>
              </div>
            </div>

            <div class="project-image-container">
              <img 
                :src="project.image" 
                :alt="project.title" 
                class="detail-image"
                @error="handleImageError"
              />
            </div>

            <div class="project-description">
              <h3>项目介绍</h3>
              <p>{{ project.description }}</p>
            </div>

            <div class="project-features">
              <h3>主要功能</h3>
              <ul class="features-list">
                <li v-for="feature in project.features" :key="feature">
                  <el-icon color="#10b981"><Check /></el-icon>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="project-technologies">
              <h3>技术栈</h3>
              <div class="tech-stack">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech" 
                  class="tech-badge"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="project-documentation">
              <h3>交付内容</h3>
              <p class="documentation-text">{{ project.documentation }}</p>
            </div>
          </div>

          <!-- 右侧：购买信息 -->
          <div class="purchase-info">
            <div class="price-card">
              <div class="price-section">
                <div class="price">{{ project.price }}</div>
                <div class="price-note">一次购买，终身使用</div>
              </div>

              <div class="purchase-benefits">
                <h4>购买包含</h4>
                <ul>
                  <li>
                    <el-icon><Document /></el-icon>
                    完整源代码
                  </li>
                  <li>
                    <el-icon><DataLine /></el-icon>
                    数据库设计文件
                  </li>
                  <li>
                    <el-icon><Reading /></el-icon>
                    详细说明文档
                  </li>
                  <li>
                    <el-icon><VideoPlay /></el-icon>
                    运行演示视频
                  </li>
                  <li>
                    <el-icon><ChatDotRound /></el-icon>
                    技术答疑支持
                  </li>
                </ul>
              </div>

              <div class="purchase-actions">
                <el-button 
                  type="primary" 
                  size="large" 
                  @click="buyNow"
                  class="buy-button"
                >
                  <el-icon><ShoppingCart /></el-icon>
                  立即购买
                </el-button>
                
                <div class="purchase-note">
                  <el-icon><InfoFilled /></el-icon>
                  点击购买将跳转到闲鱼平台
                </div>
              </div>

              <div class="security-guarantee">
                <h4>安全保障</h4>
                <div class="guarantee-items">
                  <div class="guarantee-item">
                    <el-icon><Select /></el-icon>
                    <span>100%原创保证</span>
                  </div>
                  <div class="guarantee-item">
                    <el-icon color="#10b981"><Checked /></el-icon>
                    <span>支持远程调试</span>
                  </div>
                  <div class="guarantee-item">
                    <el-icon color="#10b981"><Star /></el-icon>
                    <span>售后技术支持</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目不存在 -->
    <div v-else class="project-not-found">
      <div class="container">
        <div class="not-found-content">
          <el-icon size="80" color="#d1d5db">
            <WarningFilled />
          </el-icon>
          <h2>项目不存在</h2>
          <p>抱歉，您访问的项目不存在或已被删除。</p>
          <el-button type="primary" @click="goHome">
            返回首页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ArrowLeft, Check, Document, DataLine, Reading, VideoPlay, 
  ChatDotRound, ShoppingCart, InfoFilled, Select, Checked, 
  Star, WarningFilled 
} from '@element-plus/icons-vue'
import { projects } from '~/data/projects'

// 获取路由参数
const route = useRoute()
const router = useRouter()
const projectId = computed(() => parseInt(route.params.id))

// 查找项目
const project = computed(() => {
  return projects.find(p => p.id === projectId.value)
})

// 难度样式类
const difficultyClass = computed(() => {
  if (!project.value) return ''
  const difficulty = project.value.difficulty
  return {
    'easy': difficulty === '简单',
    'medium': difficulty === '中等',
    'hard': difficulty === '困难'
  }
})

// SEO配置
useHead(() => ({
  title: project.value ? `${project.value.title} - 毕业顺利` : '项目详情 - 毕业顺利',
  meta: [
    {
      name: 'description',
      content: project.value ? project.value.description : '查看毕业设计项目详情'
    }
  ]
}))

// 方法
const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/')
}

const buyNow = () => {
  if (project.value) {
    window.open(project.value.xianyuUrl, '_blank')
  }
}

const handleImageError = (event) => {
  event.target.src = '/images/default-project.png'
}

// 404处理
onMounted(() => {
  if (!project.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project Not Found'
    })
  }
})
</script>

<style scoped>
.project-detail-page {
  min-height: 100vh;
  background: #f8fafc;
}

.back-button {
  padding: 2rem 0 1rem;
}

.back-button .el-button {
  color: #64748b;
  font-size: 16px;
}

.back-button .el-button:hover {
  color: #667eea;
}

.detail-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* 左侧项目信息 */
.project-info {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.project-header {
  margin-bottom: 2rem;
}

.category-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.project-meta-info {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.difficulty {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.difficulty.easy {
  background: #dcfce7;
  color: #166534;
}

.difficulty.medium {
  background: #fed7aa;
  color: #9a3412;
}

.difficulty.hard {
  background: #fecaca;
  color: #991b1b;
}

.time-required {
  color: #64748b;
  font-size: 0.9rem;
}

.project-image-container {
  margin: 2rem 0;
}

.detail-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.project-description,
.project-features,
.project-technologies,
.project-documentation {
  margin: 2.5rem 0;
}

.project-description h3,
.project-features h3,
.project-technologies h3,
.project-documentation h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
}

.project-description p {
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.features-list li:last-child {
  border-bottom: none;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px solid #e2e8f0;
}

.documentation-text {
  color: #4a5568;
  line-height: 1.7;
  font-size: 1rem;
}

/* 右侧购买信息 */
.purchase-info {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.price-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}

.price-section {
  text-align: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 2rem;
}

.price {
  font-size: 3rem;
  font-weight: 800;
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.price-note {
  color: #64748b;
  font-size: 0.9rem;
}

.purchase-benefits h4,
.security-guarantee h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
}

.purchase-benefits ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.purchase-benefits li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: #374151;
}

.purchase-actions {
  margin: 2rem 0;
}

.buy-button {
  width: 100%;
  height: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  margin-bottom: 1rem;
}

.buy-button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46a3 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.purchase-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.85rem;
  text-align: center;
  justify-content: center;
}

.guarantee-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #374151;
  font-size: 0.9rem;
}

/* 项目不存在页面 */
.project-not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
}

.not-found-content h2 {
  margin: 1rem 0;
  color: #374151;
  font-size: 2rem;
}

.not-found-content p {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .purchase-info {
    position: static;
  }
}

@media (max-width: 768px) {
  .project-info {
    padding: 1.5rem;
  }
  
  .project-title {
    font-size: 2rem;
  }
  
  .project-meta-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .price-card {
    padding: 1.5rem;
  }
  
  .price {
    font-size: 2.5rem;
  }
}
</style>