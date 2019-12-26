import React from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import BasicExample from "../shadow/BasicExample";

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
  insetShadow: {
    background: string;
    color: string;
    boxShadow: string;
  };
  outerShadow: {
    background: string;
    color: string;
    boxShadow: string;
  };
};

interface IThemeContext {
  color: ThemeColorSchema;
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
  insetShadow: {
    background: "hsla(220, 5%, 10%, 1)",
    color: "hsla(220, 19%, 80%, 1)",
    boxShadow:
      "0 2px 3px 0 rgba(255,255,255, 0.08), inset 0 0 7px 2px rgba(0,0,0, 0.31)"
  },
  outerShadow: {
    background: "hsla(220, 5%, 10%, 1)",
    color: "hsla(220, 19%, 80%, 1)",
    boxShadow:
      "0 2px 3px 0 rgba(255,255,255, 0.08), inset 0 0 7px 2px rgba(0,0,0, 0.31)"
  }
};

const themeMachine = Machine<IThemeContext, ThemeSchemaState, ThemeEvent>(
  {
    id: "themeMachine",
    initial: "dark",
    context: {
      color: darkTheme
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
      goDark: assign({ color: darkTheme }),
      goLight: assign({ color: lightTheme })
    }
  }
);

const ShadowView: React.FC = () => {
  const [current, send] = useMachine(themeMachine);
  return (
    <div style={{ ...current.context.color, overflow: "auto" }}>
      <button
        onClick={() => {
          const type = current.nextEvents.find(d => d.startsWith("GO"));
          type && send({ type: type as "GO_DARK" | "GO_LIGHT" });
        }}
      >
        Change Theme
      </button>
      <BasicExample
        style={current.context.color.basicExample}
        title="That's a basic example"
      />
      <BasicExample
        style={current.context.color.insetShadow}
        title="A box with inset shadows"
      />
      <BasicExample
        style={current.context.color.outerShadow}
        title="A box with outer shadows"
      />
      <input type="range" style={{ width: "8px", height: "175px" }} />
    </div>
  );
};

export default ShadowView;
