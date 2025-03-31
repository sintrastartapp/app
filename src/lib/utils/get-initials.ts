export function getInitials(name: string) {
  const parts = name.split(" ");
  return parts
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
