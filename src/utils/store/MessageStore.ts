import { defineStore } from "pinia";
import { ref } from "vue";
import type { VSnackbar } from "vuetify/components";

export const useMessagesStore = defineStore("Messages", () => {
  const queue = ref<VSnackbar["$attrs"][]>([]);

  function addMessage(message: string, status: "OK" | "NOK" = "OK") {
    const snackbar: VSnackbar["$attrs"] = {
      color: status === "OK" ? "success" : "error",
      text: message,
    };
    queue.value.push(snackbar);
  }

  return { queue, addMessage };
});
