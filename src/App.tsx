import React, { useState, useCallback } from "react";
import SpacingView from "./components/views/SpacingView";
import StyleContext, {
  defaultValue,
  Spacing,
  StyleContextState
} from "./context/StyleContext";
import ColorView from "./components/views/ColorView";
import ShadowView from "./components/views/ShadowView";
import "./css/ColorPicker.scss";
import "./css/Main.scss";
import "./css/LinedDiv.scss";

const App: React.FC = () => {
  const [state, setState] = useState<StyleContextState>(defaultValue);
  const setSpacing = useCallback(
    (value: Spacing) => {
      setState(prev => {
        return { ...prev, spacing: value };
      });
    },
    [setState]
  );
  return (
    <div className="container">
      <StyleContext.Provider
        value={{
          spacing: state.spacing,
          setSpacing
        }}
      >
        <ColorView />

        <SpacingView />
        <ShadowView />
      </StyleContext.Provider>
    </div>
  );
};

export default App;
