export function pluralRu(
  count: number,
  forms: readonly [string, string, string],
): string {
  const lastTwo = Math.abs(count) % 100;
  const last = lastTwo % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return forms[2];
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 4) return forms[1];
  return forms[2];
}

export function countLabel(
  count: number,
  forms: readonly [string, string, string],
): string {
  return `${count} ${pluralRu(count, forms)}`;
}
