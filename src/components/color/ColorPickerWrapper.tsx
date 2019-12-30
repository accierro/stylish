import React, { useState } from "react";
import ColorPickerContext, {
  defaultColor
} from "../../context/ColorPickerContext";
import ColorPicker from "./ColorPicker";
import { HSLColor } from "./types";

type ColorPickerWrapper = {
  initialColor?: HSLColor;
  onSave: (color: HSLColor) => any;
  onCancel: () => any;
};

const ColorPickerWrapper: React.FC<ColorPickerWrapper> = ({
  initialColor = defaultColor,
  onSave,
  onCancel
}) => {
  const [color, setColor] = useState(initialColor);

  return (
    <ColorPickerContext.Provider value={{ color, setColor }}>
      <ColorPicker
        onSave={() => {
          onSave(color);
        }}
        onCancel={onCancel}
      />
    </ColorPickerContext.Provider>
  );
};

export default ColorPickerWrapper;
