<template>
  <div class="bangumi-collection">
    <!-- 加载中 -->
    <div v-if="loading" class="bangumi-loading">
      正在加载收藏数据...
    </div>

    <!-- 错误提示 -->
    <div v-else-if="error" class="bangumi-error">
      {{ error }}
    </div>

    <!-- 筛选栏 -->
    <template v-else>
    <div class="bangumi-filters">
      <div class="filter-group">
        <button
          v-for="tab in subjectTypeTabs"
          :key="tab.value"
          :class="['filter-btn', { active: activeSubjectType === tab.value }]"
          @click="activeSubjectType = tab.value; currentPage = 1"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="filter-group">
        <button
          v-for="tab in collectionTypeTabs"
          :key="tab.value"
          :class="['filter-btn', { active: activeCollectionType === tab.value }]"
          @click="activeCollectionType = tab.value; currentPage = 1"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 统计 -->
    <div class="bangumi-stats">
      共 {{ filteredData.length }} 部
    </div>

    <!-- 卡片网格 -->
    <div v-if="paginatedData.length" class="bangumi-grid">
      <a
        v-for="item in paginatedData"
        :key="item.subject_id"
        :href="`https://bgm.tv/subject/${item.subject_id}`"
        class="bangumi-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card-cover">
          <img
            :src="item.images?.medium || item.subject?.images?.medium || ''"
            :alt="item.name_cn || item.name"
            loading="lazy"
          />
          <div v-if="item.rate > 0" class="card-rating" :class="ratingClass(item.rate)">
            {{ item.rate }}
          </div>
        </div>
        <div class="card-info">
          <div class="card-title" :title="item.name_cn || item.name">
            {{ item.name_cn || item.name }}
          </div>
          <div class="card-meta">
            <span v-if="item.subject?.date" class="card-date">{{ item.subject.date.slice(0, 4) }}</span>
            <span v-if="item.eps > 0" class="card-eps">
              {{ item.ep_status }}/{{ item.eps }}话
            </span>
          </div>
        </div>
      </a>
    </div>

    <div v-else class="bangumi-empty">
      暂无数据
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="bangumi-pagination">
      <button
        :disabled="currentPage <= 1"
        @click="currentPage--"
      >
        上一页
      </button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button
        :disabled="currentPage >= totalPages"
        @click="currentPage++"
      >
        下一页
      </button>
    </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { BangumiSubject, SubjectType, CollectionType } from '../types'
import {
  SubjectTypeLabels,
  CollectionTypeLabels,
  SubjectTypeColors,
} from '../types'

const props = withDefaults(defineProps<{
  data?: BangumiSubject[]
  src?: string
  pageSize?: number
}>(), {
  data: () => [],
  src: '/bangumi.json',
  pageSize: 24,
})

const items = ref<BangumiSubject[]>(props.data)
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  if (props.data.length > 0) {
    items.value = props.data
    return
  }
  loading.value = true
  try {
    const res = await fetch(props.src)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    items.value = await res.json()
  } catch (e) {
    error.value = `数据加载失败: ${(e as Error).message}`
  } finally {
    loading.value = false
  }
})

// 筛选状态
const activeSubjectType = ref<SubjectType | 'all'>('all')
const activeCollectionType = ref<CollectionType | 'all'>('all')
const currentPage = ref(1)

// Tab 定义
const subjectTypeTabs = computed(() => {
  const types = new Set(items.value.map(d => d.subject_type))
  const tabs: { label: string; value: SubjectType | 'all' }[] = [
    { label: '全部', value: 'all' },
  ]
  for (const t of [2, 1, 3, 4, 6] as SubjectType[]) {
    if (types.has(t)) {
      tabs.push({ label: SubjectTypeLabels[t], value: t })
    }
  }
  return tabs
})

const collectionTypeTabs = computed(() => {
  const types = new Set(items.value.map(d => d.type))
  const tabs: { label: string; value: CollectionType | 'all' }[] = [
    { label: '全部', value: 'all' },
  ]
  for (const t of [3, 2, 1, 4, 5] as CollectionType[]) {
    if (types.has(t)) {
      tabs.push({ label: CollectionTypeLabels[t], value: t })
    }
  }
  return tabs
})

// 过滤 & 排序
const filteredData = computed(() => {
  let list = items.value
  if (activeSubjectType.value !== 'all') {
    list = list.filter(d => d.subject_type === activeSubjectType.value)
  }
  if (activeCollectionType.value !== 'all') {
    list = list.filter(d => d.type === activeCollectionType.value)
  }
  return list.sort((a, b) => {
    if (a.rate !== b.rate) return b.rate - a.rate
    return (b.subject?.date || '') < (a.subject?.date || '') ? -1 : 1
  })
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredData.value.slice(start, start + props.pageSize)
})

function ratingClass(rate: number): string {
  if (rate >= 8) return 'rating-high'
  if (rate >= 6) return 'rating-mid'
  return 'rating-low'
}
</script>

<style scoped>
.bangumi-collection {
  max-width: 100%;
}

.bangumi-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.filter-btn {
  padding: 4px 14px;
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.filter-btn.active {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1-text, #fff);
  border-color: var(--vp-c-brand-1);
}

.bangumi-stats {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.bangumi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 14px;
}

.bangumi-card {
  display: block;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.bangumi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.card-cover {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--vp-c-bg-mute);
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-rating {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}

.rating-high { background: #e74c3c; }
.rating-mid  { background: #f39c12; }
.rating-low  { background: #95a5a6; }

.card-info {
  padding: 8px 10px;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.bangumi-empty {
  text-align: center;
  padding: 60px 0;
  color: var(--vp-c-text-3);
}

.bangumi-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
}

.bangumi-pagination button {
  padding: 6px 18px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.bangumi-pagination button:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.bangumi-pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
