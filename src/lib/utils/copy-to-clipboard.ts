export async function copyToClipboard(text: string) {
  try {
    // Copy the text to the clipboard
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
  }
}
