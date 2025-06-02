<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goTo(path: string) {
  router.push({ name: path });
}
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-btn @click="goTo('settings')" color="primary" variant="text" class="mb-2 pl-0">
          <v-icon icon="mdi-chevron-left" size="32"></v-icon>
          <span class="text-decoration-underline">Ustawienia</span>
        </v-btn>
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-shape-outline" size="32" color="deep-purple" class="mr-2"></v-icon>
            <span>Zarządzanie kategoriami</span>
          </v-card-title>
          <v-card-subtitle> Twoje inteligente zarządzanie spiżarnią </v-card-subtitle>
          <v-card-text>
            <p>Wersja aplikacji 1.0.0</p>
            <p>Autor: Mateusz Kutek</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
