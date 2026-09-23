export function spatialProgress(scrollOffset: number, scrollRange: number, count: number) {
  if (count <= 1 || scrollRange <= 0) return 0;
  const ratio = Math.max(0, Math.min(1, scrollOffset / scrollRange));
  return ratio * (count - 1);
}
