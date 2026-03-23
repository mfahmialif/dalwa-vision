<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <button class="flex items-center gap-2 rounded-lg h-10 px-5 bg-accent text-btn-text font-bold transition-colors hover:bg-accent/90 shadow-[0_0_15px_rgba(251,191,36,0.3)] shrink-0 cursor-pointer active:scale-95" style="color: var(--text-btn)">
        <span class="material-symbols-outlined text-[20px]">add_circle</span>
        <span>Tambah Pengumuman</span>
      </button>
    </div>

    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      <div class="relative w-full lg:w-[400px]">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-accent text-[20px] z-10">search</span>
        <input v-model="searchQuery" class="filter-input w-full rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Search pengumuman..." type="text" />
      </div>
      <div class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 lg:gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium shrink-0" style="color: var(--text-body)">Prioritas:</span>
          <VueMultiselect v-model="filterPriority" :options="priorityOptions" :close-on-select="true" :searchable="true" :allow-empty="false" :show-labels="false" label="name" track-by="value" class="flex-1 sm:w-[150px] sm:flex-none" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium shrink-0" style="color: var(--text-body)">Status:</span>
          <VueMultiselect v-model="filterStatus" :options="statusOptions" :close-on-select="true" :searchable="true" :allow-empty="false" :show-labels="false" label="name" track-by="value" class="flex-1 sm:w-[150px] sm:flex-none" />
        </div>
      </div>
    </div>

    <div class="table-wrapper rounded-xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto p-2">
        <table class="w-full text-left border-collapse">
          <thead><tr class="table-head">
            <th class="px-4 py-4 text-sm font-semibold w-16" style="color: var(--text-heading)">#</th>
            <th class="px-4 py-4 text-sm font-semibold" style="color: var(--text-heading)">Judul</th>
            <th class="px-4 py-4 text-sm font-semibold" style="color: var(--text-heading)">Target</th>
            <th class="px-4 py-4 text-sm font-semibold" style="color: var(--text-heading)">Lokasi</th>
            <th class="px-4 py-4 text-sm font-semibold" style="color: var(--text-heading)">Prioritas</th>
            <th class="px-4 py-4 text-sm font-semibold" style="color: var(--text-heading)">Waktu</th>
            <th class="px-4 py-4 text-sm font-semibold" style="color: var(--text-heading)">Status</th>
            <th class="px-4 py-4 text-sm font-semibold text-right" style="color: var(--text-heading)">Actions</th>
          </tr></thead>
          <tbody class="table-body">
            <tr v-for="(item, idx) in filteredItems" :key="item.id" class="table-row-hover">
              <td class="px-4 py-4 text-sm font-mono" style="color: var(--text-muted)">{{ idx + 1 }}</td>
              <td class="px-4 py-4"><span class="text-sm font-bold line-clamp-1" style="color: var(--text-heading)">{{ item.title }}</span></td>
              <td class="px-4 py-4 text-sm" style="color: var(--text-body)">{{ item.audience }}</td>
              <td class="px-4 py-4"><div class="flex items-center gap-1.5 text-sm" style="color: var(--text-muted)"><span class="material-symbols-outlined text-[16px]">location_on</span>{{ item.location }}</div></td>
              <td class="px-4 py-4"><span :class="priorityBadge(item.priority)">{{ item.priority }}</span></td>
              <td class="px-4 py-4 text-sm" style="color: var(--text-muted)">{{ item.time }}</td>
              <td class="px-4 py-4"><span :class="statusBadge(item.status)">{{ item.status }}</span></td>
              <td class="px-4 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="action-btn p-2 rounded-lg" title="Edit"><span class="material-symbols-outlined text-[20px] text-accent">edit</span></button>
                  <button class="action-btn action-btn-delete p-2 rounded-lg" title="Delete"><span class="material-symbols-outlined text-[20px] text-accent">delete</span></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-bar flex items-center justify-between px-6 py-4">
        <span class="text-sm font-medium" style="color: var(--text-muted)">Showing 1 to {{ filteredItems.length }} of {{ items.length }} items</span>
        <div class="flex items-center gap-1.5 ml-auto">
          <button class="page-btn p-2 rounded-lg disabled:opacity-50" disabled><span class="material-symbols-outlined text-[20px]">chevron_left</span></button>
          <button class="page-btn-active w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center">1</button>
          <button class="page-btn p-2 rounded-lg"><span class="material-symbols-outlined text-[20px]">chevron_right</span></button>
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
const priorityOptions = [{ name: 'Semua', value: 'all' }, { name: 'Urgent', value: 'Urgent' }, { name: 'Normal', value: 'Normal' }, { name: 'Info', value: 'Info' }]
const statusOptions = [{ name: 'All', value: 'all' }, { name: 'Aktif', value: 'Aktif' }, { name: 'Expired', value: 'Expired' }]
const filterPriority = ref(priorityOptions[0])
const filterStatus = ref(statusOptions[0])

