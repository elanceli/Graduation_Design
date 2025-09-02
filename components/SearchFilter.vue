<template>
  <div class="search-filter">
    <div class="container">
      <!-- 搜索框 -->
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索毕业设计作品..."
          size="large"
          @input="onSearch"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      
      <!-- 筛选器 -->
      <div class="filters">
        <!-- 分类筛选 -->
        <div class="filter-group">
          <label class="filter-label">分类：</label>
          <div class="filter-tags">
            <span
              v-for="category in categories"
              :key="category"
              :class="['filter-tag', { active: selectedCategory === category }]"
              @click="selectCategory(category)"
            >
              {{ category }}
            </span>
          </div>
        </div>
        
        <!-- 难度筛选 -->
        <div class="filter-group">
          <label class="filter-label">难度：</label>
          <div class="filter-tags">
            <span
              v-for="difficulty in difficulties"
              :key="difficulty"
              :class="['filter-tag', { active: selectedDifficulty === difficulty }]"
              @click="selectDifficulty(difficulty)"
            >
              {{ difficulty }}
            </span>
          </div>
        </div>
        
        <!-- 价格筛选 -->
        <div class="filter-group">
          <label class="filter-label">价格：</label>
          <div class="filter-tags">
            <span
              v-for="range in priceRanges"
              :key="range.label"
              :class="['filter-tag', { active: selectedPriceRange === range.label }]"
              @click="selectPriceRange(range)"
            >
              {{ range.label }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 排序选项 -->
      <div class="sort-section">
        <label class="filter-label">排序：</label>
        <el-select
          v-model="sortBy"
          placeholder="选择排序方式"
          @change="onSort"
          size="default"
        >
          <el-option
            v-for="option in sortOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>
      
      <!-- 清除筛选 -->
      <div class="clear-filters" v-if="hasActiveFilters">
        <el-button @click="clearAllFilters" type="text">
          <el-icon><Refresh /></el-icon>
          清除筛选
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Refresh } from '@element-plus/icons-vue'
import { categories, difficulties, priceRanges } from '~/data/projects'

const emit = defineEmits(['filter-change'])

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('全部')
const selectedDifficulty = ref('全部')
const selectedPriceRange = ref('全部')
const currentPriceRange = ref({ min: 0, max: Infinity })
const sortBy = ref('default')

// 排序选项
const sortOptions = [
  { label: '默认排序', value: 'default' },
  { label: '价格由低到高', value: 'price-asc' },
  { label: '价格由高到低', value: 'price-desc' },
  { label: '难度由易到难', value: 'difficulty-asc' },
  { label: '难度由难到易', value: 'difficulty-desc' }
]

// 计算是否有活跃的筛选条件
const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' ||
         selectedCategory.value !== '全部' ||
         selectedDifficulty.value !== '全部' ||
         selectedPriceRange.value !== '全部' ||
         sortBy.value !== 'default'
})

// 搜索方法
const onSearch = () => {
  emitFilterChange()
}

// 选择分类
const selectCategory = (category) => {
  selectedCategory.value = category
  emitFilterChange()
}

// 选择难度
const selectDifficulty = (difficulty) => {
  selectedDifficulty.value = difficulty
  emitFilterChange()
}

// 选择价格范围
const selectPriceRange = (range) => {
  selectedPriceRange.value = range.label
  if (range.label === '全部') {
    currentPriceRange.value = { min: 0, max: Infinity }
  } else {
    currentPriceRange.value = { min: range.min, max: range.max }
  }
  emitFilterChange()
}

// 排序方法
const onSort = () => {
  emitFilterChange()
}

// 清除所有筛选
const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = '全部'
  selectedDifficulty.value = '全部'
  selectedPriceRange.value = '全部'
  currentPriceRange.value = { min: 0, max: Infinity }
  sortBy.value = 'default'
  emitFilterChange()
}

// 监听外部筛选状态变化（用于同步状态）
const resetFilters = () => {
  clearAllFilters()
}

// 暴露方法给父组件
defineExpose({
  resetFilters
})

// 发送筛选变化事件
const emitFilterChange = () => {
  emit('filter-change', {
    searchQuery: searchQuery.value,
    category: selectedCategory.value,
    difficulty: selectedDifficulty.value,
    priceRange: currentPriceRange.value,
    sortBy: sortBy.value
  })
}

// 初始化时发送一次筛选事件
onMounted(() => {
  emitFilterChange()
})
</script>

<style scoped>
.search-filter {
  background: white;
  padding: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #f0f0f0;
}

.search-box {
  margin-bottom: 2rem;
}

.search-box .el-input {
  max-width: 500px;
  margin: 0 auto;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-label {
  font-weight: 600;
  color: #374151;
  min-width: 60px;
  font-size: 14px;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  background: white;
}

.filter-tag:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-1px);
}

.filter-tag.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.sort-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.clear-filters {
  text-align: center;
}

.clear-filters .el-button {
  color: #6b7280;
  font-size: 14px;
}

.clear-filters .el-button:hover {
  color: #667eea;
}

@media (max-width: 768px) {
  .search-filter {
    padding: 1rem 0;
  }
  
  .filters {
    gap: 1rem;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .sort-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .filter-tags {
    width: 100%;
  }
  
  .filter-tag {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>