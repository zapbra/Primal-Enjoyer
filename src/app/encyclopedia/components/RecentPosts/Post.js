import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../../../../data/colors";
import { fetchDaysDiff } from "../../../../../utils/Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnUp, faHeart } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  margin-bottom: 32px;
  border: 1px solid ${(props) => props.colors.darkBlue};
  padding: 16px;
  max-width: 800px;
  width: 100%;
  cursor: pointer;
  transition: box-shadow 0.25s ease;
  &:hover {
    box-shadow: none;
    background-color: ${(props) => props.colors.veryLightBlue};
    .post-content {
      background-color: #fff;
    }
  }
  .post-content {
    word-wrap: break-word;
    max-height: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 16px;
    border-top: 1px solid ${(props) => props.colors.darkBlue};
    background-color: ${(props) => props.colors.veryLightBlue};
  }
  .image-cont {
    width: 100%;
    height: 200px;
    position: relative;
  }
  .likes-cont {
    border: 1px solid ${(props) => props.colors.darkBlue};
    padding: 4px 8px;
    justify-self: flex-end;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    align-items: center;
  }
`;

const Post = ({
  title,
  created_at,
  introduction,
  postLikes,
  url,
  username,
}) => {
  return (
    <Cont className="box-shadow-2" colors={COLORS}>
      <Link href={{ pathname: `/encyclopedia/${title}` }}>
        <div className="flex flex-center flex-column">
          <h4>{title}</h4>
          <div className="mar-bottom-8">
            <h6 className="contrast light inline-block mar-right-4">
              {fetchDaysDiff(created_at)}
            </h6>
            <h6 className="green inline-block">u/{username}</h6>
          </div>
        </div>

        <div className="mar-bottom-16"></div>
        {url.length > 0 && (
          <div className="image-cont mar-bottom-16">
            <Image
              src={url[0]?.text}
              size="100%"
              style={{ objectFit: "contain" }}
              fill
            />
          </div>
        )}
        <div className="post-content bold mar-bottom-16 ">
          {" "}
          <p>{introduction}</p>
        </div>
        <div className="flex-end flex mar-right-8 ">
          <FontAwesomeIcon
            icon={faTurnUp}
            style={{ transform: "rotate(90deg)" }}
            className="icon-lg icon-blue "
          />
        </div>
      </Link>
    </Cont>
  );
};

export default Post;
