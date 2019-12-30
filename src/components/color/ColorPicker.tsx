/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Saturation from "./Saturation";
import Hue from "./Hue";
import NumberInputs from "./NumberInputs";

type ColorPickerProps = {
  onSave: () => any;
  onCancel: () => any;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ onSave, onCancel }) => {
  return (
    <div className="color-picker">
      <Saturation />
      <Hue />
      <NumberInputs />
      <div className="buttons">
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
