import { manifest } from "../types/bundle.js";

const dropArea = document.getElementById("drop-area") as HTMLElement;
const manifestDiv = document.getElementById("manifest") as HTMLElement;

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("hover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("hover");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("hover");

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    processFile(file);
  }
});

async function processFile(file: File): Promise<void> {
  try {
    const image = await file.arrayBuffer();
    const reader = manifest.Reader.fromBuffer(
      "image/jpeg",
      new Uint8Array(image),
    );
    manifestDiv.textContent = reader.json();
  } catch (error) {
    console.error("Error:", error);
    manifestDiv.textContent = "Error retrieving manifest";
  }
}
