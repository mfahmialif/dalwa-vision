<template>
  <div class="flex flex-col gap-8">

    <!-- ═══ STAT CARDS ═══ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label"
           class="stat-card flex flex-col gap-3 rounded-xl p-6 backdrop-blur-md border border-accent/30 relative overflow-hidden group transition-all duration-500">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-xl group-hover:bg-accent/40 transition-all duration-700"></div>
        <div class="absolute -left-8 -bottom-8 w-20 h-20 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/20 transition-all duration-700 delay-100"></div>
        <div class="flex justify-between items-start z-10">
          <p class="text-accent font-medium tracking-wide">{{ stat.label }}</p>
          <span class="material-symbols-outlined text-accent text-[28px] drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">{{ stat.icon }}</span>
        </div>
        <div class="flex items-end gap-3 z-10 mt-1">
          <p class="text-3xl font-bold tracking-tight" style="color: var(--text-heading)">{{ stat.value }}</p>
          <span :class="[
            'flex items-center text-sm font-semibold mb-1',
            stat.trend > 0 ? 'text-green-500' : stat.trend === 0 ? 'text-slate-400' : 'text-red-500'
          ]">
            <span class="material-symbols-outlined text-[16px]">{{ stat.trend > 0 ? 'arrow_upward' : stat.trend === 0 ? 'horizontal_rule' : 'arrow_downward' }}</span>
            {{ Math.abs(stat.trend) }}%
          </span>
        </div>
      </div>
    </div>

    <!-- ═══ ACTIVITY TABLE + NETWORK STATUS ═══ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- Recent Activity -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold" style="color: var(--text-heading)">Aktivitas Terbaru</h3>
          <button class="text-sm font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer">
            Lihat Semua <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
        <div class="table-wrapper rounded-xl overflow-hidden shadow-lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="table-head">
                  <th class="px-6 py-4 text-sm font-semibold" style="color: var(--text-heading)">Waktu</th>
                  <th class="px-6 py-4 text-sm font-semibold" style="color: var(--text-heading)">User</th>
                  <th class="px-6 py-4 text-sm font-semibold" style="color: var(--text-heading)">Aktivitas</th>
                  <th class="px-6 py-4 text-sm font-semibold" style="color: var(--text-heading)">Status</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="(activity, i) in activities" :key="i"
                    class="table-row-hover">
                  <td class="px-6 py-4 text-sm whitespace-nowrap" style="color: var(--text-muted)">{{ activity.time }}</td>
                  <td class="px-6 py-4 text-sm font-medium" style="color: var(--text-body)">{{ activity.user }}</td>
                  <td class="px-6 py-4 text-sm" style="color: var(--text-body)">{{ activity.action }}</td>
                  <td class="px-6 py-4">
                    <span :class="statusBadge(activity.status)">
                      {{ activity.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Network Status -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold" style="color: var(--text-heading)">Status Jaringan</h3>
          <button class="p-1.5 rounded-lg transition-colors cursor-pointer" style="background: var(--bg-input); color: var(--text-muted)">
            <span class="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>
        </div>
        <div class="network-card rounded-xl p-5 flex flex-col gap-6 h-full min-h-[300px] shadow-lg">
          <!-- Uptime display -->
          <div class="uptime-display w-full h-40 rounded-lg flex items-center justify-center relative overflow-hidden">
            <span class="material-symbols-outlined text-[64px] uptime-globe absolute">public</span>
            <div class="absolute inset-0 uptime-gradient pointer-events-none"></div>
            <div class="z-10 text-center">
              <p class="text-3xl font-bold text-accent drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">{{ networkUptime }}%</p>
              <p class="text-xs font-medium uppercase tracking-wider mt-1" style="color: var(--text-muted)">Network Uptime</p>
            </div>
          </div>
          <!-- Online / Offline -->
          <div class="flex flex-col gap-4 flex-1">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
                <span class="text-sm font-medium" style="color: var(--text-body)">Online Devices</span>
              </div>
              <span class="text-sm font-bold" style="color: var(--text-heading)">{{ onlineDevices }}</span>
            </div>
            <div class="progress-track w-full h-2 rounded-full overflow-hidden">
              <div class="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                   :style="{ width: onlinePercent + '%' }"></div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                <span class="text-sm font-medium" style="color: var(--text-body)">Offline Devices</span>
              </div>
              <span class="text-sm font-bold" style="color: var(--text-heading)">{{ offlineDevices }}</span>
            </div>
            <div class="progress-track w-full h-2 rounded-full overflow-hidden">
              <div class="h-full bg-red-500 rounded-full"
                   :style="{ width: offlinePercent + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── Dashboard Stats ──
const stats = ref([
  { label: 'Total TVs', icon: 'tv', value: '150', trend: 5 },
  { label: 'Active TVs', icon: 'router', value: '142', trend: 2 },
  { label: 'Total Content', icon: 'library_books', value: '3,450', trend: 15 },
  { label: 'Users', icon: 'manage_accounts', value: '25', trend: 0 }
])

// ── Recent Activity ──
const activities = ref([
  { time: '10:00 AM', user: 'Admin 1', action: 'Updated Content A', status: 'Success' },
  { time: '09:45 AM', user: 'Admin 2', action: 'Added new TV', status: 'Pending' },
  { time: '09:30 AM', user: 'Admin 1', action: 'Deleted Agenda B', status: 'Success' },
  { time: '09:15 AM', user: 'Admin 3', action: 'Updated Gallery', status: 'Failed' }
])

function statusBadge(status) {
  const base = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold'
  if (status === 'Success') return `${base} bg-green-500/15 text-green-500 border border-green-500/30`
  if (status === 'Pending') return `${base} bg-accent/15 text-accent border border-accent/30`
  return `${base} bg-red-500/15 text-red-500 border border-red-500/30`
}

// ── Network Status ──
const networkUptime = ref(94.6)
const onlineDevices = ref(142)
const offlineDevices = ref(8)
const totalDevices = computed(() => onlineDevices.value + offlineDevices.value)
const onlinePercent = computed(() => Math.round((onlineDevices.value / totalDevices.value) * 100))
const offlinePercent = computed(() => Math.round((offlineDevices.value / totalDevices.value) * 100))
</script>
