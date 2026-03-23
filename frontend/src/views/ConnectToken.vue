<template>
  <div class="relative w-screen h-screen overflow-hidden font-display text-slate-100 bg-[#0A1128]">
    <!-- ═══════ PATTERN BACKGROUND ═══════ -->
    <div class="absolute inset-0 z-0 opacity-40 pointer-events-none" :style="{ backgroundImage: patternBg, backgroundSize: '80px 140px' }"></div>

    <!-- ═══════ MAIN LAYOUT ═══════ -->
    <main class="relative z-10 flex flex-col h-full w-full max-w-[1920px] mx-auto p-6 gap-2">
      <!-- Header -->
      <header class="flex items-center justify-center py-2 shrink-0">
        <div class="flex items-center gap-4 text-accent">
          <div class="size-10 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
            <span class="material-symbols-outlined text-3xl">token</span>
          </div>
          <h1 class="text-white text-2xl lg:text-3xl font-bold tracking-tight uppercase">Dalwa Vision</h1>
        </div>
      </header>

      <!-- Content -->
      <div class="flex flex-1 items-start justify-center h-full">
        <section class="flex flex-col flex-1 max-w-2xl h-full justify-center items-center gap-6">
          <!-- Token Label -->
          <div class="flex flex-col items-center gap-4">
            <h2 class="text-white/80 text-lg uppercase tracking-widest font-medium">Masukkan Token Perangkat</h2>

            <!-- Token Input Boxes -->
            <div class="flex gap-3 lg:gap-4">
              <div v-for="(digit, i) in tokenDigits" :key="i" class="relative group">
                <div :class="[
                  'w-16 h-20 lg:w-20 lg:h-24 bg-[#13224A] border-2 text-center text-4xl lg:text-5xl font-bold rounded-xl flex items-center justify-center text-white transition-all duration-300',
                  digit !== ''
                    ? 'border-accent shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : i === currentIndex
                      ? 'border-accent/60'
                      : 'border-white/20'
                ]">
                  {{ digit || '' }}
                </div>
                <!-- Active cursor pulse -->
                <div v-if="i === currentIndex && digit === ''"
                     class="absolute inset-0 border-2 border-accent animate-pulse rounded-xl opacity-50"></div>
              </div>
            </div>
          </div>

          <!-- Numpad -->
          <div class="bg-[#13224A]/50 backdrop-blur-sm p-5 rounded-2xl border border-white/10 flex flex-col gap-3 shadow-2xl w-full max-w-sm">
            <div class="grid grid-cols-3 gap-3">
              <button v-for="n in [1,2,3,4,5,6,7,8,9]" :key="n"
                      @click="pressKey(n)"
                      class="key-btn h-14 rounded-xl bg-[#13224A] border border-white/10 text-2xl font-medium text-white transition-all duration-200 hover:bg-white/5 cursor-pointer active:scale-95">
                {{ n }}
              </button>
              <button @click="pressKey(0)"
                      class="key-btn col-span-2 h-14 rounded-xl bg-[#13224A] border border-white/10 text-2xl font-medium text-white transition-all duration-200 hover:bg-white/5 cursor-pointer active:scale-95">
                0
              </button>
              <button @click="backspace"
                      class="key-btn h-14 rounded-xl bg-[#13224A] border border-white/10 text-white transition-all duration-200 hover:bg-white/5 flex items-center justify-center cursor-pointer active:scale-95">
                <span class="material-symbols-outlined text-2xl">backspace</span>
              </button>
            </div>
          </div>

          <!-- Connect Button -->
          <div class="flex justify-center w-full max-w-sm">
            <button @click="connectDevice"
                    :disabled="!isTokenComplete"
                    :class="[
                      'key-btn w-full font-bold text-lg uppercase tracking-wide py-4 px-12 rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95',
                      isTokenComplete
                        ? 'bg-accent text-[#0A1128] shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:brightness-110'
                        : 'bg-accent/30 text-[#0A1128]/50 cursor-not-allowed'
                    ]">
              <span>Hubungkan</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <!-- Error message -->
          <Transition name="fade">
            <p v-if="errorMsg" class="text-red-400 text-sm font-medium flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">error</span>
              {{ errorMsg }}
            </p>
          </Transition>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../axios'

const router = useRouter()

// ── Token State ──
const tokenDigits = ref(['', '', '', '', '', ''])
const errorMsg = ref('')
const connecting = ref(false)

const currentIndex = computed(() => {
  const idx = tokenDigits.value.findIndex(d => d === '')
  return idx === -1 ? 5 : idx
})

const isTokenComplete = computed(() => tokenDigits.value.every(d => d !== ''))

function pressKey(num) {
  errorMsg.value = ''
  const idx = tokenDigits.value.findIndex(d => d === '')
  if (idx !== -1) {
    tokenDigits.value[idx] = String(num)
  }
}

function backspace() {
  errorMsg.value = ''
  for (let i = tokenDigits.value.length - 1; i >= 0; i--) {
    if (tokenDigits.value[i] !== '') {
      tokenDigits.value[i] = ''
      break
    }
  }
}

async function connectDevice() {
  if (!isTokenComplete.value || connecting.value) return
  connecting.value = true
  errorMsg.value = ''
  const token = tokenDigits.value.join('')

  try {
    const { data } = await api.post('/tv/connect', { token })
    // Store device info for ConnectSuccess page
    localStorage.setItem('tv_device', JSON.stringify(data.device))
    localStorage.setItem('tv_token', token)
    router.push({ name: 'ConnectSuccess' })
  } catch (e) {
    if (e.response?.status === 404) {
      errorMsg.value = 'Token tidak ditemukan. Pastikan token benar.'
    } else {
      errorMsg.value = 'Gagal terhubung ke server. Periksa koneksi jaringan.'
    }
    // Reset digits on failure
    tokenDigits.value = ['', '', '', '', '', '']
  } finally {
    connecting.value = false
  }
}

// ── Pattern ──
const patternBg = `
  linear-gradient(30deg, #13224A 12%, transparent 12.5%, transparent 87%, #13224A 87.5%, #13224A),
  linear-gradient(150deg, #13224A 12%, transparent 12.5%, transparent 87%, #13224A 87.5%, #13224A),
  linear-gradient(30deg, #13224A 12%, transparent 12.5%, transparent 87%, #13224A 87.5%, #13224A),
  linear-gradient(150deg, #13224A 12%, transparent 12.5%, transparent 87%, #13224A 87.5%, #13224A),
  linear-gradient(60deg, #0D1736 25%, transparent 25.5%, transparent 75%, #0D1736 75%, #0D1736),
  linear-gradient(60deg, #0D1736 25%, transparent 25.5%, transparent 75%, #0D1736 75%, #0D1736)`
</script>

<style scoped>
.key-btn:hover, .key-btn:focus {
  transform: scale(1.03);
  border-color: var(--color-accent);
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
  z-index: 10;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
