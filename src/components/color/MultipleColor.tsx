import React, { useState } from "react";
import SingleColor from "./SingleColor";

type MultipleColorProps = {
  title: string;
};

const MultipleColor: React.FC<MultipleColorProps> = ({ title }) => {
  const [colors, setColors] = useState([1]);

  return (
    <div>
      {title}
      {colors &&
        colors.map(d => {
          return (
            <div key={d}>
              <SingleColor key={d} />
              <button
                onClick={() => {
                  setColors(prev => {
                    return prev.filter(a => a !== d);
                  });
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      <button
        onClick={() => {
          setColors(prev => {
            if (prev.length === 0) return [1];
            const lastIndex = prev[prev.length - 1];
            return [...prev, lastIndex + 1];
          });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default MultipleColor;
