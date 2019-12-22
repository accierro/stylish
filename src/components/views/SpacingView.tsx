import React, { useContext } from "react";
import StyleContext, { Spacing } from "../../context/StyleContext";
import SpacingController from "./SpacingController";

function getSpacing(data: Spacing): React.ReactNode {
  //TODO: implement custom changing
  return data.multipliers.map(d => {
    const pixels = data.baseValue * d;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "140px" }}>
          <span>{`${pixels}px `}</span>
          <span>{`(${data.baseValue} x ${d})`}</span>
        </div>
        <div style={{ background: "red", width: pixels }}></div>
      </div>
    );
  });
}

const SpacingView: React.FC = () => {
  const { spacing } = useContext(StyleContext);

  return (
    <div>
      <SpacingController />
      {spacing && getSpacing(spacing)}
    </div>
  );
};

export default SpacingView;
