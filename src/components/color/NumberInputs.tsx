import React, { useContext, useCallback } from "react";
import NumberInput from "../input/NumberInput";
import ColorPickerContext from "../../context/ColorPickerContext";
import { HSLColor } from "./types";

const NumberInputs: React.FC = () => {
  const { color, setColor } = useContext(ColorPickerContext);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
      setColor((prev: HSLColor) => ({ ...prev, [key]: +e.target.value }));
      e.persist();
    },
    [setColor]
  );
  return (
    <div className="color-numbers">
      <NumberInput
        label="H:"
        max={360}
        min={0}
        value={color.h}
        onChange={e => {
          onChange(e, "h");
        }}
      />
      <NumberInput
        label="S:"
        max={100}
        min={0}
        value={color.s}
        onChange={e => {
          onChange(e, "s");
        }}
      />
      <NumberInput
        label="L:"
        max={100}
        min={0}
        value={color.l}
        onChange={e => {
          onChange(e, "l");
        }}
      />
    </div>
  );
};

export default NumberInputs;
