<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";

const modelValue = defineModel<boolean>({ required: true });

const props = defineProps<{
  isBarcodeSupported: boolean;
  barcodeResult: string;
}>();
const emit = defineEmits(["close", "repeat"]);

watch(modelValue, (val) => {
  if (val === false) close();
});

function close() {
  emit("close");
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="400">
    <v-card>
      <v-card-title class="text-h6">
        <v-icon color="primary" icon="mdi-barcode-scan" class="mr-2"></v-icon>
        Skanuj kod kreskowy
      </v-card-title>
      <v-card-text>
        <v-alert
          v-if="!props.isBarcodeSupported"
          type="error"
          variant="tonal"
          density="compact"
        >
          Twoja przeglądarka nie obsługuje skanowania z kamery 😢
        </v-alert>
        <div v-else>
          <video
            v-show="!props.barcodeResult"
            id="barcodeVideo"
            style="width: 100%; border-radius: 8px"
            autoplay
            muted
            playsinline
          ></video>
          <div class="mt-2 text-center">
            <span
              v-if="props.barcodeResult"
              class="font-weight-bold text-success"
            >
              Kod: {{ props.barcodeResult }}
            </span>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn
          v-if="props.barcodeResult"
          color="teal"
          variant="tonal"
          @click="emit('repeat')"
        >
          Powtórz
        </v-btn>
        <v-spacer v-else />
        <v-btn color="primary" variant="tonal" @click="close"> Zamknij </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
