<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, watch } from "vue";
import type { Product } from "../types/product";

const modelValue = defineModel<boolean>({ required: true });

const props = defineProps<{
  product: Product | null;
  categories: Array<{ name: string; value: string; icon: string }>;
  units: Array<{ name: string; value: string }>;
}>();
const emit = defineEmits(["save", "cancel"]);

const localProduct = computed({
  get: () => props.product,
  set: (val) => emit("save", val),
});

const categoryDialog = ref(false);

function openCategoryDialog() {
  categoryDialog.value = true;
}
function selectCategory(catValue: string) {
  if (localProduct.value) {
    localProduct.value.category = catValue;
  }
  categoryDialog.value = false;
}

watch(modelValue, (val) => {
  if (val === false) close();
});

function close() {
  emit("cancel");
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="420">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold">
        <v-icon
          color="primary"
          icon="mdi-pencil"
          class="mr-2 opacity-70"
          size="small"
        ></v-icon>
        Edytuj produkt
      </v-card-title>
      <v-card-text>
        <v-form v-if="localProduct">
          <v-text-field
            v-model="localProduct.name"
            label="Nazwa produktu"
            prepend-inner-icon="mdi-tag"
            :rules="[(v) => !!v || 'Nazwa jest wymagana']"
          ></v-text-field>
          <div class="d-flex">
            <v-btn
              variant="tonal"
              color="error"
              @click="localProduct.stock = Math.max(0, localProduct.stock - 1)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field
              v-model.number="localProduct.stock"
              type="number"
              style="width: 60px"
              density="compact"
              class="mx-2 center-input"
              hide-details
              variant="solo-filled"
            ></v-text-field>
            <v-btn
              variant="tonal"
              color="success"
              @click="localProduct.stock++"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <v-select
            :items="props.units.map((u) => u.name)"
            v-model="localProduct.unit"
            class="mt-2"
            density="compact"
            hide-details
            label="Jednostka"
          ></v-select>
          <div class="d-flex flex-column mt-2 justify-start">
            <v-label>Kategoria</v-label>
            <v-btn
              variant="outlined"
              color="primary"
              class="mb-2 w-50"
              @click="openCategoryDialog"
            >
              <span style="font-size: 24px">
                {{
                  props.categories.find((c) => c.value == localProduct.category)
                    ?.icon
                }}
              </span>
              <span class="ml-2">
                {{
                  props.categories.find((c) => c.value == localProduct.category)
                    ?.name
                }}
              </span>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          color="primary"
          variant="tonal"
          @click="emit('save', localProduct)"
        >
          <v-icon left>mdi-check</v-icon>
          Zapisz zmiany
        </v-btn>
        <v-btn variant="tonal" @click="close">
          <v-icon left>mdi-close</v-icon>
          Anuluj
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- Dialog wyboru kategorii -->
    <v-dialog v-model="categoryDialog" max-width="360">
      <v-card>
        <v-card-title class="text-h6">Wybierz kategorię</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="cat in props.categories.filter((c) => c.value !== 'all')"
              :key="cat.value"
              cols="6"
              class="d-flex justify-center"
            >
              <v-btn
                :variant="
                  localProduct?.category === cat.value ? 'tonal' : 'outlined'
                "
                color="primary"
                class="mb-2"
                block
                @click="selectCategory(cat.value)"
              >
                <span style="font-size: 24px">{{ cat.icon }}</span>
                <span class="ml-2">{{ cat.name }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
