export function formatCurrency(value: number): string {
  if (isNaN(value)) return "0,00"; // Evita erro caso o valor não seja numérico

  const sign = value < 0 ? "-" : "";
  const absValue = Math.abs(value);
  const reais = Math.floor(absValue / 100);
  const centavos = absValue % 100;
  return `${sign}${reais},${centavos.toString().padStart(2, "0")}`;
}