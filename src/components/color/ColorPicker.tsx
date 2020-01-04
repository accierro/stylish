/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Saturation from "./Saturation";
import Hue from "./Hue";
import NumberInputs from "./NumberInputs";
import Example from "./Example";

type ColorPickerProps = {
  position: "left" | "right";
  onSave: () => any;
  onCancel: () => any;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  onSave,
  onCancel,
  position
}) => {
  return (
    <div
      className="color-picker"
      style={{ left: position === "left" ? "-100px" : 0 }}
    >
      <Saturation />
      <Hue />
      <NumberInputs />
      <div className="buttons">
        <Example />
        <button className="ok-button" onClick={onSave}>
          OK
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default React.memo(ColorPicker);
