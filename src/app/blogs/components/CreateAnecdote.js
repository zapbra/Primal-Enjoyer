import styled from "styled-components";
import { useForm } from "react-hook-form";
import { XIcon } from "@heroicons/react/solid";
import NoLinkSubmit from "../../../../components/Buttons/NoLinkSubmit";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  position: fixed;
  background: #fff;
  width: 75%;
  left: 12.5%;
  height: 75%;
  background: #fff;

  z-index: 2;
  top: 10%;
  input {
    max-width: 100%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    left: 0;
    height: calc(100% - 70px);
    top: 70px;
  }
  .text-edit-icon {
    position: absolute;
    bottom: 16px;
    right: 16px;
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
  .submit {
    position: absolute;
    bottom: 16px;
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
    margin-left: calc(100% - 40px);
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

const CreateAnecdote = ({
  post_id,
  user_id,
  toggleAnecdoteCreate,
  createAnecdoteFunctional,
  createGuestAnecdoteFunctional,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (user_id == undefined) {
      createGuestAnecdoteFunctional(
        formData.title,
        formData.content,
        post_id,
        formData.name
      );
    } else {
      createAnecdoteFunctional(
        formData.title,
        formData.content,
        post_id,
        user_id
      );
    }
  });

  return (
    <Cont colors={COLORS} className="shallow-cont box-shadow">
      <form onSubmit={onSubmit}>
        <XIcon onClick={toggleAnecdoteCreate} className="hero-icon-med" />
        <div>
          <div className=" mar-bottom-16">
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
              placeholder="Title"
              name="title"
              className="input-title"
            />

            <textarea
              {...register("content", {
                required: true,
                minLength: 3,
              })}
              type="text"
              placeholder="Content"
              name="content"
              className="input-content"
            />
            <div className="mar-bottom-16"></div>
            {user_id == undefined && (
              <input
                {...register("name", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9]{3,25}$/,
                    message:
                      "Min length 3. Max length 25 for name. Letters and numbers only.",
                  },
                })}
                type="text"
                placeholder="Name"
                name="name"
                className="input-name"
              />
            )}
          </div>
        </div>
        <div className="submit">
          <NoLinkSubmit text="Submit" />
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="form-errors">
          {errors.title?.type === "required" && <p> Title is required</p>}
          {errors.title?.type === "pattern" && <p> {errors.title.message}</p>}
          {errors.name?.type === "required" && <p> Name is required</p>}
          {errors.name && <p> {errors.name.message} </p>}
        </div>
      )}
    </Cont>
  );
};

export default CreateAnecdote;
