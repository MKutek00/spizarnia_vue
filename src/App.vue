<script setup lang="ts">
import { useTheme } from "vuetify";
import { useRouter } from "vue-router";
import { bus } from "./plugins/bus";
import { computed } from "vue";
import { useMessagesStore } from "./utils/store/MessageStore";

const messagesStore = useMessagesStore();

const theme = useTheme();
const router = useRouter();

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value === "light" ? "dark" : "light";
};

const bottomNavigation = [
  {
    name: "Przegląd",
    icon: "mdi-eye",
    action: () => {
      router.push({ name: "view-storage" });
    },
  },
  {
    name: "Dodaj produkt",
    icon: "mdi-plus",
    action: () => {
      router.push({ name: "view-storage" }).then(() => {
        bus.emit("open-add-dialog");
      });
    },
  },
  {
    name: "Głos",
    icon: "mdi-microphone",
    action: () => {
      router.push({ name: "view-storage" }).then(() => {
        bus.emit("open-voice-dialog");
      });
    },
  },
  {
    name: "Skaner",
    icon: "mdi-barcode-scan",
    action: () => {
      router.push({ name: "view-storage" }).then(() => {
        bus.emit("open-barcode-dialog");
      });
    },
  },
  {
    name: "Ustawienia",
    icon: "mdi-cog",
    action: () => {
      router.push({ name: "settings" });
    },
  },
];

const activeButton = computed(() => {
  const currentRoute = router.currentRoute.value.name;
  if (currentRoute === "view-storage") {
    return "Przegląd";
  } else if (currentRoute === "settings") {
    return "Ustawienia";
  }
  return "";
});
</script>

<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-icon icon="mdi-food" size="32" class="mx-2"></v-icon>
      </template>
      <v-toolbar-title>Spiżarnia</v-toolbar-title>
      <template v-slot:append>
        <v-btn icon @click="toggleTheme">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view />
      <v-snackbar-queue v-model="messagesStore.queue"></v-snackbar-queue>
    </v-main>
    <v-bottom-navigation grow height="64" class="pa-0">
      <v-btn
        v-for="bottom in bottomNavigation"
        :key="bottom.name"
        @click="bottom.action"
        :active="bottom.name == activeButton"
      >
        <v-icon>{{ bottom.icon }}</v-icon>
        {{ bottom.name }}
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
