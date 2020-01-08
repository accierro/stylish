import React from "react";
import LinedDiv from "../input/LinedDIv";
import { HSLColor } from "./types";

type ColorMenuProps = {
  varName: string;
  colors: HSLColor[];
};

const ColorMenu: React.FC<ColorMenuProps> = ({ varName, colors }) => {
  return (
    <div>
      <LinedDiv varName={varName} colors={colors} />
    </div>
  );
};

export default ColorMenu;
