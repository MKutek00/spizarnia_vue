<script setup lang="ts">
import { ref } from "vue";
import type { Ingredient, Recipe } from "../types/recipe";
import { useRecipeStore } from "../utils/store/RecipeStore";
import RecipeIngredientsDialog from "../components/RecipeIngredientsDialog.vue";
import { useProductsStore } from "../utils/store/ProductStore";
import RecipeDialog from "../components/RecipeDialog.vue";
import RecipeDetailsDialog from "../components/RecipeDetailsDialog.vue";

const recipeStore = useRecipeStore();
const productsStore = useProductsStore();

const displayIngredients = ref(false);
const displayRecipeDetails = ref(false);

const ingredients = ref<Ingredient[]>([]);

function openIngredientsDialog(recipe: Recipe) {
  ingredients.value = recipe.usedIngredients;
  displayIngredients.value = true;
}
function openRecipeDetailsDialog(recipe: Recipe) {
  recipeStore.selectedRecipe = recipe;
  displayRecipeDetails.value = true;
}
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-sheet elevation="5">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  class="opacity-70"
                  @click="recipeStore.openRecipeDialog"
                >
                  <v-icon icon="mdi-plus"></v-icon>
                  Znajdź przepisy
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-card
          v-for="recipe in recipeStore.recipes"
          :key="recipe.id"
          class="mb-2"
        >
          <v-img height="150" :src="recipe.image" cover></v-img>
          <v-card-item class="position-relative">
            <v-icon
              class="position-absolute"
              style="top: 10px; right: 5px; z-index: 2"
              color="red"
              @click="recipeStore.removeRecipe(recipe)"
              >mdi-minus-thick
            </v-icon>
            <v-card-title>{{ recipe.title }}</v-card-title>
          </v-card-item>
          <v-card-actions>
            <v-btn
              color="primary"
              class="border opacity-70"
              @click="openIngredientsDialog(recipe)"
            >
              <v-icon left class="mr-1">mdi-silverware-fork-knife</v-icon>
              Składniki
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="border opacity-70"
              @click="openRecipeDetailsDialog(recipe)"
            >
              <v-icon left class="mr-1">mdi-food-fork-drink</v-icon>
              Szczegóły
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <RecipeIngredientsDialog
      v-model="displayIngredients"
      :ingredients="ingredients"
    ></RecipeIngredientsDialog>
    <RecipeDetailsDialog
      v-model="displayRecipeDetails"
      :details="recipeStore.selectedRecipe"
      @get-details="recipeStore.getRecipeDetails"
    ></RecipeDetailsDialog>

    <RecipeDialog
      v-model:open="recipeStore.recipeDialog"
      v-model:selectedProducts="recipeStore.selectedProducts"
      :allProducts="productsStore.products"
      :loading="recipeStore.loading"
      :recipes="recipeStore.fetchedRecipes"
      :error="recipeStore.error"
      @fetchRecipes="recipeStore.fetchRecipes"
      @addRecipe="recipeStore.addRecipe"
      @close="recipeStore.closeRecipeDialog"
    />
  </v-container>
</template>
