import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 8px 16px;
  border-bottom: 1px solid ${(props) => props.colors.darkGrey};
  &:last-of-type {
    border-bottom: none;
  }
  .flex-left {
    & > div,
    & > p,
    & > h5 {
      margin-right: 32px;
      flex: 1;
      display: flex;
      align-items: flex-end;
    }
    @media only screen and (max-width: 660px) {
      & > div,
      & > p,
      & > h5 {
        margin-right: 16px;
      }
    }
  }
  @media only screen and (max-width: 400px) {
    flex-direction: column;
    .flex-left {
      flex-wrap: wrap;
      justify-content: space-between;
      & > div,
      & > p,
      & > h5 {
        margin-right: 8px;
        margin-bottom: 16px;
      }
    }
  }
  .image-holder {
    height: 80px;
    width: 50%;
    @media only screen and (max-width: 660px) {
      width: 100%;
    }
  }

  .percent {
    border: 1px solid ${(props) => props.colors.grey};
    background-color: ${(props) => props.colors.ultraLightBlue};
    padding: 4px 8px;
  }
`;

const Line = ({ index, name, url, upvotes, downvotes }) => {
  const [ratio, setRatio] = useState(
    Math.ceil((upvotes / (upvotes + downvotes)) * 100)
  );

  useEffect(() => {
    setRatio(Math.ceil((upvotes / (upvotes + downvotes)) * 100));
  }, [upvotes, downvotes]);
  useEffect(() => {
    if (isNaN(ratio)) {
      setRatio("0");
    }
  }, [ratio]);
  return (
    <Cont colors={COLORS}>
      <div className="flex-one flex flex-left flex-start align-center">
        <p>#{index}</p>
        <h5 className="black">{name}</h5>

        <div className="percent">
          <h5>{ratio}%</h5>
        </div>
        <div className="flex flex-column">
          <div className="mar-bottom-4 mar-top-4 flex align-center space-between">
            <FontAwesomeIcon
              icon={faArrowUp}
              className="mar-right-4 icon-sssm grey"
            />
            <p className="small grey">{upvotes}</p>
          </div>
          <div className="mar-bottom-4 mar-top-4 grey-line"></div>
          <div className="mar-bottom-4 mar-top-4 flex align-center space-between">
            <FontAwesomeIcon
              icon={faArrowDown}
              className="mar-right-4 icon-sssm grey"
            />
            <p className="small grey">{downvotes}</p>
          </div>
        </div>
      </div>
      <div className="flex-one flex flex-end">
        <div className="image-holder relative">
          <Image src={url} priority layout="fill" objectFit="cover" />
        </div>
      </div>
    </Cont>
  );
};

export default Line;
