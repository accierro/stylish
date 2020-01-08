import React from "react";
import SingleColor from "../color/SingleColor";
import MultipleColor from "../color/MultipleColor";

const ColorView: React.FC = () => {
  return (
    <div className="color-view">
      <SingleColor title="Base Color" />
      <SingleColor title="Grey Color" limit={{ s: { min: 0, max: 40 } }} />
      <MultipleColor title="Ascent Color" />
    </div>
  );
};

export default ColorView;
