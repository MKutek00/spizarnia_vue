<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function goTo(path: string) {
  router.push({ name: path });
}

function exportData() {
  const data = localStorage.getItem("products");
  if (!data) return;
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "spizarnia-products.json";
  a.click();

  URL.revokeObjectURL(url);
}
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-btn
          @click="goTo('settings')"
          color="primary"
          variant="text"
          class="mb-2 pl-0"
        >
          <v-icon icon="mdi-chevron-left" size="32"></v-icon>
          <span class="text-decoration-underline">Ustawienia</span>
        </v-btn>
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon
              icon="mdi-database-export"
              size="32"
              color="teal"
              class="mr-2"
            ></v-icon>
            <span>Eksport / import danych</span>
          </v-card-title>
          <v-card-subtitle>
            Importuj lub eksportuj dane z swojej spiżarni
          </v-card-subtitle>
          <v-card-text>
            <v-btn color="teal" @click="exportData" variant="tonal">
              <v-icon left>mdi-download</v-icon>
              Eksportuj dane z spiżarni
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
