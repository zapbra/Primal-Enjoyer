import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div``;
const Download = ({ text, title }) => {
  const createTextNode = (rawText) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    return url;
  };

  const [textFile, setTextFile] = useState(createTextNode());

  return (
    <Cont colors={COLORS}>
      <a download={title} href={textFile}>
        <div className="download-green flex-inline align-center cursor">
          <FontAwesomeIcon icon={faDownload} className="green mar-right-8" />
          <p className="green">Download Text</p>
        </div>
      </a>
    </Cont>
  );
};

export default Download;
