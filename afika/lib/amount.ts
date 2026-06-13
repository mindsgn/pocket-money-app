import { formatUnits, parseUnits } from "viem";

export function sanitizeDecimalInput(value: string) {
  return value.replace(/,/g, ".").trim();
}

export function parseTokenAmount(value: string, decimals: number) {
  const normalized = sanitizeDecimalInput(value);
  if (!normalized) {
    throw new Error("Amount is required");
  }
  return parseUnits(normalized, decimals);
}

export function formatTokenAmount(value: string | bigint, decimals: number, precision = 6) {
  const raw = typeof value === "bigint" ? value : BigInt(value || "0");
  const formatted = formatUnits(raw, decimals);
  const [whole, fraction = ""] = formatted.split(".");
  if (!fraction) return whole;
  const trimmed = fraction.slice(0, precision).replace(/0+$/, "");
  return trimmed ? `${whole}.${trimmed}` : whole;
}

export function amountExceedsBalance(amount: string, balance: string, decimals: number) {
  return parseTokenAmount(amount, decimals) > parseTokenAmount(balance || "0", decimals);
}
