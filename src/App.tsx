import React, { useState, useCallback } from "react";
import SpacingView from "./components/views/SpacingView";
import StyleContext, {
  defaultValue,
  Spacing,
  StyleContextState
} from "./context/StyleContext";
import ColorView from "./components/views/ColorView";
import ShadowView from "./components/views/ShadowView";
import ColorPickerWrapper from "./components/color/ColorPickerWrapper";
import "./css/ColorPicker.scss";
import "./css/Main.scss";

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
    <div>
      <StyleContext.Provider
        value={{
          spacing: state.spacing,
          setSpacing
        }}
      >
        <SpacingView />
        <ColorView />
        <ShadowView />
        <ColorPickerWrapper />
      </StyleContext.Provider>
    </div>
  );
};

export default App;
