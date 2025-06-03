<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import type { Product } from "../types/product";
import type { Recipe } from "../types/recipe";
import { secret_key } from "../config";

const open = defineModel<boolean>("open", { required: true });
const selectedProducts = defineModel<Product[]>("selected-products", {
  required: true,
});
const props = defineProps<{
  allProducts: Product[];
  loading: boolean;
  recipes: Recipe[];
  error: string | null;
}>();

const emit = defineEmits<{
  (e: "fetchRecipes", apiKey: string): void;
  (e: "addRecipe", recipe: Recipe): void;
  (e: "close"): void;
}>();

function close() {
  emit("close");
}

const apiKey = ref(secret_key || "");
</script>

<template>
  <v-dialog v-model="open" max-width="600">
    <v-card>
      <v-card-title>Wybierz produkty</v-card-title>
      <v-card-text>
        <input
          class="w-100 border border-sm mb-2"
          v-model="apiKey"
          placeholder="API key do spoonacular.com"
        />
        <v-select
          v-model="selectedProducts"
          :items="props.allProducts"
          item-title="name"
          return-object
          multiple
          chips
          density="compact"
          item-value="id"
          :list-props="{
            density: 'compact',
            class: 'text-caption py-0',
          }"
          label="Produkty"
        />

        <v-btn
          :loading="props.loading"
          @click="emit('fetchRecipes', apiKey)"
          color="primary"
          class="mt-4"
          size="small"
          variant="tonal"
        >
          <v-icon left icon="mdi-silverware-spoon"></v-icon>
          Znajdź przepisy
        </v-btn>
        <v-alert v-if="props.error" type="error" class="mt-2">
          {{ props.error }}
        </v-alert>
        <div v-if="props.recipes.length" class="mt-4">
          <div
            v-for="recipe in props.recipes"
            :key="recipe.id"
            class="mb-2 text-center"
          >
            <strong>{{ recipe.title }}</strong>
            <v-img height="100" :src="recipe.image" cover></v-img>
            <v-btn
              color="primary"
              class="mt-1"
              variant="tonal"
              size="small"
              prepend-icon="mdi-hexagram"
              @click="emit('addRecipe', recipe)"
            >
              Zapisz
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
