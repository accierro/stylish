export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

type MinMax = { min: number; max: number };

export type HSLColorLimit = {
  h?: MinMax;
  s?: MinMax;
  l?: MinMax;
};

export type ColorContext = {
  color: HSLColor;
  disabled: boolean;
  selected: boolean;
};
