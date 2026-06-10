export const normalizeMoney = (value: number): number => {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Number(value.toFixed(2));
};

export const parseMoneyInput = (value: string): number => {
  const parsed = Number.parseFloat(value);
  return normalizeMoney(parsed);
};