import React, { useContext } from "react";
import StyleContext from "../../context/StyleContext";

const SpacingView: React.FC = () => {
  const { spacing, setSpacing } = useContext(StyleContext);
  console.log(spacing);
  return <div>Cool</div>;
};

export default SpacingView;
