import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import FileLine from "./FileLine";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  max-width: 1000px;
  margin: 0 auto;
  max-height: 600px;
  .title-spec {
    padding: 8px;
    border-bottom: 1px solid ${(props) => props.colors.grey};
  }
  .files {
    overflow-y: auto;
  }
`;
const FilesRender = ({ files, fileIndex, setFileIndex }) => {
  const fileLines = files.map((file, index) => {
    return (
      <FileLine
        key={index}
        created_at={file.created_at}
        name={file.name}
        username={file.user_id?.username}
        file_name={file.textfile_id.name}
        index={fileIndex}
        setIndex={setFileIndex}
      />
    );
  });

  return (
    <Cont colors={COLORS}>
      <div className="title-spec">
        <h5>Recent file uploads</h5>
      </div>
      <div className="files">{fileLines}</div>
    </Cont>
  );
};

export default FilesRender;
