import React, { useRef, useEffect, useState } from "react";
import { colorStateToString } from "../color/helpers";
import { HSLColor } from "../color/types";

function createNumLines(num: number) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(<div>{i + 1}</div>);
  }
  return arr;
}

type LinedDivProps = {
  varName: string;
  colors: HSLColor[];
};

const LinedDiv: React.FC<LinedDivProps> = ({ varName, colors }) => {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [numOfLines, setNumOfLines] = useState<number>(1);

  useEffect(() => {
    if (lineRef.current) {
      const height = lineRef.current.getBoundingClientRect().height - 16;
      setNumOfLines(height / 19);
    }
  }, [lineRef.current]);
  return (
    <div className="code-snippet-container">
      <div className="code-snippet-line-column" ref={lineRef}>
        {createNumLines(numOfLines)}
      </div>
      <div
        className="code-snippet-text-area"
        contentEditable="true"
        onInput={e => {
          const num =
            ((e.target as Element).getBoundingClientRect().height - 16) / 19;
          if (numOfLines !== num) {
            setNumOfLines(num);
          }
        }}
      >
        <pre>{colorStateToString(colors, varName)}</pre>
      </div>
    </div>
  );
};

export default LinedDiv;
