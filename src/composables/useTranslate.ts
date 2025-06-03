import { ref } from "vue";
import type { TranslateResponse } from "../types/language";

export function useTranslate() {
  const translateError = ref<string | null>(null);

  async function translate(names: string[]): Promise<string[]> {
    try {
      const url = `https://corsproxy.io/?url=${encodeURIComponent(
        "https://ftapi.pythonanywhere.com/translate?sl=pl&dl=en&text=" +
          names.join(",")
      )}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Błąd tłumaczenia nazw produktów");
      const data = (await response.json()) as TranslateResponse;
      return data["destination-text"].split(",");
    } catch (e: any) {
      translateError.value = e.message || "Błąd tłumaczenia";
      return names;
    }
  }

  return {
    translate,
    translateError,
  };
}
