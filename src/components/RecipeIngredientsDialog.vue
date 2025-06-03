<script setup lang="ts">
import type { Ingredient } from "../types/recipe";

const show = defineModel<boolean>({ required: true });

const props = defineProps<{
  ingredients: Ingredient[];
}>();
</script>
<template>
  <v-dialog v-model="show" max-width="500">
    <v-card>
      <v-card-title class="text-h6">
        <v-icon color="primary" class="mr-2">mdi-food-apple</v-icon>
        Składniki
      </v-card-title>
      <v-card-text class="pa-2">
        <v-list density="compact">
          <v-list-item
            v-for="ing in props.ingredients"
            :key="ing.id"
            class="py-2"
            density="compact"
          >
            <template #prepend>
              <v-avatar size="28" color="green-lighten-4" :image="ing.image">
              </v-avatar>
            </template>
            <v-list-item-title class="font-weight-medium">
              {{ ing.name.charAt(0).toUpperCase() + ing.name.slice(1) }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Ilość: <span class="font-weight-bold">{{ ing.amount }}</span>
              <span class="ml-1">{{ ing.unit }}</span>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
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
