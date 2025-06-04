// utils/currencyConverter.ts

export function formatCurrency(value: number): string {
  if (isNaN(value)) return "0,00"; // Evita erro caso o valor não seja numérico

  const reais = Math.floor(value / 100); // Converte os últimos 2 dígitos em centavos
  const centavos = value % 100; // Obtém os centavos
  return `${reais},${centavos.toString().padStart(2, "0")}`; // Adiciona vírgula e formata
}