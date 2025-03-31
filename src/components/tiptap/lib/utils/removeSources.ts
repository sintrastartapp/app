export function removeSources(text: string) {
  return text.replace(/(【.*source】)/g, "");
}
