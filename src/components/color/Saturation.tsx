import React, { useContext, useRef } from "react";
import ColorPickerContext from "../../context/ColorPickerContext";
import convert from "color-convert";

function isReactMouseEvent(
  e: any
): e is React.MouseEvent<HTMLDivElement, MouseEvent> {
  return e.nativeEvent !== undefined;
}

const Saturation: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
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
      const x = e.x;
      const y = e.y;
      if (ref.current) {
        const {
          width: containerWidth,
          height: containerHeight
        } = ref.current.getBoundingClientRect();
        let left = x - ref.current.getBoundingClientRect().left;
        let top = y - ref.current.getBoundingClientRect().top;

        if (left < 0) {
          left = 0;
        }
        if (left > containerWidth) {
          left = containerWidth;
        }
        if (top < 0) {
          top = 0;
        }
        if (top > containerHeight) {
          top = containerHeight;
        }

        const c = convert.hsv.hsl([
          color.h,
          Math.ceil((left / 256) * 100),
          100 - top
        ]);
        setColor({ h: c[0], s: c[1], l: c[2] });
      }
    }
  }

  function onMouseUp() {
    window.removeEventListener("mousemove", handleChange);
    window.removeEventListener("mouseup", onMouseUp);
  }

  const hsv = convert.hsl.hsv([color.h, color.s, color.l]);
  return (
    <div
      ref={ref}
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
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))"
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              border: `1px solid ${color.l > 50 ? "black" : "white"}`,
              position: "absolute",
              transform: "translate(-5px, -5px)",
              pointerEvents: "none",
              left: hsv[1] + "%",
              top: 100 - hsv[2] + "%",
              borderRadius: "50%"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Saturation;
