import React, { useState } from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import BasicExample from "../shadow/BasicExample";
import Range from "../input/Range";

interface ThemeSchemaState {
  states: {
    light: {};
    dark: {};
  };
}

type ThemeColorSchema = {
  background: string;
  color: string;
  basicExample: {
    background: string;
    color: string;
  };
  insetShadow: any;
  outerShadow: any;
};

interface IThemeContext {
  styles: ThemeColorSchema;
}

type ThemeEvent = { type: "GO_DARK" } | { type: "GO_LIGHT" };

const lightTheme = {
  background: "#fff",
  color: "#000",
  basicExample: {
    background: "hsla(220, 5%, 10%, 1)",
    color: "#fff"
  },
  insetShadow: {
    background: "hsla(220, 5%, 10%, 1)",
    color: "hsla(220, 19%, 80%, 1)",
    boxShadow: "0 2px 3px 0 rgba(255,255,255, 0.08)"
  },
  outerShadow: {
    background: "hsla(220, 5%, 10%, 1)",
    color: "hsla(220, 19%, 80%, 1)",
    boxShadow:
      "0 2px 3px 0 rgba(255,255,255, 0.08), inset 0 0 7px 2px rgba(0,0,0, 0.31)"
  }
};

const darkTheme = {
  background: "hsl(227, 10%, 20%)",
  color: "hsla(220, 19%, 80%, 1)",
  basicExample: {
    background: "hsla(220, 5%, 10%, 1)",
    color: "hsla(220, 19%, 80%, 1)"
  },
  insetShadow: (value: number) => {
    return {
      background: "hsla(220, 5%, 10%, 1)",
      color: "hsla(220, 19%, 80%, 1)",
      boxShadow: `0 2px 3px 0 rgba(255,255,255, ${value *
        -0.04}), inset 0 0 7px 2px rgba(0,0,0, ${value * -0.15})`
    };
  },
  outerShadow: (value: number) => {
    return {
      background: "hsla(220, 5%, 10%, 1)",
      color: "hsla(220, 19%, 80%, 1)",
      boxShadow: `0 ${(value - 1) * 3 + 1}px ${(value - 1) * 8 +
        3}px rgba(0,0,0, ${(value - 1) * -0.04 + 0.85})`
    };
  }
};

const themeMachine = Machine<IThemeContext, ThemeSchemaState, ThemeEvent>(
  {
    id: "themeMachine",
    initial: "dark",
    context: {
      styles: darkTheme
    },
    states: {
      light: {
        on: {
          GO_DARK: {
            target: "dark",
            actions: "goDark"
          }
        }
      },
      dark: {
        on: {
          GO_LIGHT: {
            target: "light",
            actions: "goLight"
          }
        }
      }
    }
  },
  {
    actions: {
      goDark: assign({ styles: darkTheme }),
      goLight: assign({ styles: lightTheme })
    }
  }
);

function getStyles(context: IThemeContext, value: number) {
  if (value === 0) {
    return context.styles.basicExample;
  } else if (value < 0) {
    return context.styles.insetShadow(value);
  } else {
    return context.styles.outerShadow(value);
  }
}

const ShadowView: React.FC = () => {
  const [current, send] = useMachine(themeMachine);
  const [value, setValue] = useState(0);
  return (
    <div style={{ ...current.context.styles, overflow: "auto" }}>
      <button
        onClick={() => {
          const type = current.nextEvents.find(d => d.startsWith("GO"));
          type && send({ type: type as "GO_DARK" | "GO_LIGHT" });
        }}
      >
        Change Theme
      </button>
      <BasicExample
        style={getStyles(current.context, value)}
        title="That's a basic example"
      />
      <Range
        max={4}
        min={-2}
        step={1}
        value={value}
        onChange={e => setValue(+e.target.value)}
      />
    </div>
  );
};

export default ShadowView;
