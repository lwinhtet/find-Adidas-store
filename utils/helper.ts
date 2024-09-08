export function capitalizeFirstWord(sentence: string): string {
  if (!sentence) return sentence; // If the string is empty, return it as is
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
