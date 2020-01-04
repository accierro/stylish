import React, { useContext } from "react";
import ColorPickerContext from "../../context/ColorPickerContext";

const Example: React.FC = () => {
  const { color } = useContext(ColorPickerContext);

  return (
    <div
      className="example"
      style={{ background: `hsl(${color.h}, ${color.s}%, ${color.l}%)` }}
    ></div>
  );
};

export default Example;
