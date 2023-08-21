import React from "react";

const TextParser = ({ children = "" }) => {
  let textSplit = children.split("\n");
  const paraElems = textSplit.map((text, index) => {
    text = text.replaceAll(/\\n/g, "").replaceAll("\r", "");
    return (
      <p key={index} className="mar-bottom-8">
        {" "}
        {text}{" "}
      </p>
    );
  });
  return <div>{paraElems}</div>;
};

export default TextParser;
