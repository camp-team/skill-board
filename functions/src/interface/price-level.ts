export type PriceLevel =
  | '-'
  | '30万-'
  | '40万-'
  | '50万-'
  | '60万-'
  | '70万-'
  | '80万-'
  | '90万-'
  | '100万-';

interface PriceLevelRange {
  level: PriceLevel;
  lessthan: number;
}

const ranges: PriceLevelRange[] = [
  { level: '-', lessthan: 0 },
  { level: '30万-', lessthan: 400000 },
  { level: '40万-', lessthan: 500000 },
  { level: '50万-', lessthan: 600000 },
  { level: '60万-', lessthan: 700000 },
  { level: '70万-', lessthan: 800000 },
  { level: '80万-', lessthan: 900000 },
  { level: '90万-', lessthan: 1000000 },
  { level: '100万-', lessthan: 10000000 },
];

export const priceToLevel = function (price: number): PriceLevel {
  for (const range of ranges) {
    if (price < range.lessthan) {
      return range.level;
    }
  }
  return '-';
};
