<template>
  <div class="admin-page">
    <!-- 头部 -->
    <header class="admin-header">
      <div class="container">
        <h1>作品管理系统</h1>
        <p>轻松管理您的毕业设计作品</p>
        
        <!-- 使用说明 -->
        <el-alert
          title="使用说明"
          type="info"
          :closable="false"
          style="margin-top: 1rem; max-width: 800px; margin-left: auto; margin-right: auto;"
        >
          <template #default>
            <p>📝 <strong>添加/编辑</strong>：直接在页面上管理作品</p>
            <p>💾 <strong>导出备份</strong>：保存完整的JSON备份文件</p>
            <p>📁 <strong>生成projects.js</strong>：下载新的projects.js文件，手动替换data/projects.js后刷新网站</p>
          </template>
        </el-alert>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="admin-content">
      <div class="container">
        <!-- 操作按钮 -->
        <div class="admin-actions">
          <el-button 
            type="primary" 
            size="large" 
            @click="showAddDialog"
            :icon="Plus"
          >
            添加新作品
          </el-button>
          
          <el-divider direction="vertical" />
          
          <el-button 
            type="success" 
            size="large" 
            @click="exportData"
            :icon="Download"
          >
            导出备份
          </el-button>
          
          <el-upload
            class="upload-demo"
            action=""
            :before-upload="importData"
            accept=".json"
            :show-file-list="false"
          >
            <el-button 
              type="warning" 
              size="large" 
              :icon="Upload"
            >
              导入数据
            </el-button>
          </el-upload>
          
          <el-divider direction="vertical" />
          
          <el-button 
            type="info" 
            size="large" 
            @click="saveToFile"
            :icon="Document"
          >
            生成 projects.js
          </el-button>
        </div>

        <!-- 统计信息 -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-number">{{ projects.length }}</div>
            <div class="stat-label">总作品数</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ getUniqueCategories().length }}</div>
            <div class="stat-label">分类数量</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">￥{{ getAveragePrice() }}</div>
            <div class="stat-label">平均价格</div>
          </div>
        </div>

        <!-- 作品列表 -->
        <div class="projects-table">
          <el-table 
            :data="paginatedProjects" 
            style="width: 100%"
            @sort-change="handleSortChange"
          >
            <el-table-column prop="id" label="ID" width="80" sortable />
            <el-table-column prop="title" label="标题" width="200" />
            <el-table-column prop="category" label="分类" width="120" />
            <el-table-column prop="difficulty" label="难度" width="100" />
            <el-table-column prop="price" label="价格" width="100" sortable />
            <el-table-column prop="timeRequired" label="时间" width="120" />
            <el-table-column label="技术栈" width="200">
              <template #default="scope">
                <el-tag 
                  v-for="tech in scope.row.technologies.slice(0, 2)" 
                  :key="tech"
                  size="small"
                  class="mr-1"
                >
                  {{ tech }}
                </el-tag>
                <span v-if="scope.row.technologies.length > 2">...</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template #default="scope">
                <el-button 
                  type="primary" 
                  size="small" 
                  @click="editProject(scope.row)"
                  :icon="Edit"
                />
                <el-button 
                  type="danger" 
                  size="small" 
                  @click="deleteProject(scope.row.id)"
                  :icon="Delete"
                />
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50]"
              :total="projects.length"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- 添加/编辑对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      :title="isEditing ? '编辑作品' : '添加新作品'"
      width="60%"
      :before-close="handleClose"
    >
      <el-form 
        ref="formRef" 
        :model="formData" 
        :rules="formRules" 
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="作品标题" prop="title">
              <el-input v-model="formData.title" placeholder="请输入作品标题" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类" prop="category">
              <el-select v-model="formData.category" placeholder="选择分类">
                <el-option 
                  v-for="cat in categories.filter(c => c !== '全部')" 
                  :key="cat" 
                  :label="cat" 
                  :value="cat" 
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="作品描述" prop="description">
          <el-input 
            v-model="formData.description" 
            type="textarea" 
            :rows="3"
            placeholder="请输入作品描述"
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="价格" prop="price">
              <el-input v-model="formData.price" placeholder="￥299" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="formData.difficulty" placeholder="选择难度">
                <el-option 
                  v-for="diff in difficulties.filter(d => d !== '全部')" 
                  :key="diff" 
                  :label="diff" 
                  :value="diff" 
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所需时间" prop="timeRequired">
              <el-input v-model="formData.timeRequired" placeholder="2-3周" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="项目图片" prop="image">
          <el-input v-model="formData.image" placeholder="图片URL地址" />
        </el-form-item>

        <el-form-item label="闲鱼链接" prop="xianyuUrl">
          <el-input v-model="formData.xianyuUrl" placeholder="https://2.taobao.com/item.htm?id=..." />
        </el-form-item>

        <el-form-item label="技术栈" prop="technologies">
          <el-select 
            v-model="formData.technologies" 
            multiple 
            filterable 
            allow-create 
            placeholder="选择或输入技术栈"
            style="width: 100%"
          >
            <el-option v-for="tech in commonTechnologies" :key="tech" :label="tech" :value="tech" />
          </el-select>
        </el-form-item>

        <el-form-item label="主要功能">
          <div class="features-input">
            <div v-for="(feature, index) in formData.features" :key="index" class="feature-item">
              <el-input v-model="formData.features[index]" placeholder="输入功能描述" />
              <el-button 
                type="danger" 
                size="small" 
                @click="removeFeature(index)"
                :icon="Delete"
              />
            </div>
            <el-button 
              type="primary" 
              size="small" 
              @click="addFeature"
              :icon="Plus"
            >
              添加功能
            </el-button>
          </div>
        </el-form-item>

        <el-form-item label="交付内容" prop="documentation">
          <el-input 
            v-model="formData.documentation" 
            placeholder="包含完整源码、数据库设计文档、部署说明"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProject" :loading="saving">
            {{ isEditing ? '更新' : '添加' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { 
  Plus, Edit, Delete, Download, Upload, Document,
  Search, Refresh 
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { projects as originalProjects, categories, difficulties } from '~/data/projects'

// 响应式数据
const projects = ref([...originalProjects])
const dialogVisible = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)

// 表单数据
const formData = ref({
  id: null,
  title: '',
  category: '',
  description: '',
  price: '',
  image: '',
  technologies: [],
  features: [''],
  xianyuUrl: '',
  difficulty: '',
  timeRequired: '',
  documentation: ''
})

// 常用技术栈
const commonTechnologies = [
  'Vue.js', 'React', 'Angular', 'Node.js', 'Express',
  'Flask', 'Django', 'Spring Boot', 'MySQL', 'MongoDB',
  'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS',
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C#',
  '微信小程序', 'uni-app', 'Flutter', 'React Native'
]

// 表单验证规则
const formRules = {
  title: [{ required: true, message: '请输入作品标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  description: [{ required: true, message: '请输入作品描述', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  difficulty: [{ required: true, message: '请选择难度', trigger: 'change' }],
  timeRequired: [{ required: true, message: '请输入所需时间', trigger: 'blur' }],
  image: [{ required: true, message: '请输入图片URL', trigger: 'blur' }],
  xianyuUrl: [{ required: true, message: '请输入闲鱼链接', trigger: 'blur' }],
  technologies: [{ required: true, message: '请选择技术栈', trigger: 'change' }],
  documentation: [{ required: true, message: '请输入交付内容', trigger: 'blur' }]
}

const formRef = ref()

// 计算属性
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return projects.value.slice(start, end)
})

// 方法
const getUniqueCategories = () => {
  return [...new Set(projects.value.map(p => p.category))]
}

const getAveragePrice = () => {
  const prices = projects.value.map(p => parseInt(p.price.replace(/[^\d]/g, '')))
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length
  return Math.round(average)
}

const showAddDialog = () => {
  isEditing.value = false
  resetForm()
  dialogVisible.value = true
}

const editProject = (project) => {
  isEditing.value = true
  formData.value = { ...project }
  dialogVisible.value = true
}

const resetForm = () => {
  formData.value = {
    id: null,
    title: '',
    category: '',
    description: '',
    price: '',
    image: '',
    technologies: [],
    features: [''],
    xianyuUrl: '',
    difficulty: '',
    timeRequired: '',
    documentation: ''
  }
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

const addFeature = () => {
  formData.value.features.push('')
}

const removeFeature = (index) => {
  if (formData.value.features.length > 1) {
    formData.value.features.splice(index, 1)
  }
}

const saveProject = async () => {
  try {
    await formRef.value.validate()
    saving.value = true
    
    // 清理空的功能项
    formData.value.features = formData.value.features.filter(f => f.trim() !== '')
    
    if (isEditing.value) {
      // 更新现有项目
      const index = projects.value.findIndex(p => p.id === formData.value.id)
      if (index !== -1) {
        projects.value[index] = { ...formData.value }
      }
      ElMessage.success('作品更新成功！')
    } else {
      // 添加新项目
      const newId = Math.max(...projects.value.map(p => p.id)) + 1
      const newProject = { ...formData.value, id: newId }
      projects.value.push(newProject)
      ElMessage.success('作品添加成功！')
    }
    
    dialogVisible.value = false
    resetForm()
    
    // 提示用户生成新文件
    setTimeout(() => {
      ElMessageBox.confirm('是否现在生成新的 projects.js 文件？', '提示', {
        confirmButtonText: '生成文件',
        cancelButtonText: '稍后手动',
        type: 'info'
      }).then(() => {
        saveToFile()
      }).catch(() => {
        ElMessage.info('可以稍后点击“生成 projects.js”按钮更新文件')
      })
    }, 500)
    
  } catch (error) {
    ElMessage.error('保存失败，请检查表单数据')
  } finally {
    saving.value = false
  }
}

const deleteProject = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除这个作品吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    projects.value = projects.value.filter(p => p.id !== id)
    ElMessage.success('删除成功！请记得更新 projects.js 文件')
    
  } catch (error) {
    // 用户取消删除
  }
}

const exportData = () => {
  const exportData = {
    projects: projects.value,
    categories,
    difficulties,
    priceRanges: [
      { label: '全部', min: 0, max: Infinity },
      { label: '￥100以下', min: 0, max: 100 },
      { label: '￥100-299', min: 100, max: 299 },
      { label: '￥300-499', min: 300, max: 499 },
      { label: '￥500以上', min: 500, max: Infinity }
    ],
    exportTime: new Date().toISOString(),
    totalProjects: projects.value.length
  }
  
  const dataStr = JSON.stringify(exportData, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `projects-backup-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success('数据备份导出成功！')
}

const importData = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result)
      
      // 检查是否是完整的备份文件
      if (importedData.projects && Array.isArray(importedData.projects)) {
        projects.value = importedData.projects
        ElMessage.success(`数据导入成功！共导入 ${importedData.projects.length} 个作品`)
      } 
      // 如果是纯项目数组格式
      else if (Array.isArray(importedData)) {
        projects.value = importedData
        ElMessage.success(`数据导入成功！共导入 ${importedData.length} 个作品`)
      } 
      else {
        throw new Error('不支持的文件格式')
      }
      
      // 自动生成新文件
      setTimeout(() => {
        ElMessageBox.confirm('是否生成新的 projects.js 文件？', '提示', {
          confirmButtonText: '生成',
          cancelButtonText: '稍后',
          type: 'info'
        }).then(() => {
          saveToFile()
        }).catch(() => {})
      }, 1000)
      
    } catch (error) {
      console.error('导入错误:', error)
      ElMessage.error('文件格式错误或数据无效！')
    }
  }
  reader.readAsText(file)
  return false // 阻止自动上传
}

const saveToFile = async () => {
  try {
    // 生成新的 projects.js 文件内容
    const projectsContent = generateProjectsFileContent()
    
    // 下载文件供用户手动替换
    const blob = new Blob([projectsContent], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'projects.js'
    link.click()
    URL.revokeObjectURL(url)
    
    ElMessage({
      message: '已生成新的 projects.js 文件，请手动替换 data/projects.js 文件后刷新页面',
      type: 'success',
      duration: 5000,
      showClose: true
    })
  } catch (error) {
    console.error('生成文件失败:', error)
    ElMessage.error('生成文件失败，请使用导出功能')
  }
}

// 生成 projects.js 文件内容
const generateProjectsFileContent = () => {
  return `export const projects = ${
    JSON.stringify(projects.value, null, 2)
  };

export const categories = ${
    JSON.stringify(categories, null, 2)
  };

export const difficulties = ${
    JSON.stringify(difficulties, null, 2)
  };

export const priceRanges = ${
    JSON.stringify([
      { label: '全部', min: 0, max: Infinity },
      { label: '￥100以下', min: 0, max: 100 },
      { label: '￥100-299', min: 100, max: 299 },
      { label: '￥300-499', min: 300, max: 499 },
      { label: '￥500以上', min: 500, max: Infinity }
    ], null, 2)
  };`
}

const handleSortChange = ({ prop, order }) => {
  if (order) {
    projects.value.sort((a, b) => {
      if (prop === 'price') {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ''))
        const priceB = parseInt(b.price.replace(/[^\d]/g, ''))
        return order === 'ascending' ? priceA - priceB : priceB - priceA
      }
      return order === 'ascending' ? 
        a[prop].localeCompare(b[prop]) : 
        b[prop].localeCompare(a[prop])
    })
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭吗？未保存的数据将丢失。')
    .then(() => done())
    .catch(() => {})
}

// SEO配置
useHead({
  title: '作品管理系统 - 毕业顺利',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.admin-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.admin-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.admin-content {
  padding: 2rem 0;
}

.admin-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
}

.projects-table {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.pagination-wrapper {
  margin-top: 1.5rem;
  text-align: center;
}

.features-input {
  width: 100%;
}

.feature-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.feature-item .el-input {
  flex: 1;
}

.mr-1 {
  margin-right: 4px;
}

.upload-demo {
  display: inline-block;
}

@media (max-width: 768px) {
  .admin-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>