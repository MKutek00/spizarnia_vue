<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";

const modelValue = defineModel<boolean>({ required: true });

const props = defineProps<{
  isSpeechSupported: boolean;
  isListening: boolean;
  recognitionResult: string;
}>();
const emit = defineEmits(["close", "start", "stop", "add"]);

watch(modelValue, (val) => {
  if (val === false) emit("close");
});
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="400">
    <v-card>
      <v-card-title class="text-h6">
        <v-icon color="primary" icon="mdi-microphone" class="mr-2"></v-icon>
        Dodawanie głosem
      </v-card-title>
      <v-card-text class="text-center py-2">
        <v-alert
          v-if="!props.isSpeechSupported"
          type="error"
          variant="tonal"
          density="compact"
        >
          Twoja przeglądarka nie obsługuje rozpoznawania mowy 😢
        </v-alert>
        <template v-else>
          <div>
            <span class="text-primary text-caption opacity-70">
              Nazwy produktów podawaj w liczbie pojedycznej...
            </span>
          </div>
          <v-btn
            icon
            :color="props.isListening ? 'red' : 'primary'"
            class="mx-auto"
            :class="{ 'blinking-mic': props.isListening }"
            @click="props.isListening ? emit('stop') : emit('start')"
            style="width: 64px; height: 64px"
          >
            <v-icon size="48">
              {{
                props.isListening ? "mdi-microphone" : "mdi-microphone-outline"
              }}
            </v-icon>
          </v-btn>
          <div class="mt-2" v-if="props.isListening">
            <span class="text-red font-weight-bold">Nasłuchiwanie...</span>
          </div>
        </template>
        <v-textarea
          class="mt-3"
          density="compact"
          :model-value="props.recognitionResult"
          label="Rozpoznany tekst"
          rows="2"
          readonly
          variant="outlined"
          hide-details
        ></v-textarea>
        <v-btn
          class="mt-2 mx-auto"
          color="primary"
          :variant="!props.recognitionResult ? 'outlined' : 'tonal'"
          :disabled="!props.recognitionResult"
          @click="emit('add')"
        >
          <v-icon left>mdi-check</v-icon>
          Dodaj produkt
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
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
