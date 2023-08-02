import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { fetchDaysDiff } from "../../utils/Functions";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Slideshow from "./Slideshow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenusMars,
  faChildReaching,
  faCalendar,
  faCalendarDays,
  faPencil,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import EditForm from "./EditForm";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  .black-circle {
    background-color: ${(props) => props.colors.black};
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .header {
    padding: 8px 16px;
    border-bottom: 1px solid ${(props) => props.colors.grey};
    margin-bottom: 32px;
    background: rgb(15, 82, 186);
    background: radial-gradient(
      circle,
      rgba(15, 82, 186, 1) 0%,
      rgba(0, 43, 103, 1) 0%,
      rgba(15, 82, 186, 1) 100%
    );
  }
  .content {
    padding: 0px 16px 16px;
    max-height: 600px;
    overflow-y: auto;
  }
  .edit-icon {
    background-color: ${(props) => props.colors.black};
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #52575f;
    }
    &:active {
      border: 2px solid ${(props) => props.colors.white};
    }
  }
`;

const Testimonial = ({
  title,
  name,
  age,
  created_at,
  gender,
  start_date,
  content,
  photos,
  user,
  user_id,
  testimonial_id,
}) => {
  const genderDict = {
    male: "M",
    female: "F",
  };

  const [isUser, setIsUser] = useState(user?.id == user_id && user_id != null);
  const [editing, setEditing] = useState(false);
  console.log(photos);
  useEffect(() => {
    setIsUser(user?.id == user_id && user_id != null);
  }, [user]);

  return (
    <Cont colors={COLORS} className="opacity-anim ">
      {editing && (
        <EditForm
          testimonial_id={testimonial_id}
          setEditing={setEditing}
          title={title}
          name={name}
          age={age}
          gender={gender}
          start_date={start_date}
          content={content}
          photos_fetch={photos}
          user_id={user_id}
        />
      )}
      <div className=" header">
        <div className="flex space-between align-center">
          <h3 className="white text-shadow mar-bottom-8">{title}</h3>
          {isUser && (
            <>
              {!editing ? (
                <div
                  className="edit-icon box-shadow cursor"
                  onClick={() => setEditing(true)}
                >
                  <FontAwesomeIcon icon={faPencil} className="icon-ssm white" />
                </div>
              ) : (
                <div
                  className="edit-icon box-shadow cursor"
                  onClick={() => setEditing(false)}
                >
                  <FontAwesomeIcon icon={faX} className="icon-ssm white" />
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-wrap align-center">
          <p className=" light-grey mar-right-8">{name} |</p>
          <p className="light-grey mar-right-8">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="light-grey icon-ssm mar-right-4"
            />{" "}
            {fetchDaysDiff(created_at)} |
          </p>
          <p className="light-grey mar-right-8">
            {" "}
            <FontAwesomeIcon
              icon={faVenusMars}
              className="light-grey icon-ssm mar-right-4"
            />{" "}
            {genderDict[gender]} |
          </p>
          <p className="mar-right-8 light-grey">
            {" "}
            <FontAwesomeIcon
              icon={faChildReaching}
              className="light-grey icon-ssm mar-right-4"
            />{" "}
            {age} |
          </p>
          <p className="light-grey">{fetchDaysDiff(start_date)} on diet</p>
        </div>
      </div>
      <div className="content small-scrollbar">
        <ReactMarkdown className="markdown">{content}</ReactMarkdown>
      </div>
      <Slideshow photos={photos} />
    </Cont>
  );
};

export default Testimonial;
