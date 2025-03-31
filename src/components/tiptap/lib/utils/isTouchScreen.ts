export function isTouchScreen() {
  if (window.matchMedia("(pointer: coarse)").matches) {
    return true;
  }
  return false;
}
