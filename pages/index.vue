<template>
  <div class="home-page">
    <!-- 头部区域 -->
    <header class="header">
      <div class="container">
        <!-- 开发环境管理入口 -->
        <div v-if="isDev" class="admin-entry">
          <NuxtLink to="/admin" class="admin-link">
            <el-button type="warning" size="small" :icon="Setting">
              作品管理
            </el-button>
          </NuxtLink>
        </div>
        
        <h1>祝您毕业顺利,扶您上马走一程!</h1>
        <p>专为大学生提供优质毕业设计作品辅导</p>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">{{ projects.length }}+</span>
            <span class="stat-label">优质作品</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">8</span>
            <span class="stat-label">技术分类</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">源码保证</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 搜索筛选区域 -->
    <SearchFilter ref="searchFilterRef" @filter-change="handleFilterChange" />

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="container">
        <!-- 结果统计 -->
        <div class="results-info" v-if="filteredProjects.length > 0">
          <span class="results-count">
            找到 <strong>{{ filteredProjects.length }}</strong> 个作品
          </span>
          <span class="results-tips" v-if="hasActiveFilters">
            · 可以清除筛选条件查看更多作品
          </span>
        </div>

        <!-- 作品网格 -->
        <Transition name="fade" mode="out-in">
          <div v-if="filteredProjects.length > 0" class="projects-grid">
            <ProjectCard
              v-for="project in filteredProjects"
              :key="project.id"
              :project="project"
            />
          </div>
          
          <!-- 无结果提示 -->
          <div v-else class="no-results">
            <div class="no-results-content">
              <el-icon size="64" color="#d1d5db">
                <Search />
              </el-icon>
              <h3>没有找到相关作品</h3>
              <p>试试调整搜索关键词或筛选条件</p>
              <el-button type="primary" @click="clearFilters">
                查看所有作品
              </el-button>
            </div>
          </div>
        </Transition>

        <!-- 无限滚动触发器 -->
        <div ref="loadMoreTrigger" class="load-more-trigger" v-if="canLoadMore">
          <div class="loading-indicator" v-if="loading">
            <el-icon class="is-loading"><Loading /></el-icon>
            <span>加载中...</span>
          </div>
        </div>
        
        <!-- 手动加载更多按钮（备用） -->
        <div class="load-more" v-if="canLoadMore && !loading">
          <el-button 
            type="primary" 
            size="large" 
            @click="loadMore"
            plain
          >
            点击加载更多
          </el-button>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>关于我们</h4>
            <p>专注为计算机专业学生提供高质量毕业设计作品辅导，助力顺利毕业。</p>
          </div>
          <div class="footer-section">
            <h4>购买流程</h4>
            <ul>
              <li>1. 浏览选择心仪作品</li>
              <li>2. 点击购买跳转闲鱼</li>
              <li>3. 联系卖家获取源码</li>
              <li>4. 完成交易获得资料</li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>技术支持</h4>
            <p>所有作品均包含完整源码和说明文档，部分提供技术答疑服务。</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 毕业顺利. 所有作品仅供学习参考使用.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Search, Setting, Loading } from '@element-plus/icons-vue'
import { projects } from '~/data/projects'

// 开发环境检查
const isDev = process.dev

// SEO配置
useHead({
  title: '毕业顺利 - 优质毕业设计作品',
  meta: [
    {
      name: 'description',
      content: '专为计算机专业大四学生提供优质毕业设计作品，涵盖Web开发、移动应用、物联网等多个技术方向，助力顺利毕业。'
    },
    {
      name: 'keywords',
      content: '毕业设计,计算机专业,源码,Flask,Vue,React,Spring Boot,微信小程序'
    }
  ]
})

// 响应式数据
const filteredProjects = ref([])
const currentFilters = ref({})
const displayCount = ref(8) // 初始显示8个项目
const loading = ref(false)
const loadMoreTrigger = ref(null)
const observer = ref(null)

// 计算属性
const hasActiveFilters = computed(() => {
  return currentFilters.value.searchQuery ||
         (currentFilters.value.category && currentFilters.value.category !== '全部') ||
         (currentFilters.value.difficulty && currentFilters.value.difficulty !== '全部') ||
         (currentFilters.value.priceRange && (currentFilters.value.priceRange.min > 0 || currentFilters.value.priceRange.max < Infinity)) ||
         (currentFilters.value.sortBy && currentFilters.value.sortBy !== 'default')
})

const canLoadMore = computed(() => {
  return displayCount.value < filteredProjects.value.length
})

