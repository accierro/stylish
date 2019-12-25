import React from "react";
import SingleColor from "../color/SingleColor";
import MultipleColor from "../color/MultipleColor";

const ColorView: React.FC = () => {
  return (
    <div>
      <SingleColor title="Base Color" />
      <SingleColor title="Grey Color" limit={{ s: { min: 0, max: 30 } }} />
      <MultipleColor title="Ascent Color" />
    </div>
  );
};

export default ColorView;
