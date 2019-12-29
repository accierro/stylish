import React, { useContext } from "react";
import ColorPickerContext from "../../context/ColorPickerContext";
import { HSLColor } from "./types";

const Hue: React.FC = () => {
  const { color, setColor } = useContext(ColorPickerContext);
  return (
    <div>
      <input
        type="range"
        min={0}
        max={360}
        value={color.h}
        onChange={e => {
          setColor((prev: HSLColor) => ({ ...prev, h: +e.target.value }));
          e.persist();
        }}
        style={{
          width: "100%",
          WebkitAppearance: "none",
          background:
            "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"
        }}
      />
    </div>
  );
};

export default Hue;
