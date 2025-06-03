<script setup lang="ts">
import { ref } from "vue";
import { secret_key } from "../config";

const show = defineModel<boolean>({ required: true });

const props = defineProps<{
  details: any;
}>();

const emit = defineEmits<{
  (e: "get-details", apiKey: string): void;
}>();

const apiKey = ref(secret_key || "");
</script>
<template>
  <v-dialog v-model="show" max-width="500">
    <v-card>
      <v-card-title class="text-h6">
        <v-icon color="primary" class="mr-2">mdi-food</v-icon>
        Szczegoły Przepisu
      </v-card-title>
      <v-card-text class="pa-2">
        <input
          class="w-100 border border-sm mb-2"
          v-model="apiKey"
          placeholder="API key do spoonacular.com"
          @keyup.enter="emit('get-details', apiKey)"
        />
        <h3>{{ details.title }}</h3>
        <v-img height="150" :src="details.image" cover></v-img>
        <v-btn
          :href="details.sourceUrl"
          target="_blank"
          class="text-primary text-center mt-5"
          block
          variant="tonal"
        >
          Przejdź do przepisu
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="tonal" @click="show = false">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
