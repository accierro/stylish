import React from "react";

export interface Spacing {
  baseValue: number;
  multipliers: number[];
}

type StyleContextProps = {
  spacing: Spacing;
  setSpacing: Function;
};

export const defaultValue = {
  spacing: {
    baseValue: 16,
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

const StyleContext = React.createContext<Partial<StyleContextProps>>({});

export default StyleContext;
