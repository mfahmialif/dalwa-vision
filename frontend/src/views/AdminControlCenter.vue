<template>
  <div class="flex flex-col gap-6">

    <!-- ═══ LIVE STATUS BAR ═══ -->
    <div class="status-bar rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
          <span class="material-symbols-outlined text-green-400 text-[22px] animate-pulse">cell_tower</span>
        </div>
        <div>
          <p class="text-sm font-bold" style="color: var(--text-heading)">Broadcast System Active</p>
          <p class="text-xs" style="color: var(--text-muted)">Semua sistem berjalan normal</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background: var(--bg-input)">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="text-xs font-bold text-green-400">{{ onlineCount }} Online</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background: var(--bg-input)">
          <span class="w-2 h-2 rounded-full bg-red-400"></span>
          <span class="text-xs font-bold text-red-400">{{ offlineCount }} Offline</span>
        </div>
        <span class="text-xs font-mono" style="color: var(--text-muted)">Last sync: {{ lastSync }}</span>
      </div>
    </div>

    <!-- ═══ ACTION CARDS GRID ═══ -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

      <!-- Push Konten ke TV Tertentu -->
      <div class="action-card rounded-xl p-6 flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center border border-accent/30">
            <span class="material-symbols-outlined text-accent text-[28px]">send_to_mobile</span>
          </div>
          <div>
            <h3 class="font-bold text-sm" style="color: var(--text-heading)">Push Konten ke TV</h3>
            <p class="text-xs" style="color: var(--text-muted)">Kirim konten ke TV tertentu</p>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div>
            <label class="text-xs font-medium mb-1.5 block" style="color: var(--text-muted)">Pilih TV</label>
            <VueMultiselect v-model="selectedTV" :options="tvDevices" :close-on-select="true" :searchable="true" :allow-empty="false" :show-labels="false" label="name" track-by="id" placeholder="Pilih device..." />
          </div>
          <div>
            <label class="text-xs font-medium mb-1.5 block" style="color: var(--text-muted)">Pilih Konten</label>
            <VueMultiselect v-model="selectedContent" :options="contentList" :close-on-select="true" :searchable="true" :allow-empty="false" :show-labels="false" label="name" track-by="id" placeholder="Pilih konten..." />
          </div>
        </div>
        <button class="action-btn-primary w-full flex items-center justify-center gap-2 rounded-lg h-10 font-bold text-sm cursor-pointer active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined text-[18px]">send</span>
          Push Konten
        </button>
      </div>

      <!-- Push ke Semua TV -->
      <div class="action-card rounded-xl p-6 flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center border border-blue-500/30">
            <span class="material-symbols-outlined text-blue-400 text-[28px]">cast_connected</span>
          </div>
          <div>
            <h3 class="font-bold text-sm" style="color: var(--text-heading)">Push ke Semua TV</h3>
            <p class="text-xs" style="color: var(--text-muted)">Broadcast ke seluruh device</p>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div>
            <label class="text-xs font-medium mb-1.5 block" style="color: var(--text-muted)">Pilih Konten</label>
            <VueMultiselect v-model="broadcastContent" :options="contentList" :close-on-select="true" :searchable="true" :allow-empty="false" :show-labels="false" label="name" track-by="id" placeholder="Pilih konten..." />
          </div>
          <div class="info-box rounded-lg px-3 py-2 flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-400 text-[16px]">info</span>
            <span class="text-xs" style="color: var(--text-muted)">Akan dikirim ke <strong class="text-blue-400">{{ onlineCount }} TV</strong> yang online</span>
          </div>
        </div>
        <button class="action-btn-blue w-full flex items-center justify-center gap-2 rounded-lg h-10 font-bold text-sm cursor-pointer active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined text-[18px]">cast</span>
          Broadcast ke Semua
        </button>
      </div>

      <!-- Force Reload -->
      <div class="action-card rounded-xl p-6 flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center border border-green-500/30">
            <span class="material-symbols-outlined text-green-400 text-[28px]">refresh</span>
          </div>
          <div>
            <h3 class="font-bold text-sm" style="color: var(--text-heading)">Force Reload</h3>
            <p class="text-xs" style="color: var(--text-muted)">Paksa TV untuk reload halaman</p>
          </div>
        </div>
        <div class="flex flex-col gap-3 flex-1">
          <div>
            <label class="text-xs font-medium mb-1.5 block" style="color: var(--text-muted)">Target</label>
            <VueMultiselect v-model="reloadTarget" :options="targetOptions" :close-on-select="true" :searchable="true" :allow-empty="false" :show-labels="false" label="name" track-by="value" placeholder="Pilih target..." />
          </div>
        </div>
        <button class="action-btn-green w-full flex items-center justify-center gap-2 rounded-lg h-10 font-bold text-sm cursor-pointer active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined text-[18px]">sync</span>
          Force Reload
        </button>
      </div>

      <!-- Force Home -->
      <div class="action-card rounded-xl p-6 flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center border border-purple-500/30">
            <span class="material-symbols-outlined text-purple-400 text-[28px]">home</span>
          </div>
          <div>
            <h3 class="font-bold text-sm" style="color: var(--text-heading)">Force Home</h3>
            <p class="text-xs" style="color: var(--text-muted)">Kembalikan TV ke halaman utama</p>
          </div>
        </div>
        <div class="flex flex-col gap-3 flex-1">
          <div>
            <label class="text-xs font-medium mb-1.5 block" style="color: var(--text-muted)">Target</label>
            <VueMultiselect v-model="homeTarget" :options="targetOptions" :close-on-select="true" :searchable="true" :allow-empty="false" :show-labels="false" label="name" track-by="value" placeholder="Pilih target..." />
          </div>
        </div>
        <button class="action-btn-purple w-full flex items-center justify-center gap-2 rounded-lg h-10 font-bold text-sm cursor-pointer active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined text-[18px]">home</span>
          Force Home
        </button>
      </div>

      <!-- Tampilkan Banner Global -->
      <div class="action-card rounded-xl p-6 flex flex-col gap-4 md:col-span-2 xl:col-span-2">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center border border-red-500/30">
            <span class="material-symbols-outlined text-red-400 text-[28px]">emergency</span>
          </div>
          <div>
            <h3 class="font-bold text-sm" style="color: var(--text-heading)">Tampilkan Banner Global</h3>
            <p class="text-xs" style="color: var(--text-muted)">Tampilkan banner darurat / pengumuman di semua TV</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-medium mb-1.5 block" style="color: var(--text-muted)">Judul Banner</label>
            <input v-model="bannerTitle" class="filter-input w-full rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Masukkan judul banner..." />
          </div>
          <div>
            <label class="text-xs font-medium mb-1.5 block" style="color: var(--text-muted)">Tipe Banner</label>
            <VueMultiselect v-model="bannerType" :options="bannerTypes" :close-on-select="true" :searchable="true" :allow-empty="false" :show-labels="false" label="name" track-by="value" placeholder="Pilih tipe..." />
          </div>
          <div class="sm:col-span-2">
            <label class="text-xs font-medium mb-1.5 block" style="color: var(--text-muted)">Pesan Banner</label>
            <textarea v-model="bannerMessage" class="filter-input w-full rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none" rows="3" placeholder="Masukkan pesan banner..."></textarea>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <button class="action-btn-red flex-1 flex items-center justify-center gap-2 rounded-lg h-10 font-bold text-sm cursor-pointer active:scale-[0.98] transition-all">
            <span class="material-symbols-outlined text-[18px]">notifications_active</span>
            Tampilkan Banner
          </button>
          <button class="action-btn-dismiss flex items-center justify-center gap-2 rounded-lg h-10 px-6 font-bold text-sm cursor-pointer active:scale-[0.98] transition-all">
            <span class="material-symbols-outlined text-[18px]">close</span>
            Hapus Banner Aktif
          </button>
        </div>
      </div>

    </div>

    <!-- ═══ COMMAND LOG ═══ -->
    <div class="log-card rounded-xl overflow-hidden">
      <div class="log-header px-6 py-4 flex items-center justify-between">
        <h3 class="font-bold flex items-center gap-2" style="color: var(--text-heading)">
          <span class="material-symbols-outlined text-accent text-[20px]">terminal</span>
          Command Log
        </h3>
        <button class="text-xs font-medium px-3 py-1 rounded-lg cursor-pointer transition-colors" style="color: var(--text-muted); background: var(--bg-input)">Clear Log</button>
      </div>
      <div class="px-6 py-4 space-y-2 max-h-[200px] overflow-y-auto font-mono text-xs">
        <div v-for="log in commandLog" :key="log.time" class="flex items-start gap-3 py-1">
          <span style="color: var(--text-muted)">{{ log.time }}</span>
          <span :class="log.type === 'success' ? 'text-green-400' : log.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'">{{ log.type === 'success' ? '✓' : log.type === 'warning' ? '⚠' : '→' }}</span>
          <span style="color: var(--text-body)">{{ log.message }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

const onlineCount = ref(8)
const offlineCount = ref(2)
const lastSync = ref('Just now')

const tvDevices = [
  { id: 1, name: 'TV Lobby Utama' }, { id: 2, name: 'TV Masjid Jami' },
  { id: 3, name: 'TV Aula Serbaguna' }, { id: 4, name: 'TV Kantor Pesantren' },
  { id: 5, name: 'TV Gedung A Lt.1' }, { id: 6, name: 'TV Gedung B Lt.2' },
  { id: 7, name: 'TV Perpustakaan' }, { id: 8, name: 'TV Asrama Putra' }
]

const contentList = [
  { id: 1, name: 'Info Terkini — Kunjungan Dubes Arab Saudi' },
  { id: 2, name: 'Agenda Harian — Jadwal Hari Ini' },
  { id: 3, name: 'Pengumuman — Libur Isra Mi\'raj' },
  { id: 4, name: 'Gallery — Dokumentasi Haul Akbar' },
  { id: 5, name: 'Video — Kajian Kitab Al-Hikam' }
]

const targetOptions = [
  { name: 'Semua TV', value: 'all' },
  { name: 'TV Lobby Utama', value: 'tv-1' }, { name: 'TV Masjid Jami', value: 'tv-2' },
  { name: 'TV Aula Serbaguna', value: 'tv-3' }, { name: 'TV Kantor Pesantren', value: 'tv-4' }
]

const bannerTypes = [
  { name: '🔴 Darurat', value: 'emergency' },
  { name: '🟡 Pengumuman', value: 'announcement' },
  { name: '🔵 Informasi', value: 'info' }
]

const selectedTV = ref(null)
const selectedContent = ref(null)
const broadcastContent = ref(null)
const reloadTarget = ref(null)
const homeTarget = ref(null)
const bannerTitle = ref('')
const bannerMessage = ref('')
const bannerType = ref(null)

const commandLog = [
  { time: '21:58:30', type: 'success', message: 'Push konten "Agenda Harian" ke TV Lobby Utama — berhasil' },
  { time: '21:55:12', type: 'info', message: 'Force Reload dikirim ke semua device (8 online)' },
  { time: '21:50:45', type: 'success', message: 'Broadcast "Info Terkini" ke 8 TV — berhasil' },
  { time: '21:45:00', type: 'warning', message: 'TV Asrama Putri — tidak merespon (timeout)' },
  { time: '21:30:22', type: 'success', message: 'Banner Global "Libur Isra Mi\'raj" ditampilkan di semua TV' },
  { time: '21:15:10', type: 'info', message: 'Force Home dikirim ke TV Masjid Jami' }
]
</script>

<style scoped>
.status-bar { background: var(--bg-card); border: 1px solid var(--border); }
.action-card { background: var(--bg-card); border: 1px solid var(--border); transition: border-color 0.3s, box-shadow 0.3s; }
.action-card:hover { border-color: rgba(251, 191, 36, 0.2); box-shadow: 0 0 20px rgba(251, 191, 36, 0.08); }
.info-box { background: var(--bg-input); border: 1px solid var(--border); }
.log-card { background: var(--bg-card); border: 1px solid var(--border); }
.log-header { border-bottom: 1px solid var(--border); }

.filter-input { background: var(--bg-input); border: 1px solid var(--border); color: var(--text-heading); }
.filter-input::placeholder { color: var(--text-muted); }
.filter-input:focus { border-color: var(--color-accent); box-shadow: 0 0 12px rgba(251, 191, 36, 0.3); }

.action-btn-primary { background: var(--color-accent); color: var(--text-btn); box-shadow: 0 0 15px rgba(251, 191, 36, 0.3); }
.action-btn-primary:hover { box-shadow: 0 0 25px rgba(251, 191, 36, 0.5); }

.action-btn-blue { background: #3b82f6; color: white; box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
.action-btn-blue:hover { box-shadow: 0 0 25px rgba(59, 130, 246, 0.5); }

.action-btn-green { background: #22c55e; color: white; box-shadow: 0 0 15px rgba(34, 197, 94, 0.3); }
.action-btn-green:hover { box-shadow: 0 0 25px rgba(34, 197, 94, 0.5); }

.action-btn-purple { background: #a855f7; color: white; box-shadow: 0 0 15px rgba(168, 85, 247, 0.3); }
.action-btn-purple:hover { box-shadow: 0 0 25px rgba(168, 85, 247, 0.5); }

.action-btn-red { background: #ef4444; color: white; box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }
.action-btn-red:hover { box-shadow: 0 0 25px rgba(239, 68, 68, 0.5); }

.action-btn-dismiss { background: var(--bg-input); color: var(--text-heading); border: 1px solid var(--border); }
.action-btn-dismiss:hover { border-color: #ef4444; color: #ef4444; }
</style>
