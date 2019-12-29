import React, { useState } from "react";
import ColorPickerContext, {
  defaultColor
} from "../../context/ColorPickerContext";
import ColorPicker from "./ColorPicker";

const ColorPickerWrapper: React.FC = () => {
  const [color, setColor] = useState(defaultColor);

  return (
    <ColorPickerContext.Provider value={{ color, setColor }}>
      <ColorPicker />
    </ColorPickerContext.Provider>
  );
};

export default ColorPickerWrapper;
