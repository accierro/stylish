import React from "react";

const BasicExample: React.FC<{ style: any; title: string }> = ({
  style,
  title
}) => {
  return (
    <div
      style={{
        ...style,
        border: "none",
        padding: "30px",
        margin: "20px",
        borderRadius: "5px"
      }}
    >
      {title}
    </div>
  );
};

export default BasicExample;
