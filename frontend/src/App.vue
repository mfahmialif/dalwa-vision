<template>
  <router-view v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import api from './axios'

// ── TV Heartbeat: keep device status "online" ──
let heartbeatInterval = null

function startHeartbeat() {
  const token = localStorage.getItem('tv_token')
  if (!token) return

  // Send immediately on app load
  api.post('/tv/heartbeat', { token }).catch(() => {})

  // Then every 60 seconds
  heartbeatInterval = setInterval(() => {
    const t = localStorage.getItem('tv_token')
    if (t) {
      api.post('/tv/heartbeat', { token: t }).catch(() => {})
    } else {
      clearInterval(heartbeatInterval)
    }
  }, 60000)
}

onMounted(() => startHeartbeat())
onUnmounted(() => { if (heartbeatInterval) clearInterval(heartbeatInterval) })
</script>

<style>
#app {
  min-height: 100vh;
}

/* Page route transitions */
.page-enter-active {
  animation: pageIn 0.4s ease-out;
}
.page-leave-active {
  animation: pageOut 0.2s ease-in;
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: scale(1.02) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes pageOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.98) translateY(-8px);
  }
}
</style>
