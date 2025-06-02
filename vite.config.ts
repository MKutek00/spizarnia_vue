import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [vue(), Vuetify()],
});
