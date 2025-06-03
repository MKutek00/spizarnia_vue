import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import type { Recipe } from "../../types/recipe";
import { useMessagesStore } from "./MessageStore";
import { ref } from "vue";
import { useTranslate } from "../../composables/useTranslate";
import type { Product } from "../../types/product";

export const useRecipeStore = defineStore("Recipes", () => {
  const managerStore = useMessagesStore();
  const recipes = useLocalStorage<Recipe[]>("recipes", []);
  const recipeDialog = ref(false);
  const selectedProducts = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const fetchedRecipes = ref<Recipe[]>([]);

  const selectedRecipe = ref<any | null>(null);

  const translate = useTranslate();

  function openRecipeDialog() {
    selectedProducts.value = [];
    fetchedRecipes.value = [];
    error.value = null;
    recipeDialog.value = true;
  }

  function closeRecipeDialog() {
    recipeDialog.value = false;
    loading.value = false;
    fetchedRecipes.value = [];
    error.value = null;
    selectedProducts.value = [];
  }

  async function fetchRecipes(apiKey: string) {
    loading.value = true;
    error.value = null;
    fetchedRecipes.value = [];
    try {
      const selectedNames = selectedProducts.value.map((p) => p.name);
      const translatedProducts = await translate.translate(selectedNames);
      if (translate.translateError.value) {
        error.value = translate.translateError.value;
        return;
      }
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${translatedProducts.join(
          ","
        )}&apiKey=${apiKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Błąd pobierania przepisów");
      fetchedRecipes.value = await response.json();
    } catch (e: any) {
      error.value = e.message || "Nieznany błąd";
    } finally {
      loading.value = false;
    }
  }

  async function getRecipeDetails(apiKey: string): Promise<any> {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${selectedRecipe.value?.id}/information?apiKey=${apiKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Błąd pobierania przepisów");
      selectedRecipe.value = await response.json();
    } catch (e: any) {
      managerStore.addMessage(e.message || "Nieznany błąd", "NOK");
    }
  }

  function addRecipe(recipe: Recipe) {
    if (recipes.value.some((r) => r.id === recipe.id)) return;
    recipes.value.push({ ...recipe });
    managerStore.addMessage("Dodano przepis", "OK");
  }

  function removeRecipe(recipe: Recipe) {
    const index = recipes.value.findIndex((r) => r.id === recipe.id);
    if (index !== -1) {
      recipes.value.splice(index, 1);
    }
  }

  return {
    recipes,
    recipeDialog,
    selectedRecipe,
    selectedProducts,
    loading,
    error,
    fetchedRecipes,
    openRecipeDialog,
    closeRecipeDialog,
    fetchRecipes,
    addRecipe,
    removeRecipe,
    getRecipeDetails,
  };
});
