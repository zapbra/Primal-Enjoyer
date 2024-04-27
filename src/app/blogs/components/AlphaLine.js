import Link from "next/link";
import styled from "styled-components";
import { useState, useRef } from "react";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  border-bottom: 3px solid ${(props) => props.colors.darkBlue};
  transition: background-color 0.25s ease;
  padding: 8px;

  transition: padding 0.25s ease;
  &:hover {
    padding: 12px 8px 8px 8px;
  }
  .icon- {
    transition: transform 0.5s ease;
  }
  .cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    cursor: pointer;
    &:hover {
      h4,
      .icon-blue {
        color: ${(props) => props.colors.green};
      }
    }
  }
  .posts {
    transition: height 0.5s ease;
    overflow-y: hidden;
  }
  p {
    color: ${(props) => props.colors.blue};
    &:before {
      content: "•";
      color: ${(props) => props.colors.blue};
      display: inline-block;
      width: 1em;
      margin-left: 1rem;
    }
  }
`;
const AlphaLine = ({ alphabet, posts }) => {
  const [height, setHeight] = useState("0px");
  const [visible, setVisible] = useState(false);
  const content = useRef(null);

  const toggleVisibility = () => {
    setHeight(visible ? "0px" : `${content.current.scrollHeight}px`);
    setVisible((prev) => {
      return !prev;
    });
  };

  const postElems = posts.map((post, index) => {
    return (
      <Link
        key={index}
        href={{
          pathname: `/encyclopedia/${post.title}`,
        }}
      >
        <p>{post.title} </p>
      </Link>
    );
  });
  return (
    <Cont style={{ backgroundColor: visible ? "white" : "" }} colors={COLORS}>
      <div className="cont" onClick={toggleVisibility}>
        <h4 className="text-shadow">{alphabet}</h4>
        <div className="flex-center">
          <h6 style={{ marginRight: "16px" }} className="contrast">
            {posts.length}
          </h6>
          <FontAwesomeIcon
            style={{ transform: visible ? "rotate(180deg)" : "" }}
            icon={faChevronDown}
            className="icon-blue icon-sm icon-"
          />
        </div>
      </div>
      <div ref={content} style={{ height: height }} className="posts">
        {postElems}
      </div>
    </Cont>
  );
};

export default AlphaLine;
