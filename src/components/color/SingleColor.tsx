import React, { useEffect, useState } from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { HSLColor, ColorContext, HSLColorLimit } from "./types";
import convert from "color-convert";
import ColorPickerWrapper from "./ColorPickerWrapper";
import ColorExample from "./ColorExample";

interface ColorSchemaState {
  states: {
    idle: {};
    edgeSelected: {};
    allSelected: {};
  };
}

interface IColorContext {
  colors: ColorContext[];
}

type ColorEvent = SelectColor | Reset | EdgeSelected | AllSelected;

type SelectColor = { type: "SELECT_COLOR"; id: number; color: HSLColor };
type Reset = { type: "RESET"; num: number };
type EdgeSelected = { type: "EDGES_SELECTED" };
type AllSelected = { type: "ALL_SELECTED" };

function getInitialColors(num: number): ColorContext[] {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({
      color: { h: 0, s: 0, l: 100 },
      disabled: false,
      selected: false
    });
  }
  return arr;
}

function calculateColors(colors: ColorContext[]): ColorContext[] {
  const newArr = colors.map(d => ({ ...d, disabled: false }));
  const arr = colors.map(d => d.color);
  const firstColor = arr[0];
  const lastColor = arr[arr.length - 1];
  const middleIndex = Math.ceil(arr.length / 2) - 1;
  const middle = arr[middleIndex];

  //First gap
  let diff = {
    h: firstColor.h - middle.h,
    s: firstColor.s - middle.s,
    l: firstColor.l - middle.l
  };
  for (let i = 1; i < middleIndex; i++) {
    newArr[i].color = {
      h: firstColor.h - (diff.h / middleIndex) * i,
      s: firstColor.s - (diff.s / middleIndex) * i,
      l: firstColor.l - (diff.l / middleIndex) * i
    };
  }
  //Second gap
  diff = {
    h: middle.h - lastColor.h,
    s: middle.s - lastColor.s,
    l: middle.l - lastColor.l
  };
  for (let i = middleIndex + 1; i < arr.length - 1; i++) {
    newArr[i].color = {
      h: middle.h - (diff.h / middleIndex) * (i - middleIndex),
      s: middle.s - (diff.s / middleIndex) * (i - middleIndex),
      l: middle.l - (diff.l / middleIndex) * (i - middleIndex)
    };
  }
  return newArr;
}

const initialMachine = Machine<IColorContext, ColorSchemaState, ColorEvent>(
  {
    id: "initialState",
    initial: "idle",
    context: {
      colors: getInitialColors(7)
    },
    states: {
      idle: {
        entry: "blockMiddle",
        on: {
          SELECT_COLOR: {
            actions: "addColor"
          },
          EDGES_SELECTED: {
            target: "edgeSelected"
          }
        }
      },
      edgeSelected: {
        entry: "unblockMiddle",
        on: {
          SELECT_COLOR: {
            actions: "addColor"
          },
          ALL_SELECTED: {
            target: "allSelected"
          }
        }
      },
      allSelected: {
        entry: "autoColor",
        on: {
          SELECT_COLOR: {
            actions: "addColor"
          },
          RESET: {
            target: "idle",
            actions: "reset"
          }
        }
      }
    }
  },
  {
    actions: {
      addColor: assign({
        colors: (context, event: any) =>
          context.colors.map((d, i) =>
            event.id === i ? { ...d, color: event.color, selected: true } : d
          )
      }),
      reset: assign({
        colors: (context, event: any) => getInitialColors(event.num)
      }),
      blockMiddle: assign({
        colors: (context, event: any) =>
          context.colors.map((d, i, arr) => {
            if (i === 0 || i === arr.length - 1) {
              return { ...d, disabled: false };
            }
            return { ...d, disabled: true };
          })
      }),
      unblockMiddle: assign({
        colors: (context, event: any) => {
          const middle = Math.ceil(context.colors.length / 2) - 1;
          return context.colors.map((d, i) => {
            if (middle === i) {
              return { ...d, disabled: false };
            }
            return { ...d };
          });
        }
      }),
      autoColor: assign({
        colors: (context, event: any) => calculateColors(context.colors)
      })
    }
  }
);

type SingleColorProps = {
  title?: string;
  limit?: HSLColorLimit;
};

const SingleColor: React.FC<SingleColorProps> = ({ title, limit }) => {
  const [current, send] = useMachine(initialMachine);

  useEffect(() => {
    if (current.matches("idle")) {
      const { colors } = current.context;
      if (colors[0].selected && colors[colors.length - 1].selected) {
        send({ type: "EDGES_SELECTED" });
      }
    }
    if (current.matches("edgeSelected")) {
      const { colors } = current.context;
      const middle = Math.ceil(colors.length / 2) - 1;
      if (colors[middle].selected) {
        send({ type: "ALL_SELECTED" });
      }
    }
  }, [current, send]);
  return (
    <div className="single-color-view">
      <h4>{title ? title : null}</h4>
      {current.context.colors.map((d, i) => {
        return (
          <div className="color-samples">
            <ColorExample
              disabled={d.disabled}
              color={d.color}
              onChange={hsl => {
                if (limit) {
                  if (limit.h && (limit.h.max < hsl.h || limit.h.min > hsl.h)) {
                    return;
                  }
                  if (limit.s && (limit.s.max < hsl.s || limit.s.min > hsl.s)) {
                    return;
                  }
                  if (limit.l && (limit.l.max < hsl.l || limit.l.min > hsl.l)) {
                    return;
                  }
                }
                send({
                  type: "SELECT_COLOR",
                  id: i,
                  color: { ...hsl }
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SingleColor;
