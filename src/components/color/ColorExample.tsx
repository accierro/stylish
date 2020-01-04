import React, { useState } from "react";
import ColorPickerWrapper from "./ColorPickerWrapper";
import { HSLColor } from "./types";

type ColorExample = {
  onChange: (color: HSLColor) => any;
  color: HSLColor;
  disabled: boolean;
};

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

const ColorExample: React.FC<ColorExample> = ({
  onChange,
  color,
  disabled
}) => {
  const [show, setShow] = useState<"right" | "left" | null>(null);
  return (
    <>
      <div
        className={`color-example ${disabled ? "" : "active"}`}
        style={{
          background: `hsl(${color.h}, ${color.s}%, ${color.l}%)`
        }}
        onClick={e => {
          if (!disabled) {
            const dimensions = (e.target as Element).getBoundingClientRect();
            if (dimensions.x + 255 + 50 > getWidth()) {
              setShow("left");
              return;
            }
            setShow("right");
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
              setShow(null);
            }}
          ></div>
          <ColorPickerWrapper
            initialColor={color}
            position={show}
            onSave={hsl => {
              setShow(null);
              onChange(hsl);
            }}
            onCancel={() => {
              setShow(null);
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default ColorExample;
