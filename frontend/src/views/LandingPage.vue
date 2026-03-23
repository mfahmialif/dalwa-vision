<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <!-- ═══════ BACKGROUND LAYERS ═══════ -->
    <div class="fixed inset-0 z-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e3a8a]"></div>
    <div class="fixed inset-0 z-0 opacity-15 mix-blend-overlay"
         :style="{ backgroundImage: patternBg }"></div>
    <div class="fixed inset-0 z-0 opacity-30 bg-cover bg-center mix-blend-overlay blur-sm"
         style="background-image: url('/img/hero-bg.jpg')"></div>
    <div class="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_60%)] pointer-events-none"></div>

    <!-- ═══════ MAIN CONTENT ═══════ -->
    <div class="relative z-10 flex flex-col h-screen p-4 lg:p-6">

      <!-- ═══════ HEADER ═══════ -->
      <header class="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
        <div class="flex items-center gap-4">
          <div class="glass-panel flex items-center justify-center size-14 rounded-xl border border-accent/30 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <span class="material-symbols-outlined text-3xl text-accent">mosque</span>
          </div>
          <div>
            <h1 class="text-3xl font-serif font-bold tracking-tight text-white drop-shadow-lg">Dalwa Vision</h1>
            <div class="flex items-center gap-2">
              <span class="h-px w-6 bg-accent/60"></span>
              <p class="text-accent/90 text-xs font-medium tracking-[0.2em] uppercase">TV Interaktif Pesantren</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="self-end">
            <div class="flex items-center gap-3 text-sm font-light text-slate-200 glass-panel px-4 py-1.5 rounded-full border border-white/10">
              <span class="font-medium">{{ currentDate }}</span>
              <span class="w-1.5 h-1.5 bg-accent rounded-full"></span>
              <span class="text-accent-light font-serif italic">{{ hijriDate }}</span>
            </div>
          </div>
          <div class="text-5xl font-serif font-bold text-white tracking-tight leading-none text-glow">
            {{ hours }}<span class="animate-pulse text-accent">:</span>{{ minutes }}
          </div>
        </div>
      </header>

      <!-- ═══════ MAIN GRID ═══════ -->
      <main class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 portrait:lg:grid-cols-2 gap-5 lg:gap-6 pb-14 overflow-y-auto">

        <!-- CARD 1: Berita Utama -->
        <div class="group relative overflow-hidden rounded-2xl glass-panel glass-panel-hover transition-all duration-500 cursor-pointer"
             @click="navigateTo('berita')">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/40 to-transparent z-10"></div>
          <div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
               style="background-image: url('/img/hero-bg.jpg')"></div>
          <div class="relative z-20 h-full flex flex-col justify-end p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="bg-accent text-[#0f172a] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-accent/20">Berita Utama</span>
              <span class="text-white/80 text-xs flex items-center gap-1 bg-[#0f172a]/50 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                <span class="material-symbols-outlined text-[14px]">schedule</span> 2 Jam lalu
              </span>
            </div>
            <h2 class="text-2xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-accent-light transition-colors drop-shadow-md">Kunjungan Syekh dari Yaman Membawa Berkah</h2>
            <p class="text-slate-300 line-clamp-2 text-base font-light leading-relaxed">Ribuan santri menyambut kedatangan ulama besar dengan penuh antusiasme di aula utama...</p>
          </div>
          <div class="absolute top-4 right-4 z-20 bg-[#0f172a]/60 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full border border-white/10 group-hover:bg-accent group-hover:text-[#0f172a] transition-all duration-300 group-hover:scale-110">
            <span class="material-symbols-outlined text-xl">newspaper</span>
          </div>
        </div>

        <!-- CARD 2: Agenda Harian -->
        <div class="group relative rounded-2xl glass-panel glass-panel-hover p-6 flex flex-col transition-all duration-500 cursor-pointer"
             @click="navigateTo('agenda-harian')">
          <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span class="material-symbols-outlined !text-8xl text-accent">calendar_today</span>
          </div>
          <div class="flex justify-between items-center mb-6 relative z-10">
            <div class="flex items-center gap-3">
              <div class="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-2.5 rounded-xl text-blue-400 border border-blue-500/20 group-hover:border-accent/50 group-hover:text-accent transition-colors shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <span class="material-symbols-outlined text-3xl">calendar_today</span>
              </div>
              <h3 class="text-xl font-bold text-white tracking-wide">Agenda Harian</h3>
            </div>
            <span class="material-symbols-outlined text-slate-500 group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300">arrow_forward_ios</span>
          </div>
          <div class="flex-1 flex flex-col justify-end relative z-10">
            <ul class="space-y-3">
              <li v-for="item in agendaHarian" :key="item.time"
                  class="flex gap-4 items-center hover:bg-white/5 p-2 rounded-lg transition-colors border border-transparent hover:border-white/5">
                <span class="text-accent font-bold font-mono text-lg min-w-[55px]">{{ item.time }}</span>
                <div class="h-8 w-px bg-white/10"></div>
                <span class="text-slate-100 font-medium">{{ item.label }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- CARD 3: Agenda Mingguan -->
        <div class="group relative rounded-2xl glass-panel glass-panel-hover p-6 flex flex-col transition-all duration-500 cursor-pointer"
             @click="navigateTo('agenda-mingguan')">
          <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span class="material-symbols-outlined !text-8xl text-accent">calendar_view_week</span>
          </div>
          <div class="flex justify-between items-center mb-6 relative z-10">
            <div class="flex items-center gap-3">
              <div class="bg-gradient-to-br from-accent/20 to-yellow-600/10 p-2.5 rounded-xl text-accent border border-accent/20 group-hover:border-accent/50 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                <span class="material-symbols-outlined text-3xl">calendar_view_week</span>
              </div>
              <h3 class="text-xl font-bold text-white tracking-wide">Agenda Mingguan</h3>
            </div>
            <span class="material-symbols-outlined text-slate-500 group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300">arrow_forward_ios</span>
          </div>
          <div class="flex-1 flex flex-col justify-end relative z-10">
            <div class="bg-gradient-to-r from-white/5 to-transparent rounded-xl p-5 border-l-4 border-accent backdrop-blur-sm">
              <p class="text-accent text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span> Sedang Berlangsung
              </p>
              <p class="text-white text-xl font-serif font-medium mb-1">Ujian Semester Ganjil</p>
              <div class="flex items-center gap-2 text-slate-400 text-sm mt-2">
                <span class="material-symbols-outlined text-base">date_range</span>
                18 Nov - 24 Nov
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 4: Agenda Bulanan -->
        <div class="group relative rounded-2xl glass-panel glass-panel-hover p-6 flex flex-col transition-all duration-500 cursor-pointer"
             @click="navigateTo('agenda-bulanan')">
          <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span class="material-symbols-outlined !text-8xl text-blue-400">calendar_month</span>
          </div>
          <div class="flex justify-between items-center mb-6 relative z-10">
            <div class="flex items-center gap-3">
              <div class="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-2.5 rounded-xl text-blue-400 border border-blue-500/20 group-hover:border-blue-400/50 transition-colors shadow-[0_0_15px_rgba(96,165,250,0.1)]">
                <span class="material-symbols-outlined text-3xl">calendar_month</span>
              </div>
              <h3 class="text-xl font-bold text-white tracking-wide">Agenda Bulanan</h3>
            </div>
            <span class="material-symbols-outlined text-slate-500 group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300">arrow_forward_ios</span>
          </div>
          <div class="flex-1 flex flex-col justify-end relative z-10 space-y-4">
            <div class="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/5">
              <div class="flex flex-col items-center justify-center bg-blue-500/10 rounded-lg w-14 h-14 border border-blue-500/20">
                <span class="text-[10px] font-bold text-blue-300 uppercase tracking-widest">DES</span>
                <span class="text-2xl font-serif font-bold text-white leading-none">12</span>
              </div>
              <div>
                <span class="block text-slate-200 text-lg font-medium">Maulid Akbar</span>
                <span class="text-slate-500 text-xs">Aula Utama</span>
              </div>
            </div>
            <div class="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/5">
              <div class="flex flex-col items-center justify-center bg-white/5 rounded-lg w-14 h-14 border border-white/10">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JAN</span>
                <span class="text-2xl font-serif font-bold text-slate-300 leading-none">05</span>
              </div>
              <div>
                <span class="block text-slate-400 text-lg font-medium">Wisuda Tahfidz</span>
                <span class="text-slate-600 text-xs">Lapangan Hijau</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 5: Galeri & Video -->
        <div class="group relative overflow-hidden rounded-2xl glass-panel glass-panel-hover transition-all duration-500 cursor-pointer"
             @click="navigateTo('gallery-video')">
          <div class="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-700 transform group-hover:scale-105"
               style="background-image: url('/img/galeri-bg.jpg')"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent"></div>
          <div class="relative z-10 h-full p-6 flex flex-col">
            <div class="flex justify-between items-start mb-4">
              <div class="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 backdrop-blur-md p-2.5 rounded-xl text-indigo-400 border border-indigo-500/20 group-hover:border-indigo-400/50 transition-colors shadow-[0_0_15px_rgba(129,140,248,0.15)]">
                <span class="material-symbols-outlined text-3xl">play_circle</span>
              </div>
              <span class="material-symbols-outlined text-slate-500 group-hover:text-indigo-400 transition-colors">arrow_forward_ios</span>
            </div>
            <div class="mt-auto">
              <h3 class="text-xl font-bold text-white mb-1">Galeri &amp; Video</h3>
              <p class="text-slate-400 text-sm mb-4">Dokumentasi Kegiatan Santri</p>
              <div class="flex items-center gap-3">
                <div class="h-12 w-20 rounded-lg overflow-hidden border border-white/10 relative">
                  <div class="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors"></div>
                  <img alt="Thumbnail" class="w-full h-full object-cover" src="/img/thumb1.jpg" />
                </div>
                <div class="h-12 w-20 rounded-lg overflow-hidden border border-white/10 relative">
                  <div class="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors"></div>
                  <img alt="Thumbnail" class="w-full h-full object-cover" src="/img/thumb2.jpg" />
                </div>
                <div class="h-12 w-12 rounded-lg border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm text-xs font-bold text-white hover:bg-white/10 transition-colors">
                  +12
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 6: Pengumuman -->
        <div class="group relative rounded-2xl bg-gradient-to-br from-yellow-900/40 to-yellow-950/40 backdrop-blur-xl border border-yellow-500/30 hover:border-yellow-500/60 p-6 flex flex-col transition-all duration-500 cursor-pointer shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:shadow-[0_0_40px_rgba(234,179,8,0.2)]"
             @click="navigateTo('pengumuman')">
          <div class="absolute -right-2 -top-2 z-20">
            <span class="relative flex h-5 w-5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-5 w-5 bg-yellow-500 border-2 border-[#020617]"></span>
            </span>
          </div>
          <div class="flex justify-between items-center mb-6 relative z-10">
            <div class="flex items-center gap-3">
              <div class="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 p-2.5 rounded-xl text-yellow-500 border border-yellow-500/20 group-hover:border-yellow-400/50 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <span class="material-symbols-outlined text-3xl animate-pulse-slow">campaign</span>
              </div>
              <h3 class="text-xl font-bold text-white tracking-wide">Pengumuman</h3>
            </div>
            <span class="material-symbols-outlined text-slate-500 group-hover:text-yellow-400 transition-colors group-hover:translate-x-1 duration-300">arrow_forward_ios</span>
          </div>
          <div class="flex-1 flex flex-col justify-end relative z-10">
            <p class="text-yellow-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-base">warning</span> Penting &amp; Segera
            </p>
            <div class="bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/20">
              <div class="flex items-start gap-3">
                <span class="bg-yellow-500 text-[#0f172a] text-[10px] font-bold px-2 py-0.5 rounded shadow-lg shadow-yellow-500/30 mt-0.5">BARU</span>
                <p class="text-slate-200 text-sm font-medium leading-relaxed">Seluruh santri kelas 12 harap berkumpul di aula.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- ═══════ TICKER BAR ═══════ -->
    <div class="fixed bottom-0 left-0 w-full z-50 h-12 flex items-center">
      <div class="absolute inset-0 bg-[#020617]/90 backdrop-blur-md border-t border-accent/20"></div>
      <div class="relative bg-accent h-full px-8 flex items-center justify-center shrink-0 z-20 shadow-[5px_0_20px_rgba(0,0,0,0.5)]">
        <span class="text-[#0f172a] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <span class="material-symbols-outlined animate-pulse">info</span>
          Info Terkini
        </span>
        <div class="absolute right-[-10px] top-0 bottom-0 w-0 h-0 border-t-[56px] border-t-accent border-r-[20px] border-r-transparent"></div>
      </div>
      <div class="relative flex overflow-x-hidden flex-1 h-full items-center pl-8">
        <div class="animate-marquee whitespace-nowrap flex items-center gap-24">
          <span v-for="(item, i) in tickerItems" :key="i"
                class="text-slate-200 text-lg font-light tracking-wide flex items-center gap-3">
            <span class="material-symbols-outlined text-accent text-sm">diamond</span>
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const patternBg = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

const hours = ref('00')
const minutes = ref('00')
const currentDate = ref('')
const hijriDate = ref('')

function updateTime() {
  const now = new Date()
  hours.value = String(now.getHours()).padStart(2, '0')
  minutes.value = String(now.getMinutes()).padStart(2, '0')

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  currentDate.value = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`

  try {
    const hijri = new Intl.DateTimeFormat('id-u-ca-islamic', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(now)
    hijriDate.value = hijri
  } catch {
    hijriDate.value = '6 Jumadil Awal 1445H'
  }
}

const agendaHarian = ref([
  { time: '04:00', label: 'Qiyamul Lail & Subuh' },
  { time: '07:00', label: 'KBM Madrasah' },
  { time: '16:00', label: 'Kajian Kitab Kuning' }
])

const tickerItems = ref([
  'Selamat Datang di Dalwa Vision Interactive Dashboard...',
  "Jangan lupa sholat berjamaah tepat waktu di Masjid Jami'...",
  'Pendaftaran santri baru gelombang pertama resmi dibuka mulai 1 Desember...',
  'Kajian Kitab Kuning akan dilaksanakan ba\'da Maghrib...'
])

const routeMap = {
  berita: 'InfoTerkini',
  'agenda-harian': 'AgendaHarian',
  'agenda-mingguan': 'AgendaMingguan',
  'agenda-bulanan': 'AgendaBulanan',
  'gallery-video': 'GalleryVideo',
  pengumuman: 'Pengumuman',
}

function navigateTo(section) {
  const routeName = routeMap[section]
  if (routeName) {
    router.push({ name: routeName })
  } else {
    console.log('Navigate to:', section)
  }
}

let timeInterval
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})
</script>
