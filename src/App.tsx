import React, { useState, useCallback } from "react";
import SpacingView from "./components/views/SpacingView";
import StyleContext, {
  defaultValue,
  Spacing,
  StyleContextState
} from "./context/StyleContext";
import ColorView from "./components/views/ColorView";

const App: React.FC = () => {
  const [state, setState] = useState<StyleContextState>(defaultValue);
  const setSpacing = useCallback(
    (value: Spacing) => {
      console.log(value);
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
      </StyleContext.Provider>
    </div>
  );
};

export default App;
