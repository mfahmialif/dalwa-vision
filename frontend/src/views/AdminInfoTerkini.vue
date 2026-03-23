<template>
  <div class="flex flex-col gap-6">

    <!-- ═══ ACTION BAR ═══ -->
    <div class="flex items-center justify-between">
      <button class="flex items-center gap-2 rounded-lg h-10 px-5 bg-accent text-btn-text font-bold transition-colors hover:bg-accent/90 shadow-[0_0_15px_rgba(251,191,36,0.3)] shrink-0 cursor-pointer active:scale-95"
              style="color: var(--text-btn)">
        <span class="material-symbols-outlined text-[20px]">add_circle</span>
        <span>Tambah Konten</span>
      </button>
    </div>

    <!-- ═══ STATS ROW ═══ -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="stat-card rounded-xl p-4 flex items-center gap-4 border border-transparent">
        <div class="p-3 rounded-lg" :class="stat.iconBg">
          <span class="material-symbols-outlined text-[24px]" :class="stat.iconColor">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider" style="color: var(--text-muted)">{{ stat.label }}</p>
          <p class="text-2xl font-bold" style="color: var(--text-heading)">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- ═══ FILTERS BAR ═══ -->
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      <!-- Search -->
      <div class="relative w-full lg:w-[400px]">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-accent text-[20px] z-10">search</span>
        <input v-model="searchQuery"
               class="filter-input w-full rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
               placeholder="Search content..." type="text" />
      </div>
      <!-- Filter Controls -->
      <div class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 lg:gap-4">
        <!-- Category Filter -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium shrink-0" style="color: var(--text-body)">Kategori:</span>
          <VueMultiselect
            v-model="filterCategory"
            :options="categoryOptions"
            :close-on-select="true"
            :clear-on-select="false"
            :searchable="true"
            :allow-empty="false"
            :show-labels="false"
            label="name"
            track-by="value"
            placeholder="Semua"
            class="flex-1 sm:w-[160px] sm:flex-none"
          />
        </div>
        <!-- Status Filter -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium shrink-0" style="color: var(--text-body)">Status:</span>
          <VueMultiselect
            v-model="filterStatus"
            :options="statusOptions"
            :close-on-select="true"
            :clear-on-select="false"
            :searchable="true"
            :allow-empty="false"
            :show-labels="false"
            label="name"
            track-by="value"
            placeholder="All Status"
            class="flex-1 sm:w-[150px] sm:flex-none"
          />
        </div>
        <!-- Entries -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium shrink-0" style="color: var(--text-body)">Show:</span>
          <VueMultiselect
            v-model="perPage"
            :options="perPageOptions"
            :close-on-select="true"
            :clear-on-select="false"
            :searchable="true"
            :allow-empty="false"
            :show-labels="false"
            label="name"
            track-by="value"
            placeholder="10"
            class="w-[90px]"
          />
          <span class="text-sm font-medium shrink-0" style="color: var(--text-body)">entries</span>
        </div>
      </div>
    </div>

    <!-- ═══ CONTENT TABLE ═══ -->
    <div class="table-wrapper rounded-xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto p-2">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="table-head">
              <th class="px-4 py-4 text-sm font-semibold tracking-wide w-16" style="color: var(--text-heading)">#</th>
              <th class="px-4 py-4 text-sm font-semibold tracking-wide" style="color: var(--text-heading)">Thumbnail</th>
              <th class="px-4 py-4 text-sm font-semibold tracking-wide" style="color: var(--text-heading)">Judul</th>
              <th class="px-4 py-4 text-sm font-semibold tracking-wide" style="color: var(--text-heading)">Kategori</th>
              <th class="px-4 py-4 text-sm font-semibold tracking-wide" style="color: var(--text-heading)">Waktu</th>
              <th class="px-4 py-4 text-sm font-semibold tracking-wide" style="color: var(--text-heading)">Status</th>
              <th class="px-4 py-4 text-sm font-semibold tracking-wide text-right" style="color: var(--text-heading)">Actions</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="(item, idx) in filteredItems" :key="item.id" class="table-row-hover">
              <td class="px-4 py-4 text-sm font-mono" style="color: var(--text-muted)">{{ idx + 1 }}</td>
              <td class="px-4 py-4">
                <div class="w-16 h-10 rounded-lg overflow-hidden bg-cover bg-center border"
                     :style="{ backgroundImage: `url('${item.image}')`, borderColor: 'var(--border)' }">
                  <!-- Play icon for video -->
                  <div v-if="item.category === 'Video'" class="w-full h-full flex items-center justify-center bg-black/40">
                    <span class="material-symbols-outlined text-white text-[18px]">play_arrow</span>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm font-bold line-clamp-1" style="color: var(--text-heading)">{{ item.title }}</span>
              </td>
              <td class="px-4 py-4">
                <span :class="categoryBadge(item.category)">{{ item.category }}</span>
              </td>
              <td class="px-4 py-4 text-sm" style="color: var(--text-muted)">{{ item.time }}</td>
              <td class="px-4 py-4">
                <span :class="statusBadge(item.status)">{{ item.status }}</span>
              </td>
              <td class="px-4 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="action-btn p-2 rounded-lg transition-all duration-200" title="Preview">
                    <span class="material-symbols-outlined text-[20px] text-accent">visibility</span>
                  </button>
                  <button class="action-btn p-2 rounded-lg transition-all duration-200" title="Edit">
                    <span class="material-symbols-outlined text-[20px] text-accent">edit</span>
                  </button>
                  <button class="action-btn action-btn-delete p-2 rounded-lg transition-all duration-200" title="Delete">
                    <span class="material-symbols-outlined text-[20px] text-accent">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination-bar flex items-center justify-between px-6 py-4">
        <span class="text-sm font-medium" style="color: var(--text-muted)">Showing 1 to {{ filteredItems.length }} of {{ items.length }} items</span>
        <div class="flex items-center gap-1.5 ml-auto">
          <button class="page-btn p-2 rounded-lg flex items-center justify-center disabled:opacity-50" disabled>
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button class="page-btn-active w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center">1</button>
          <button class="page-btn w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center">2</button>
          <button class="page-btn p-2 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

