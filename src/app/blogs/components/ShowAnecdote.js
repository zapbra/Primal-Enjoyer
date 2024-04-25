import { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { XIcon } from "@heroicons/react/solid";
import COLORS from "../../../../data/colors";
import NoLinkSubmit from "../../../../components/Buttons/NoLinkSubmit";
import Delete from "../../../../components/Buttons/Delete";
import EditBtn from "../../../../components/Buttons/EditBtn";
import { fetchUserById } from "../../../../utils/supabaseFunction";

const Cont = styled.div`
  position: fixed;
  background: #fff;
  width: 50%;
  height: 75%;
  background: #fff;
  left: 25%;
  z-index: 2;
  top: 10%;
  .button-cont {
    position: absolute;
    bottom: 16px;
    width: calc(100% - 32px);
    @media only screen and (max-width: 460px) {
      flex-direction: column-reverse;
      .buttons {
        margin-bottom: 32px;
      }
    }
    @media only screen and (max-width: 250px) {
      p {
        font-size: 12px;
      }
      .btn-spec {
        padding: 4px;
      }
    }
  }
  .flex-start {
  }
  @media only screen and (max-width: 900px) {
    width: 75%;
    left: 12.5%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    left: 0;
    height: calc(100% - 70px);
    top: 70px;
  }
  .text-edit-icon {
    padding: 4px;
    background: ${(props) => props.colors.green};
    cursor: pointer;
    -webkit-box-shadow: -5px 7px 0px 3px #002b67;
    box-shadow: -5px 7px 0px 3px #002b67;
    &:active {
      box-shadow: none;
      right: 21px;
      bottom: 11px;
    }
  }
  .input-title {
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    border-radius: 0;
    width: 100%;
    font-size: 1.953rem;
    font-weight: bold;
    color: ${(props) => props.colors.darkBlue};
    background: #fff;
  }

  form {
    max-width: 100% !important;
  }
  .input-content {
    background: #fff;
    border: 1px solid ${(props) => props.colors.grey};
    width: 100%;
    &:focus {
      border: 1px solid ${(props) => props.colors.black};
    }
  }
  .hero-icon-med {
    position: relative;

    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.colors.grey};
    }
    &:active {
      background-color: ${(props) => props.colors.offGrey};
    }
  }
  h3 {
    padding-bottom: 8px;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  }
`;
const ShowAnecdote = ({
  title,
  content,
  hidePopup,
  userId,
  anecdoteId,
  anecdoteRealId,
  date,
  updateAnecdoteAndFetch,
  showDeletePopup,
  name,
}) => {
  const [editState, setEditState] = useState(false);
  const [origPoster, setOrigPoster] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("title", title);
    setValue("content", content);

    if (userId === anecdoteId) {
      setOrigPoster(true);
    }
  }, []);

  const toggleState = () => {
    setEditState((prev) => {
      return !prev;
    });
  };
  useEffect(() => {
    if (editState === true) {
      document.querySelector("input").focus();
    }
  }, [editState]);
  const onSubmit = handleSubmit(async (formData) => {
    if (origPoster) {
      updateAnecdoteAndFetch(
        formData.title,
        formData.content,
        userId,
        anecdoteRealId
      );
      hidePopup();
    }
  });

  const options = { year: "numeric", month: "long", day: "numeric" };
  useEffect(() => {
    if (anecdoteId != undefined) {
      fetchUserById(anecdoteId).then((res) => {
        setRole(res[0].role);
        setUsername(res[0].username);
      });
    } else {
      setUsername(name);
      if (userId != undefined) {
        fetchUserById(userId).then((res) => {
          setRole(res[0].role);
        });
      }
    }
  }, []);

  return (
    <Cont colors={COLORS} className="shallow-cont box-shadow">
      {editState ? (
        <form onSubmit={onSubmit}>
          <XIcon
            style={{ marginLeft: "calc(100% - 40px)" }}
            onClick={hidePopup}
            className="hero-icon-med"
          />

          <div>
            <div className="center-inline mar-bottom-16">
              <input
                {...register("title", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z0-9 -:\[\]'";:,(){}]*$/,
                    message:
                      "Cannot contain !@#$%^&*/? and must start with letter",
                  },
                  minLength: 3,
                  maxLength: 40,
                })}
                type="text"
                placeholder={title}
                name="title"
                className="input-title"
              />
            </div>
            <textarea
              {...register("content", {
                required: true,
                minLength: 3,
              })}
              type="text"
              placeholder={content}
              name="content"
              className="input-content"
            />
          </div>

          <div className="flex button-cont align-center space-between">
            <div className="submit">
              <NoLinkSubmit text="Submit" />
            </div>
            <div className="flex align-center">
              <div
                className="mar-right-8"
                onClick={toggleState}
                data-field="cancel"
              >
                <EditBtn text="Preview" />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="flex align-center space-between">
            <div style={{ textAlign: "left" }}>
              <p className="green  bold">u/{username}</p>
              <p className="grey">
                {new Date(date).toLocaleDateString(undefined, options)}
              </p>
            </div>
            <XIcon onClick={hidePopup} className="hero-icon-med" />
          </div>
          <div>
            <div className="center-inline mar-bottom-16">
              <h3>{getValues("title") || title}</h3>
            </div>
            <p>{getValues("content") || content}</p>
          </div>
          {origPoster && (
            <div className="flex button-cont align-center space-between">
              <div className="submit" onClick={onSubmit}>
                <NoLinkSubmit text="Submit" />
              </div>
              <div className="buttons flex align-center">
                <div
                  className="mar-right-8"
                  onClick={toggleState}
                  data-field="cancel"
                >
                  <EditBtn text="Edit" />
                </div>
                <div onClick={() => showDeletePopup(anecdoteRealId, userId)}>
                  <Delete />
                </div>
              </div>
            </div>
          )}

          {!origPoster && role == "admin" && (
            <div className="flex button-cont align-center space-between">
              <div className="submit" onClick={onSubmit}>
                <NoLinkSubmit text="Submit" />
              </div>
              <div className="buttons flex align-center">
                <div
                  className="mar-right-8"
                  onClick={toggleState}
                  data-field="cancel"
                >
                  <EditBtn text="Edit" />
                </div>
                <div onClick={() => showDeletePopup(anecdoteRealId, userId)}>
                  <Delete />
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {Object.keys(errors).length > 0 && (
        <div className="form-errors">
          {errors.title?.type === "required" && <p> Title is required</p>}
          {errors.title?.type === "pattern" && <p> {errors.title.message}</p>}
        </div>
      )}
    </Cont>
  );
};

export default ShowAnecdote;
