import React from "react";

const TextParser = ({ children = "" }) => {
  let textSplit = children.split("\n");
  const paraElems = textSplit.map((text) => {
    text = text.replaceAll(/\\n/g, "").replaceAll("\r", "");
    return <p className="mar-bottom-8"> {text} </p>;
  });
  return <div>{paraElems}</div>;
};

export default TextParser;
