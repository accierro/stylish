import React, { useState } from "react";
import SingleColor from "./SingleColor";

type MultipleColorProps = {
  title: string;
};

const MultipleColor: React.FC<MultipleColorProps> = ({ title }) => {
  const [colors, setColors] = useState([1]);

  return (
    <div className="multiple-colors-view">
      <h4>{title}</h4>
      <div className="multiple-color-column">
        {colors &&
          colors.map(d => {
            return (
              <React.Fragment key={d}>
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
              </React.Fragment>
            );
          })}
      </div>
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
