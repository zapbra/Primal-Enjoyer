import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  .content-holder {
    padding: 8px 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-height: 400px;
    overflow-y: auto;

    @media only screen and (max-width: 700px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
  .title-spec {
    padding: 8px 16px;
  }
  .link-spec {
    margin: 8px;
    @media only screen and (max-width: 700px) {
      margin: 4px;
    }
    @media only screen and (max-width: 300px) {
      word-break: break-all;
      font-size: 12.73px;
    }
  }
`;

const Featured = ({ titles }) => {
  const [titleElems, setTitleElems] = useState(
    titles.map((title, index) => {
      return (
        <a key={index} href={`#(${index + 1}) ${title}`}>
          <p className="blue link-spec">
            <span className="grey">#{index + 1} </span>
            {title}
          </p>
        </a>
      );
    })
  );
  useEffect(() => {
    if (window.type !== "undefined") {
      // Get the title from the document to add links via id
      const headings = document.querySelectorAll(".markdown-2 h3");
      for (let heading of headings) {
        heading.id = heading.innerHTML;
      }
    }
  }, []);

  return (
    <Cont colors={COLORS} className="box-shadow-2">
      <div className="title-spec">
        <h5>Featured in this lecture</h5>
      </div>
      <div className="grey-line"></div>
      <div className="content-holder small-scrollbar">{titleElems}</div>
    </Cont>
  );
};

export default Featured;