const items = ref([
  { id: 1, title: 'Libur Nasional Isra Mi\'raj', audience: 'Seluruh Santri', location: 'Pesantren', priority: 'Urgent', time: '1 Jam lalu', status: 'Aktif' },
  { id: 2, title: 'Pendaftaran Ekskul Semester Genap', audience: 'Santri Baru', location: 'Sekretariat', priority: 'Normal', time: '3 Jam lalu', status: 'Aktif' },
  { id: 3, title: 'Jadwal Ujian Tengah Semester', audience: 'Kelas 7-12', location: 'Gedung Pendidikan', priority: 'Urgent', time: '1 Hari lalu', status: 'Aktif' },
  { id: 4, title: 'Pemeliharaan Jaringan Internet', audience: 'Seluruh Warga', location: 'Area Pesantren', priority: 'Info', time: '2 Hari lalu', status: 'Aktif' },
  { id: 5, title: 'Rapat Wali Santri', audience: 'Wali Santri', location: 'Aula Utama', priority: 'Normal', time: '3 Hari lalu', status: 'Expired' },
  { id: 6, title: 'Pengumpulan Berkas Beasiswa', audience: 'Santri Berprestasi', location: 'Kantor Pesantren', priority: 'Urgent', time: '5 Hari lalu', status: 'Expired' }
])

const filteredItems = computed(() => items.value.filter(i => {
  const s = i.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  const p = filterPriority.value.value === 'all' || i.priority === filterPriority.value.value
  const st = filterStatus.value.value === 'all' || i.status === filterStatus.value.value
  return s && p && st
}))

function priorityBadge(p) {
  const b = 'inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold'
  if (p === 'Urgent') return `${b} text-red-400 border border-red-500/30 bg-red-900/20 shadow-[0_0_10px_rgba(248,113,113,0.3)]`
  if (p === 'Normal') return `${b} text-accent border border-accent/30 bg-accent/10`
  return `${b} text-blue-400 border border-blue-500/30 bg-blue-900/20`
}
function statusBadge(s) {
  const b = 'inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold'
  return s === 'Aktif' ? `${b} text-green-400 border border-green-500/30 bg-green-900/20` : `${b} text-slate-400 border border-slate-500/30 bg-slate-800/50`
}
</script>

<style scoped>
.filter-input { background: var(--bg-card); border: 1px solid var(--border); color: var(--text-heading); }
.filter-input::placeholder { color: var(--text-muted); }
.filter-input:focus { border-color: var(--color-accent); box-shadow: 0 0 12px rgba(251, 191, 36, 0.3); }
.action-btn { color: var(--text-muted); }
.action-btn:hover { color: var(--color-accent); background: var(--bg-input); }
.action-btn-delete:hover { color: #f87171; background: var(--bg-input); }
.pagination-bar { border-top: 1px solid var(--border); background: var(--bg-card); }
.page-btn { color: var(--text-muted); border: 1px solid transparent; }
.page-btn:hover { background: var(--bg-input); color: var(--text-heading); }
.page-btn-active { background: var(--color-accent); color: var(--text-btn); box-shadow: 0 0 10px rgba(251, 191, 36, 0.4); }
</style>
