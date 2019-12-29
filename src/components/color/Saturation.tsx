import React, { useContext } from "react";
import ColorPickerContext from "../../context/ColorPickerContext";
import convert from "color-convert";

function isReactMouseEvent(
  e: any
): e is React.MouseEvent<HTMLDivElement, MouseEvent> {
  return e.nativeEvent !== undefined;
}

const Saturation: React.FC = () => {
  const { color, setColor } = useContext(ColorPickerContext);

  function handleChange(
    e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (isReactMouseEvent(e)) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const c = convert.hsv.hsl([color.h, Math.ceil((x / 256) * 100), 100 - y]);
      setColor({ h: c[0], s: c[1], l: c[2] });
    } else {
      console.log("Handle change");
    }
  }

  function onMouseUp() {
    window.removeEventListener("mousemove", handleChange);
    window.removeEventListener("mouseup", onMouseUp);
  }

  return (
    <div
      style={{
        width: "255px",
        height: "100px",
        background: `hsl(${color.h}, 100%, 50%)`
      }}
      onMouseDown={e => {
        handleChange(e);
        window.addEventListener("mousemove", handleChange);
        window.addEventListener("mouseup", onMouseUp);
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))"
          }}
        ></div>
      </div>
    </div>
  );
};

export default Saturation;
