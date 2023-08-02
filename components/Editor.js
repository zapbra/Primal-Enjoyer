import styled from "styled-components";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function Editor({ section }) {
  const [value, setValue] = useState(section);
  return (
    <div>
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
}

export default Editor;
