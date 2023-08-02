import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
import Link from "next/link";

const Cont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 16px;
  background-color: #fff;
  padding: 8px;
  border-bottom: 1px solid ${(props) => props.colors.black};
  animation-name: blueToWhite;
  animation-duration: 2s;
  &:hover {
    background-color: ${(props) => props.colors.lightGrey};
  }
  p {
    cursor: pointer;
  }
  .flex {
    justify-content: space-between;
  }
  .text-flex {
    flex-basis: 50%;
  }
  & > div {
    flex: 1;
  }
  .close {
    cursor: pointer;
  }
`;

const ArticleLink = ({ title, id, removeFromCollectionFunctional }) => {
  return (
    <Cont colors={COLORS} className="box-shadow">
      <Link
        href={{
          pathname: `/article/${title}`,
        }}
      >
        <div className="flex text-flex">
          <p className="small">{title.replace(/%20/g, " ")}</p>
        </div>
      </Link>
      <div className="flex-right close">
        <FontAwesomeIcon
          onClick={() => removeFromCollectionFunctional(id, title)}
          icon={faClose}
          className="delete-btn icon-sm"
        />
      </div>
    </Cont>
  );
};

export default ArticleLink;
