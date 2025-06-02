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
        <v-card @click="goTo('settings-categories')" class="cursor-pointer">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-shape-outline" size="32" color="deep-purple" class="mr-2"></v-icon>
            <span>Zarządzanie kategoriami</span>
          </v-card-title>
          <v-card-text> Dodawaj, edytuj i organizuj kategorie produktów w swojej spiżarni. </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card @click="goTo('settings-export')" class="cursor-pointer">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-database-export" size="32" color="teal" class="mr-2"></v-icon>
            <span>Eksport / import danych</span>
          </v-card-title>
          <v-card-text> Importuj lub eksportuj dane o swojej spiżarni. </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card @click="goTo('settings-about')" class="cursor-pointer">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-information-outline" size="32" color="indigo" class="mr-2"></v-icon>
            <span>O aplikacji</span>
          </v-card-title>
          <v-card-text> Informacje o aplikacji i pomoc. </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
