import { ref } from "vue";
import { useSpeechRecognition } from "@vueuse/core";

export function useVoice() {
  const voiceDialog = ref(false);

  const {
    isListening,
    result: recognitionResult,
    start: startListening,
    stop: stopListening,
    isSupported: isSpeechSupported,
  } = useSpeechRecognition({
    lang: "pl-PL",
  });

  function openVoiceDialog() {
    voiceDialog.value = true;
    recognitionResult.value = "";
  }

  function closeVoiceDialog() {
    voiceDialog.value = false;
    stopListening();
    recognitionResult.value = "";
  }

  return {
    voiceDialog,
    isSpeechSupported,
    isListening,
    recognitionResult,
    startListening,
    stopListening,
    openVoiceDialog,
    closeVoiceDialog,
  };
}
