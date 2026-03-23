import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import InfoTerkini from '../views/InfoTerkini.vue'
import AgendaHarian from '../views/AgendaHarian.vue'
import AgendaMingguan from '../views/AgendaMingguan.vue'

import AgendaBulanan from '../views/AgendaBulanan.vue'
import GalleryVideo from '../views/GalleryVideo.vue'
import Pengumuman from '../views/Pengumuman.vue'
import UrgentAnnouncement from '../views/UrgentAnnouncement.vue'
import ConnectToken from '../views/ConnectToken.vue'
import ConnectSuccess from '../views/ConnectSuccess.vue'
import ConnectFail from '../views/ConnectFail.vue'
import Login from '../views/Login.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
    meta: { title: 'Dalwa Vision — Smart TV Management System', requiresTv: true }
  },
  {
    path: '/info-terkini',
    name: 'InfoTerkini',
    component: InfoTerkini,
    meta: { title: 'Dalwa Vision — Info Terkini', requiresTv: true }
  },
  {
    path: '/agenda-harian',
    name: 'AgendaHarian',
    component: AgendaHarian,
    meta: { title: 'Dalwa Vision — Agenda Harian', requiresTv: true }
  },
  {
    path: '/agenda-mingguan',
    name: 'AgendaMingguan',
    component: AgendaMingguan,
    meta: { title: 'Dalwa Vision — Agenda Mingguan', requiresTv: true }
  },
  {
    path: '/agenda-bulanan',
    name: 'AgendaBulanan',
    component: AgendaBulanan,
    meta: { title: 'Dalwa Vision — Agenda Bulanan', requiresTv: true }
  },
  {
    path: '/gallery-video',
    name: 'GalleryVideo',
    component: GalleryVideo,
    meta: { title: 'Dalwa Vision — Gallery & Video', requiresTv: true }
  },
  {
    path: '/pengumuman',
    name: 'Pengumuman',
    component: Pengumuman,
    meta: { title: 'Dalwa Vision — Pengumuman', requiresTv: true }
  },
  {
    path: '/urgent',
    name: 'UrgentAnnouncement',
    component: UrgentAnnouncement,
    meta: { title: 'Dalwa Vision — Urgent Announcement', requiresTv: true }
  },
  {
    path: '/connect',
    name: 'ConnectToken',
    component: ConnectToken,
    meta: { title: 'Dalwa Vision — Hubungkan Perangkat' }
  },
  {
    path: '/connect/success',
    name: 'ConnectSuccess',
    component: ConnectSuccess,
    meta: { title: 'Dalwa Vision — Terhubung Berhasil' }
  },
  {
    path: '/connect/fail',
    name: 'ConnectFail',
    component: ConnectFail,
    meta: { title: 'Dalwa Vision — Koneksi Gagal' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Dalwa Vision — Login' }
  },

  // ═══ Admin Pages (wrapped in AdminLayout) ═══
  {
    path: '/administrator',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { title: 'Dalwa Vision — Admin Dashboard', pageTitle: 'Dashboard Overview', requiresAuth: true }
      },
      {
        path: 'manajemen-user',
        name: 'AdminManajemenUser',
        component: () => import('../views/AdminManajemenUser.vue'),
        meta: { title: 'Dalwa Vision — Manajemen User', pageTitle: 'Manajemen User', requiresAuth: true }
      },
      {
        path: 'manajemen-role',
        name: 'AdminManajemenRole',
        component: () => import('../views/AdminManajemenRole.vue'),
        meta: { title: 'Dalwa Vision — Manajemen Role', pageTitle: 'Manajemen Role', requiresAuth: true }
      },
      {
        path: 'manajemen-tv',
        name: 'AdminManajemenTV',
        component: () => import('../views/AdminManajemenTV.vue'),
        meta: { title: 'Dalwa Vision — Manajemen TV', pageTitle: 'Manajemen TV', requiresAuth: true }
      },
      {
        path: 'info-terkini',
        name: 'AdminInfoTerkini',
        component: () => import('../views/AdminInfoTerkini.vue'),
        meta: { title: 'Dalwa Vision — Info Terkini', pageTitle: 'Info Terkini', requiresAuth: true }
      },
      {
        path: 'agenda-harian',
        name: 'AdminAgendaHarian',
        component: () => import('../views/AdminAgendaHarian.vue'),
        meta: { title: 'Dalwa Vision — Agenda Harian', pageTitle: 'Agenda Harian', requiresAuth: true }
      },
      {
        path: 'agenda-harian/create',
        name: 'AdminAgendaHarianCreate',
        component: () => import('../views/AdminAgendaHarianForm.vue'),
        meta: { title: 'Dalwa Vision — Tambah Agenda', pageTitle: 'Tambah Agenda', requiresAuth: true }
      },
      {
        path: 'agenda-harian/:id/edit',
        name: 'AdminAgendaHarianEdit',
        component: () => import('../views/AdminAgendaHarianForm.vue'),
        meta: { title: 'Dalwa Vision — Edit Agenda', pageTitle: 'Edit Agenda', requiresAuth: true }
      },
      {
        path: 'agenda-mingguan',
        name: 'AdminAgendaMingguan',
        component: () => import('../views/AdminAgendaMingguan.vue'),
        meta: { title: 'Dalwa Vision — Agenda Mingguan', pageTitle: 'Agenda Mingguan', requiresAuth: true }
      },
      {
        path: 'agenda-mingguan/create',
        name: 'AdminAgendaMingguanCreate',
        component: () => import('../views/AdminAgendaMingguanForm.vue'),
        meta: { title: 'Dalwa Vision — Tambah Agenda Mingguan', pageTitle: 'Tambah Agenda Mingguan', requiresAuth: true }
      },
      {
        path: 'agenda-mingguan/:id/edit',
        name: 'AdminAgendaMingguanEdit',
        component: () => import('../views/AdminAgendaMingguanForm.vue'),
        meta: { title: 'Dalwa Vision — Edit Agenda Mingguan', pageTitle: 'Edit Agenda Mingguan', requiresAuth: true }
      },
      {
        path: 'agenda-bulanan',
        name: 'AdminAgendaBulanan',
        component: () => import('../views/AdminAgendaBulanan.vue'),
        meta: { title: 'Dalwa Vision — Agenda Bulanan', pageTitle: 'Agenda Bulanan', requiresAuth: true }
      },
      {
        path: 'agenda-bulanan/create',
        name: 'AdminAgendaBulananCreate',
        component: () => import('../views/AdminAgendaBulananForm.vue'),
        meta: { title: 'Dalwa Vision — Tambah Agenda Bulanan', pageTitle: 'Tambah Agenda Bulanan', requiresAuth: true }
      },
      {
        path: 'agenda-bulanan/:id/edit',
        name: 'AdminAgendaBulananEdit',
        component: () => import('../views/AdminAgendaBulananForm.vue'),
        meta: { title: 'Dalwa Vision — Edit Agenda Bulanan', pageTitle: 'Edit Agenda Bulanan', requiresAuth: true }
      },
      {
        path: 'gallery-video',
        name: 'AdminGalleryVideo',
        component: () => import('../views/AdminGalleryVideo.vue'),
        meta: { title: 'Dalwa Vision — Gallery & Video', pageTitle: 'Gallery & Video', requiresAuth: true }
      },
      {
        path: 'gallery-video/create',
        name: 'AdminGalleryVideoCreate',
        component: () => import('../views/AdminGalleryVideoForm.vue'),
        meta: { title: 'Dalwa Vision — Upload Media', pageTitle: 'Upload Media', requiresAuth: true }
      },
      {
        path: 'gallery-video/:id/edit',
        name: 'AdminGalleryVideoEdit',
        component: () => import('../views/AdminGalleryVideoForm.vue'),
        meta: { title: 'Dalwa Vision — Edit Media', pageTitle: 'Edit Media', requiresAuth: true }
      },
      {
        path: 'pengumuman',
        name: 'AdminPengumuman',
        component: () => import('../views/AdminPengumuman.vue'),
        meta: { title: 'Dalwa Vision — Pengumuman', pageTitle: 'Pengumuman', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: () => import('../views/AdminProfile.vue'),
        meta: { title: 'Dalwa Vision — Profile', pageTitle: 'Profile', requiresAuth: true }
      },
      {
        path: 'control-center',
        name: 'AdminControlCenter',
        component: () => import('../views/AdminControlCenter.vue'),
        meta: { title: 'Dalwa Vision — Control Center', pageTitle: 'Control Center', requiresAuth: true }
      },
      {
        path: 'pengaturan',
        name: 'AdminPengaturan',
        component: () => import('../views/AdminPengaturan.vue'),
        meta: { title: 'Dalwa Vision — Pengaturan', pageTitle: 'Pengaturan', requiresAuth: true }
      },
      {
        path: 'log-aktivitas',
        name: 'AdminLogAktivitas',
        component: () => import('../views/AdminLogAktivitas.vue'),
        meta: { title: 'Dalwa Vision — Log Aktivitas', pageTitle: 'Log Aktivitas', requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return savedPosition || { top: 0 }
  }
})

// ── Navigation guard ──
router.beforeEach((to) => {
  document.title = to.meta.title || 'Dalwa Vision'

  const isAuthenticated = !!localStorage.getItem('auth_token')

  // Redirect ke login jika route butuh auth tapi belum login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login' }
  }

  // Redirect ke /connect jika route butuh TV terhubung tapi belum ada token
  const isTvConnected = !!localStorage.getItem('tv_token')
  if (to.meta.requiresTv && !isTvConnected) {
    return { name: 'ConnectToken' }
  }

  // Redirect ke dashboard jika sudah login tapi akses halaman login
  if (to.name === 'Login' && isAuthenticated) {
    return { name: 'AdminDashboard' }
  }
})

export default router
