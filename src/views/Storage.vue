<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { bus } from "../plugins/bus";

import { categories, units, type Product } from "../types/product";
import { extractAndRemoveUnit } from "../utils/unitParser";
import { extractAndReoveNumber } from "../utils/numberParser";

import { useMessagesStore } from "../utils/store/MessageStore";
import { useProductsStore } from "../utils/store/ProductStore";

import { useBarcodeScanner } from "../composables/useBarcodeScanner";
import { useVoice } from "../composables/useVoice";

import BarcodeDialog from "../components/BarcodeDialog.vue";
import ProductDialog from "../components/ProductDialog.vue";
import VoiceDialog from "../components/VoiceDialog.vue";

const messagesStore = useMessagesStore();
const productsStore = useProductsStore();

const {
  barcodeDialog,
  barcodeResult,
  isBarcodeSupported,
  onBarcodeScanned,
  openBarcodeDialog,
  closeBarcodeDialog,
  startBarcodeScanner,
  stopBarcodeScanner,
} = useBarcodeScanner();

const {
  voiceDialog,
  isSpeechSupported,
  isListening,
  recognitionResult,
  startListening,
  stopListening,
  openVoiceDialog,
  closeVoiceDialog,
} = useVoice();

const editDialog = ref(false);
const editProduct = ref<Product | null>(null);

function openEditDialog(product: Product) {
  editProduct.value = { ...product };
  editDialog.value = true;
}

function saveEdit(product: Product) {
  productsStore.saveProduct(product);
  editDialog.value = false;
  editProduct.value = null;
}

function cancelEdit() {
  editDialog.value = false;
  editProduct.value = null;
}

function addNewProduct() {
  editProduct.value = productsStore.addNewProduct();
  editDialog.value = true;
}

function addProductFromVoice() {
  let text = recognitionResult.value.trim().toLowerCase();
  const { number: stock, text: textWithoutNumber } =
    extractAndReoveNumber(text);
  const { unit, text: finalText } = extractAndRemoveUnit(textWithoutNumber);

  const name =
    finalText.trim().charAt(0).toUpperCase() + finalText.trim().slice(1);
  if (!name || !name.trim()) {
    messagesStore.addMessage("Podaj nazwę produktu!", "NOK");
    return;
  }

  const newProduct: Product = {
    id: productsStore.generateId(),
    name,
    category: "fruits",
    unit: unit || "pcs",
    description: "",
    stock: stock || 1,
    added: new Date().toLocaleDateString(),
  };

  productsStore.saveProduct(newProduct);
  messagesStore.addMessage(`Dodano produkt: ${newProduct.name}`, "OK");
  voiceDialog.value = false;
  recognitionResult.value = "";
}

onBarcodeScanned.value = async function fetchBarcodeProduct() {
  let barcode = barcodeResult.value.trim();
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    if (!response.ok) throw new Error("Nie znaleziono produktu");
    const data = await response.json();
    if (data.status !== 1) throw new Error("Nie znaleziono produktu");

    const productData = data.product;
    const newProduct: Product = {
      id: productsStore.generateId(),
      name: productData.product_name || "Nieznany produkt",
      category: "all",
      unit: "pcs",
      description: productData.ingredients_text || "",
      stock: 1,
      added: new Date().toLocaleDateString(),
    };

    productsStore.saveProduct(newProduct);
    messagesStore.addMessage(`Dodano produkt: ${newProduct.name}`, "OK");

    barcodeDialog.value = false;
  } catch (error) {
    barcodeResult.value =
      (error as Error).message || "Błąd podczas pobierania danych";
    messagesStore.addMessage(barcodeResult.value, "NOK");
  }
};

onMounted(() => {
  bus.on("open-add-dialog", () => {
    addNewProduct();
  });
  bus.on("open-voice-dialog", () => {
    openVoiceDialog();
  });
  bus.on("open-barcode-dialog", () => {
    openBarcodeDialog();
  });
});
onBeforeUnmount(() => {
  stopBarcodeScanner();
});
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-sheet elevation="5">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  density="compact"
                  prepend-inner-icon="mdi-magnify"
                  placeholder="Szukaj"
                ></v-text-field>
                <v-btn-toggle v-model="productsStore.filterCategory" mandatory>
                  <v-btn
                    v-for="category in categories"
                    :key="category.value"
                    :value="category.value"
                  >
                    <span style="font-size: 24px">{{ category.icon }}</span>
                  </v-btn>
                </v-btn-toggle>
                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  class="mt-4 opacity-70"
                  @click="addNewProduct"
                >
                  <v-icon icon="mdi-plus"></v-icon>
                  Dodaj produkt
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        v-for="product in productsStore.filteredProducts"
        :key="product.id"
      >
        <v-card class="mb-4">
          <v-card-title>
            <v-row align="center" no-gutters>
              <v-col cols="auto">
                <v-avatar size="48">
                  <span style="font-size: 32px">
                    {{
                      categories.find((c) => c.value == product.category)?.icon
                    }}
                  </span>
                </v-avatar>
              </v-col>
              <v-col>
                <div>
                  <span class="text-h6">{{ product.name }}</span>
                  <div class="text-caption grey--text">
                    {{
                      categories.find((c) => c.value == product.category)
                        ?.name || "Inne"
                    }}
                  </div>
                </div>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  icon
                  size="small"
                  variant="plain"
                  @click="openEditDialog(product)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  icon
                  size="small"
                  variant="plain"
                  @click="productsStore.removeProduct(product)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <div class="mb-2">{{ product.description }}</div>
            <div class="d-flex align-center mb-2">
              <span class="text-h5 font-weight-bold" style="color: #3f51b5">
                {{ product.stock }} szt
              </span>
              <v-btn
                class="ml-2"
                color="error"
                variant="tonal"
                size="small"
                @click="productsStore.changeStock(product, -1)"
              >
                <v-icon>mdi-minus-thick</v-icon>
              </v-btn>
              <v-btn
                class="ml-1"
                color="success"
                variant="tonal"
                size="small"
                @click="productsStore.changeStock(product, 1)"
              >
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
            </div>
            <div class="text-caption grey--text">
              Dodano: {{ product.added }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <ProductDialog
      v-model="editDialog"
      :product="editProduct"
      :categories="categories"
      :units="units"
      @save="saveEdit"
      @cancel="cancelEdit"
    />

    <VoiceDialog
      v-model="voiceDialog"
      :isSpeechSupported="isSpeechSupported"
      :isListening="isListening"
      :recognitionResult="recognitionResult"
      @start="startListening"
      @stop="stopListening"
      @add="addProductFromVoice"
      @close="closeVoiceDialog"
    />

    <BarcodeDialog
      v-model="barcodeDialog"
      :isBarcodeSupported="isBarcodeSupported"
      :barcodeResult="barcodeResult"
      @close="closeBarcodeDialog"
      @repeat="startBarcodeScanner"
    />
  </v-container>
</template>

<style scoped>
.center-input .v-input input {
  text-align: center;
}
.blinking-mic {
  position: relative;
  z-index: 1;
}
.blinking-mic::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 64px;
  height: 64px;
  background: rgba(255, 82, 82, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1);
  z-index: -1;
  animation: mic-wave 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  pointer-events: none;
}
@keyframes mic-wave {
  0% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1);
  }
  70% {
    opacity: 0.2;
    transform: translate(-50%, -50%) scale(2.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2.7);
  }
}
</style>
