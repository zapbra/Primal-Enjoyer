import styled from "styled-components";
import COLORS from "../../data/colors";
import Link from "next/link";
import {
  EyeIcon,
  HeartIcon,
  ChatIcon,
  ArrowRightIcon,
  PencilIcon,
} from "@heroicons/react/solid";

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  &:hover {
    /*
    background-color: ${(props) => props.colors.darkBlue};
    .icon-blue,
    p {
      color: ${(props) => props.colors.ultraLightBlue};
    }*/
    background-color: #fff;
  }
  .flex-column {
    align-items: flex-start;
  }
`;

const Post = ({ id, title, link, views, likes, comments }) => {
  return (
    <Link
      href={{
        pathname: `/editPost/${title}`,
        query: {
          id: id,
        },
      }}
    >
      <Cont className="post-class" colors={COLORS}>
        <div className="flex flex-column">
          <p className="bold dark-blue">{title}</p>
        </div>
        <PencilIcon className="icon-blue hero-icon-sm arrow" />
      </Cont>
    </Link>
  );
};

export default Post;
