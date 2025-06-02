import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'view-storage',
    component: () => import('../views/Storage.vue'),
  },
  {
    path: '/ustawienia',
    name: 'settings',
    component: () => import('../views/Settings.vue'),
  },
  {
    path: '/ustawienia/kategorie',
    name: 'settings-categories',
    component: () => import('../views/SettingsCategories.vue'),
  },
  {
    path: '/ustawienia/import-eksport',
    name: 'settings-export',
    component: () => import('../views/SettingsImportExport.vue'),
  },
  {
    path: '/ustawienia/o-aplikacji',
    name: 'settings-about',
    component: () => import('../views/SettingsAbout.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
