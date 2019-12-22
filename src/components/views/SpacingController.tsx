import React, { useContext } from "react";
import Range from "../input/Range";
import StyleContext from "../../context/StyleContext";

const SpacingController: React.FC = () => {
  const { spacing, setSpacing } = useContext(StyleContext);
  return (
    <div>
      <Range
        min={14}
        max={18}
        step={0.5}
        value={spacing.baseValue}
        onChange={event => {
          setSpacing({ ...spacing, baseValue: +event.target.value });
        }}
      />
    </div>
  );
};

export default SpacingController;
