<template>
  <div class="project-card" @click="goToDetail">
    <div class="project-image-container">
      <img 
        :src="project.image" 
        :alt="project.title" 
        class="project-image"
        @error="handleImageError"
      />
      <div class="difficulty-badge" :class="difficultyClass">
        {{ project.difficulty }}
      </div>
    </div>
    
    <div class="project-content">
      <div class="project-category">{{ project.category }}</div>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      
      <div class="project-tech">
        <span 
          v-for="tech in project.technologies" 
          :key="tech" 
          class="tech-tag"
        >
          {{ tech }}
        </span>
      </div>
      
      <div class="project-meta">
        <div class="project-info">
          <span class="time-required">预计时间：{{ project.timeRequired }}</span>
        </div>
        <div class="project-price">{{ project.price }}</div>
      </div>
      
      <div class="project-actions">
        <el-button 
          type="primary" 
          @click.stop="openXianyu"
          class="buy-btn"
        >
          <el-icon><ShoppingCart /></el-icon>
          立即购买
        </el-button>
        <el-button 
          @click.stop="goToDetail"
          class="detail-btn"
        >
          查看详情
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCart } from '@element-plus/icons-vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const difficultyClass = computed(() => {
  const difficulty = props.project.difficulty
  return {
    'easy': difficulty === '简单',
    'medium': difficulty === '中等',
    'hard': difficulty === '困难'
  }
})

const goToDetail = () => {
  router.push(`/project/${props.project.id}`)
}

const openXianyu = () => {
  window.open(props.project.xianyuUrl, '_blank')
}

const handleImageError = (event) => {
  // 如果图片加载失败，使用默认图片
  event.target.src = '/images/default-project.png'
}
</script>

<style scoped>
.project-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border-color: #e2e8f0;
}

.project-image-container {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.difficulty-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(8px);
}

.difficulty-badge.easy {
  background: rgba(34, 197, 94, 0.9);
}

.difficulty-badge.medium {
  background: rgba(251, 146, 60, 0.9);
}

.difficulty-badge.hard {
  background: rgba(239, 68, 68, 0.9);
}

.project-content {
  padding: 24px;
}

.project-category {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
}

.project-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1a202c;
  line-height: 1.3;
}

.project-description {
  color: #64748b;
  margin-bottom: 16px;
  line-height: 1.6;
  font-size: 14px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.time-required {
  font-size: 13px;
  color: #64748b;
}

.project-price {
  font-size: 24px;
  font-weight: 700;
  color: #dc2626;
}

.project-actions {
  display: flex;
  gap: 12px;
}

.buy-btn {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-weight: 600;
}

.buy-btn:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46a3 100%);
  transform: translateY(-1px);
}

.detail-btn {
  flex: 1;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 20px;
  font-weight: 600;
  color: #475569;
}

.detail-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

@media (max-width: 768px) {
  .project-content {
    padding: 20px;
  }
  
  .project-actions {
    flex-direction: column;
  }
  
  .buy-btn, .detail-btn {
    flex: none;
  }
}
</style>