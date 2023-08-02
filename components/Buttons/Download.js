import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Link from "next/link";
import COLORS from "../../data/colors";
const Cont = styled.div`
  z-index: 1;
  position: relative;
`;
const Download = ({ link, type }) => {
  return (
    <Cont colors={COLORS}>
      <Link href={link}>
        <div className="download-green flex-inline align-center cursor">
          <FontAwesomeIcon icon={faDownload} className="green mar-right-8" />
          <p className="green">Download {type}</p>
        </div>
      </Link>
    </Cont>
  );
};

export default Download;
