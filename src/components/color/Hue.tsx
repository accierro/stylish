import React, { useContext } from "react";
import ColorPickerContext from "../../context/ColorPickerContext";
import { HSLColor } from "./types";

const Hue: React.FC = () => {
  const { color, setColor } = useContext(ColorPickerContext);
  return (
    <>
      <h3>Hue</h3>
      <input
        type="range"
        min={0}
        max={360}
        value={color.h}
        onChange={e => {
          setColor((prev: HSLColor) => ({ ...prev, h: +e.target.value }));
          e.persist();
        }}
      />
    </>
  );
};

export default Hue;
