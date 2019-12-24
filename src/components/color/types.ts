export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export type ColorContext = {
  color: HSLColor;
  disabled: boolean;
  selected: boolean;
};
