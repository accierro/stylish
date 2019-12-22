import React, { useState } from "react";
import SpacingView from "./components/views/SpacingView";
import StyleContext, { defaultValue, Spacing } from "./context/StyleContext";

const App: React.FC = () => {
  const [state, setState] = useState(defaultValue);
  return (
    <div>
      <StyleContext.Provider
        value={{
          spacing: state.spacing,
          setSpacing: (value: Spacing) => {
            setState(prev => {
              return { ...prev, spacing: value };
            });
          }
        }}
      >
        <SpacingView />
      </StyleContext.Provider>
    </div>
  );
};

export default App;
