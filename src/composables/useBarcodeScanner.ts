import { ref, nextTick } from "vue";
import { BrowserMultiFormatReader } from "@zxing/browser";

export function useBarcodeScanner() {
  const barcodeDialog = ref(false);
  const barcodeResult = ref("");
  const isBarcodeSupported = !!(navigator.mediaDevices && window.Worker);

  let barcodeStream: MediaStream | null = null;
  let codeReader: BrowserMultiFormatReader | null = null;

  let onBarcodeScanned = ref<((result: string) => void) | null>(null);

  async function startBarcodeScanner() {
    const barcodeVideo = document.querySelector(
      "#barcodeVideo"
    ) as HTMLVideoElement;

    if (!isBarcodeSupported) return;
    if (!barcodeVideo) return;

    barcodeResult.value = "";
    if (!codeReader) {
      codeReader = new BrowserMultiFormatReader();
    }

    try {
      barcodeStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      barcodeVideo.srcObject = barcodeStream;
      codeReader.decodeFromVideoElement(barcodeVideo, (result) => {
        if (result) {
          barcodeResult.value = result.getText();
          if (onBarcodeScanned.value) {
            onBarcodeScanned.value(barcodeResult.value);
          }
          stopBarcodeScanner();
        }
      });
    } catch (e) {
      barcodeResult.value = "Błąd dostępu do kamery";
    }
  }

  function stopBarcodeScanner() {
    if (barcodeStream) {
      barcodeStream.getTracks().forEach((track) => track.stop());
      barcodeStream = null;
    }
  }

  function openBarcodeDialog() {
    barcodeResult.value = "";
    barcodeDialog.value = true;
    nextTick(() => startBarcodeScanner());
  }

  function closeBarcodeDialog() {
    barcodeDialog.value = false;
    stopBarcodeScanner();
  }

  return {
    barcodeDialog,
    barcodeResult,
    isBarcodeSupported,
    onBarcodeScanned,
    openBarcodeDialog,
    closeBarcodeDialog,
    startBarcodeScanner,
    stopBarcodeScanner,
  };
}
