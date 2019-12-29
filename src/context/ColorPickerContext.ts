import React from "react";
import { HSLColor } from "../components/color/types";

type ColorPickerContextProps = {
  color: HSLColor;
  setColor: Function;
};

export const defaultColor = {
  h: 220,
  s: 100,
  l: 50
};

const ColorPickerContext = React.createContext<ColorPickerContextProps>({
  color: defaultColor,
  setColor: () => {
    console.log("not implemented");
  }
});

export default ColorPickerContext;
