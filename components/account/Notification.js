import Link from "next/link";
import styled from "styled-components";
import {
  EyeIcon,
  HeartIcon,
  ChatIcon,
  ArrowRightIcon,
  XIcon,
} from "@heroicons/react/solid";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import COLORS from "../../data/colors";
import { fetchDaysDiff } from "../../utils/Functions";

const Cont = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  &:hover {
    background-color: #fff;
  }

  .select-spec {
    &:hover {
      p {
        text-decoration: underline;
      }
    }
  }
`;

const Notification = ({
  id,
  username,
  created_at,
  link,
  field,
  type,
  deleteNotificationFunctional,
  article,
  comment,
}) => {
  return (
    <Cont className="notification" colors={COLORS}>
      <XIcon
        onClick={() => deleteNotificationFunctional(id)}
        className="red hero-icon-sm mar-right-4 delete flex-no-shrink"
      />
      <Link passHref href={link}>
        <div className="flex select-spec">
          <FontAwesomeIcon
            icon={faHeart}
            className="icon-blue hero-icon-sm mar-right-4 "
          />
          <p className="mar-right-4">
            <span className="mar-right-8 contrast">
              {fetchDaysDiff(created_at)}
            </span>
            <span className="red">{username}</span> has {type} your {field}{" "}
            {comment !== null && (
              <span className="small blue">"{comment?.content}" </span>
            )}
            {article !== null && (
              <span className="small green">"{article?.title}"</span>
            )}
          </p>
          <ArrowRightIcon className="icon-blue hero-icon-sm flex-no-shrink" />
        </div>
      </Link>
    </Cont>
  );
};

export default Notification;
