import React from "react";

export interface Spacing {
  isCustom: boolean;
  baseValue: number;
  baseValues: number[];
  multipliers: number[];
}

export interface StyleContextState {
  spacing: Spacing;
}

type StyleContextProps = {
  spacing: Spacing;
  setSpacing: Function;
};

export const defaultValue = {
  spacing: {
    isCustom: false,
    baseValue: 16,
    baseValues: [],
    multipliers: [
      0.25,
      0.5,
      0.75,
      1,
      1.5,
      2,
      3,
      4,
      6,
      8,
      12,
      16,
      24,
      32,
      40,
      48
    ]
  }
};

const StyleContext = React.createContext<StyleContextProps>({
  ...defaultValue,
  setSpacing: () => {}
});

export default StyleContext;
