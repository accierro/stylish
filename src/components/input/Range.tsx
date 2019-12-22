import React from "react";

type RangeProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Range: React.FC<RangeProps> = props => {
  return <input type="range" {...props} />;
};

export default Range;
