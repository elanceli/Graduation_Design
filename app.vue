<template>
  <div id="app">
    <!-- 页面内容 -->
    <NuxtPage />
    
    <!-- 回到顶部按钮 -->
    <Transition name="fade">
      <div 
        v-if="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
      >
        <el-icon size="20">
          <ArrowUp />
        </el-icon>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ArrowUp } from '@element-plus/icons-vue'

// 回到顶部功能
const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 生命周期
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 全局样式和字体加载
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    }
  ]
})
</script>

<style>
/* 全局样式重置 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8fafc;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 回到顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Element Plus 主题定制 */
:root {
  --el-color-primary: #667eea;
  --el-color-primary-light-3: rgba(102, 126, 234, 0.7);
  --el-color-primary-light-5: rgba(102, 126, 234, 0.5);
  --el-color-primary-light-7: rgba(102, 126, 234, 0.3);
  --el-color-primary-light-8: rgba(102, 126, 234, 0.2);
  --el-color-primary-light-9: rgba(102, 126, 234, 0.1);
  --el-border-radius-base: 8px;
  --el-border-radius-small: 6px;
  --el-font-family: 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 选择文本样式 */
::selection {
  background: rgba(102, 126, 234, 0.2);
  color: inherit;
}

::-moz-selection {
  background: rgba(102, 126, 234, 0.2);
  color: inherit;
}

/* 通用动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 响应式断点 */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
}

/* 无障碍访问 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto;
  }
}

/* 打印样式 */
@media print {
  .back-to-top {
    display: none !important;
  }
  
  .el-button {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
}

/* 焦点样式 */
.el-button:focus,
.el-input__inner:focus,
.el-select__input:focus {
  outline: 2px solid rgba(102, 126, 234, 0.5);
  outline-offset: 2px;
}

/* 加载状态 */
.loading-placeholder {
  background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: loading 1.4s ease infinite;
}

@keyframes loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>