import React, { useRef, useEffect, useState } from "react";

function createNumLines(num: number) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(<div>{i + 1}</div>);
  }
  return arr;
}

const LinedDiv: React.FC = () => {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [numOfLines, setNumOfLines] = useState<number>(1);

  useEffect(() => {
    if (lineRef.current) {
      const height = lineRef.current.getBoundingClientRect().height;
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
          const num = (e.target as Element).innerHTML
            .split("</pre>")
            .filter(d => d !== "").length;
          if (numOfLines !== num) {
            setNumOfLines(num);
          }
        }}
      >
        <pre>Hello</pre>
      </div>
    </div>
  );
};

export default LinedDiv;