const searchQuery = ref('')

const categoryOptions = [
  { name: 'Semua', value: 'all' },
  { name: 'Artikel', value: 'Artikel' },
  { name: 'Video', value: 'Video' },
  { name: 'Gambar', value: 'Gambar' }
]
const statusOptions = [
  { name: 'All Status', value: 'all' },
  { name: 'Published', value: 'Published' },
  { name: 'Draft', value: 'Draft' }
]
const perPageOptions = [
  { name: '10', value: 10 },
  { name: '25', value: 25 },
  { name: '50', value: 50 },
  { name: '100', value: 100 }
]

const filterCategory = ref(categoryOptions[0])
const filterStatus = ref(statusOptions[0])
const perPage = ref(perPageOptions[0])

const stats = [
  { label: 'Total Konten', value: 24, icon: 'article', iconBg: 'bg-accent/10', iconColor: 'text-accent' },
  { label: 'Artikel', value: 12, icon: 'description', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Video', value: 6, icon: 'videocam', iconBg: 'bg-red-500/10', iconColor: 'text-red-400' },
  { label: 'Gambar', value: 6, icon: 'image', iconBg: 'bg-green-500/10', iconColor: 'text-green-400' }
]

const items = ref([
  { id: 1, category: 'Artikel', title: 'Kunjungan Duta Besar Arab Saudi ke Ponpes Dalwa', time: '2 Jam lalu', image: '/img/news/news1.jpg', status: 'Published' },
  { id: 2, category: 'Video', title: 'Haul Akbar Abuya Maliki: Ribuan Santri Padati Masjid', time: '4 Jam lalu', image: '/img/news/news2.jpg', status: 'Published' },
  { id: 3, category: 'Gambar', title: 'Lomba Pidato Bahasa Arab Tingkat Nasional Dimulai', time: '5 Jam lalu', image: '/img/news/news3.jpg', status: 'Published' },
  { id: 4, category: 'Artikel', title: 'Peresmian Gedung Baru Asrama Santri Putra', time: '1 Hari lalu', image: '/img/news/news4.jpg', status: 'Published' },
  { id: 5, category: 'Video', title: 'Seminar Ekonomi Syariah bersama Pakar Internasional', time: '1 Hari lalu', image: '/img/news/news5.jpg', status: 'Draft' },
  { id: 6, category: 'Gambar', title: 'Kegiatan Bakti Sosial Santri di Desa Sekitar', time: '2 Hari lalu', image: '/img/news/news6.jpg', status: 'Published' }
])

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = filterCategory.value.value === 'all' || item.category === filterCategory.value.value
    const matchStatus = filterStatus.value.value === 'all' || item.status === filterStatus.value.value
    return matchSearch && matchCategory && matchStatus
  })
})

function categoryBadge(category) {
  const base = 'inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold'
  if (category === 'Artikel') return `${base} bg-accent/20 text-accent border border-accent/30`
  if (category === 'Video') return `${base} bg-red-900/30 text-red-400 border border-red-800/40`
  if (category === 'Gambar') return `${base} bg-blue-900/30 text-blue-400 border border-blue-800/40`
  return `${base} bg-slate-800/50 text-slate-400 border border-slate-700/50`
}

function statusBadge(status) {
  const base = 'inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold'
  if (status === 'Published') return `${base} text-green-400 border border-green-500/30 bg-green-900/20 shadow-[0_0_10px_rgba(74,222,128,0.3)]`
  return `${base} text-yellow-400 border border-yellow-500/30 bg-yellow-900/20 shadow-[0_0_10px_rgba(250,204,21,0.2)]`
}
</script>

<style scoped>
/* ═══ Filter Inputs ═══ */
.filter-input {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-heading);
  transition: box-shadow 0.3s ease;
}
.filter-input::placeholder { color: var(--text-muted); }
.filter-input:hover { box-shadow: 0 0 15px rgba(251, 191, 36, 0.15); }
.filter-input:focus { border-color: var(--color-accent); box-shadow: 0 0 12px rgba(251, 191, 36, 0.3); }

/* ═══ Action Buttons ═══ */
.action-btn { color: var(--text-muted); }
.action-btn:hover { color: var(--color-accent); background: var(--bg-input); }
.action-btn-delete:hover { color: #f87171; background: var(--bg-input); }

/* ═══ Pagination ═══ */
.pagination-bar { border-top: 1px solid var(--border); background: var(--bg-card); }
.page-btn { color: var(--text-muted); border: 1px solid transparent; transition: all 0.2s ease; }
.page-btn:hover { background: var(--bg-input); color: var(--text-heading); }
.page-btn-active { background: var(--color-accent); color: var(--text-btn); box-shadow: 0 0 10px rgba(251, 191, 36, 0.4); }
</style>
