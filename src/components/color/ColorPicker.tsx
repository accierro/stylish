/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useContext
} from "react";
import convert from "color-convert";
import Saturation from "./Saturation";
import Hue from "./Hue";
import ColorPickerContext from "../../context/ColorPickerContext";
import NumberInputs from "./NumberInputs";

const ColorPicker: React.FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  //TODO delete next line
  // const { color } = useContext(ColorPickerContext);

  useEffect(() => {
    if (ref.current !== null) {
      const c = ref.current.getContext("2d");
      if (c && !ctx) {
        console.log(c);
        setCtx(c);
        let gradient = c.createLinearGradient(0, 0, 255, 0);
        // Add three color stops
        gradient.addColorStop(0, "hsl(220, 100%, 100%)");
        gradient.addColorStop(1, "hsl(220, 100%, 50%)");
        c.fillStyle = gradient;
        c.fillRect(0, 0, 255, 100);

        let gradient2 = c.createLinearGradient(0, 0, 0, 100);
        // Add three color stops
        gradient2.addColorStop(0, "hsla(220, 100%, 0%, 0)");
        gradient2.addColorStop(1, "hsla(220, 100%, 0%, 1)");
        c.fillStyle = gradient2;
        c.fillRect(0, 0, 255, 100);
      }
    }
  }, [ref.current]);

  const mouseEvent = useCallback(
    (() => {
      let clicked = false;
      return (type: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (type === "mousedown") {
          clicked = true;
        }
        if (type === "mouseup") {
          clicked = false;
        }
        if (type === "mousemove" && clicked) {
          if (ctx) {
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            let imageData = ctx.getImageData(x, y, 1, 1);
            console.log(
              convert.rgb.hsv([
                imageData.data[0],
                imageData.data[1],
                imageData.data[2]
              ])
            );
          }
        }
      };
    })(),
    [ctx]
  );
  console.log("Rerender");
  return (
    <div className="color-picker">
      <Saturation />
      <Hue />
      <NumberInputs />
      {/* <div
        style={{
          width: "50px",
          height: "50px",
          background: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
          border: "1px solid black"
        }}
      ></div> */}
      {/* <canvas
        ref={ref}
        width="255px"
        height="100px"
        onMouseDown={e => {
          mouseEvent("mousedown", e);
        }}
        onMouseMove={e => {
          mouseEvent("mousemove", e);
        }}
        onMouseUp={e => {
          mouseEvent("mouseup", e);
        }}
      ></canvas> */}
    </div>
  );
};

export default React.memo(ColorPicker);
