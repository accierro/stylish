import React from "react";

type NumberInputProps = {
  min: number;
  max: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const NumberInput: React.FC<NumberInputProps> = ({
  min,
  max,
  value,
  onChange,
  label
}) => {
  return (
    <div className="number-input">
      <h4>{label}</h4>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
      />
    </div>
  );
};

export default NumberInput;