// 筛选和排序逻辑
const applyFilters = (filters) => {
  let result = [...projects]

  // 搜索筛选
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const query = filters.searchQuery.toLowerCase()
    result = result.filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query))
    )
  }

  // 分类筛选
  if (filters.category && filters.category !== '全部') {
    result = result.filter(project => project.category === filters.category)
  }

  // 难度筛选
  if (filters.difficulty && filters.difficulty !== '全部') {
    result = result.filter(project => project.difficulty === filters.difficulty)
  }

  // 价格筛选 - 只有当不是“全部”时才筛选
  if (filters.priceRange && filters.priceRange.max !== Infinity) {
    result = result.filter(project => {
      const price = parseInt(project.price.replace(/[^\d]/g, ''))
      return price >= filters.priceRange.min && price <= filters.priceRange.max
    })
  }

  // 排序
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''))
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''))
          return priceA - priceB
        })
        break
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''))
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''))
          return priceB - priceA
        })
        break
      case 'difficulty-asc':
        result.sort((a, b) => {
          const difficultyOrder = { '简单': 1, '中等': 2, '困难': 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        })
        break
      case 'difficulty-desc':
        result.sort((a, b) => {
          const difficultyOrder = { '简单': 1, '中等': 2, '困难': 3 }
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
        })
        break
    }
  }

  return result
}

// 处理筛选变化
const handleFilterChange = (filters) => {
  currentFilters.value = filters
  
  // 如果所有筛选条件都是默认值，重置显示数量并显示所有项目
  if ((!filters.searchQuery || filters.searchQuery === '') &&
      (!filters.category || filters.category === '全部') &&
      (!filters.difficulty || filters.difficulty === '全部') &&
      (!filters.priceRange || filters.priceRange.max === Infinity) &&
      (!filters.sortBy || filters.sortBy === 'default')) {
    displayCount.value = 8
    filteredProjects.value = projects.slice(0, 8)
    return
  }
  
  const allFiltered = applyFilters(filters)
  filteredProjects.value = allFiltered.slice(0, displayCount.value)
  
  // 只有在筛选结果少于当前显示数量时才调整
  if (displayCount.value > allFiltered.length) {
    displayCount.value = allFiltered.length
  }
}

// 清除筛选
const clearFilters = () => {
  // 直接重置为初始状态
  currentFilters.value = {}
  displayCount.value = 8
  filteredProjects.value = projects.slice(0, 8)
}

// 加载更多
const loadMore = async () => {
  loading.value = true
  
  // 模拟加载延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const allFiltered = applyFilters(currentFilters.value)
  displayCount.value = Math.min(displayCount.value + 8, allFiltered.length)
  filteredProjects.value = allFiltered.slice(0, displayCount.value)
  
  loading.value = false
}

// 设置无限滚动观察器
const setupInfiniteScroll = () => {
  if (loadMoreTrigger.value && 'IntersectionObserver' in window) {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && canLoadMore.value && !loading.value) {
          loadMore()
        }
      })
    }, {
      rootMargin: '100px'
    })
    
    observer.value.observe(loadMoreTrigger.value)
  }
}

// 清理观察器
const cleanupObserver = () => {
  if (observer.value) {
    observer.value.disconnect()
    observer.value = null
  }
}

// 初始化
onMounted(() => {
  filteredProjects.value = projects.slice(0, displayCount.value)
  nextTick(() => {
    setupInfiniteScroll()
  })
})

// 组件卸载时清理
onUnmounted(() => {
  cleanupObserver()
})

// 监听canLoadMore变化，重新设置观察器
watch(canLoadMore, (newVal) => {
  if (newVal) {
    nextTick(() => {
      setupInfiniteScroll()
    })
  } else {
    cleanupObserver()
  }
})
</script>

<style scoped>
/* 头部样式 */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  position: relative;
}

.admin-entry {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.admin-link {
  text-decoration: none;
}

.header h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.header p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 主要内容 */
.main-content {
  min-height: 60vh;
  padding: 2rem 0;
}

.results-info {
  margin-bottom: 2rem;
  color: #64748b;
  font-size: 14px;
}

.results-count strong {
  color: #1e293b;
}

.results-tips {
  margin-left: 8px;
}

/* 瀑布流布局 */
.projects-grid {
  column-count: 3;
  column-gap: 2rem;
  margin-bottom: 3rem;
}

.projects-grid .project-card {
  break-inside: avoid;
  margin-bottom: 2rem;
  display: inline-block;
  width: 100%;
}

/* 无结果提示 */
.no-results {
  text-align: center;
  padding: 4rem 0;
}

.no-results-content h3 {
  margin: 1rem 0;
  color: #374151;
}

.no-results-content p {
  color: #6b7280;
  margin-bottom: 2rem;
}

/* 无限滚动触发器 */
.load-more-trigger {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-size: 14px;
}

.loading-indicator .el-icon {
  font-size: 18px;
}

/* 手动加载更多 */
.load-more {
  text-align: center;
  margin: 2rem 0;
}

/* 页脚 */
.footer {
  background: #1f2937;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #f9fafb;
}

.footer-section p,
.footer-section li {
  color: #d1d5db;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header h1 {
    font-size: 2.5rem;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .projects-grid {
    column-count: 1;
    column-gap: 1.5rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>