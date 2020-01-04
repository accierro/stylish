import React, { useState } from "react";
import ColorPickerWrapper from "./ColorPickerWrapper";
import { HSLColor } from "./types";

type ColorExample = {
  onChange: (color: HSLColor) => any;
  color: HSLColor;
  disabled: boolean;
};

const ColorExample: React.FC<ColorExample> = ({
  onChange,
  color,
  disabled
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        style={{
          width: "20px",
          height: "20px",
          background: `hsl(${color.h}, ${color.s}%, ${color.l}%)`
        }}
        onClick={() => {
          if (!disabled) {
            setShow(true);
          }
        }}
      ></div>
      {show ? (
        <>
          <div
            style={{
              background: "transparent",
              position: "fixed",
              width: "100%",
              minHeight: "100%",
              top: 0,
              left: 0
            }}
            onClick={() => {
              setShow(false);
            }}
          ></div>
          <ColorPickerWrapper
            onSave={hsl => {
              setShow(false);
              onChange(hsl);
            }}
            onCancel={() => {
              setShow(false);
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default ColorExample;
