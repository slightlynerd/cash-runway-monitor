import type { RunwayStatus } from "../types/financial";

interface CurrencyFormatOptions {
  locale?: string;
  currency?: string;
  maximumFractionDigits?: number;
}

const defaultCurrencyOptions: Required<CurrencyFormatOptions> = {
  locale: "en-NG",
  currency: "NGN",
  maximumFractionDigits: 0
};

export const formatCurrency = (
  value: number,
  options: CurrencyFormatOptions = {}
): string => {
  const merged = { ...defaultCurrencyOptions, ...options };

  return new Intl.NumberFormat(merged.locale, {
    style: "currency",
    currency: merged.currency,
    maximumFractionDigits: merged.maximumFractionDigits
  }).format(value);
};

export const formatRunway = (
  months: number | null,
  status: RunwayStatus
): string => {
  if (status === "stable") {
    return "Infinite / Stable";
  }

  if (status === "depleted") {
    return "0 months";
  }

  return `${months?.toFixed(1)} months`;
};