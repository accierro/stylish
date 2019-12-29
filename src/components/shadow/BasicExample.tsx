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
        borderRadius: "5px",
        transition: "box-shadow 0.3s"
      }}
    >
      {title}
    </div>
  );
};

export default BasicExample;
