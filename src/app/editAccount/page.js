"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnDown, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import supabase from "../../../utils/supabaseClient";
import { useForm } from "react-hook-form";
import COLORS from "../../../data/colors";
import DefaultBtn from "../../../components/Buttons/DefaultBtn";
import AntiDefaultBtn from "../../../components/Buttons/AntiDefaultBtn";

import {
  updateUserEmail,
  updateUserUsername,
  updateUserAvatar,
  deleteFile,
  uploadFile,
  checkUsernameUnique,
  checkEmailUnique,
} from "../../../utils/supabaseFunction";
import ReportForm from "../../../components/banners/ReportForm";
import { nanoid } from "nanoid";
const Cont = styled.div`
  min-height: 100vh;
  .fake-form {
    max-width: 800px;
  }
  input {
    width: 360px;
    margin-right: 16px;
    margin-bottom: 16px;
  }

  @media only screen and (max-width: 280px) {
    input {
      width: 100%;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-cont {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid ${(props) => props.colors.darkBlue};
    &:hover {
      opacity: 0.9;
    }
  }
  .dark-blue-btn {
    height: 48px;
    padding: 0 16px;
    margin-bottom: 32px;
  }
`;
const Editprofile = () => {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const inputRef = useRef();
  const [formErrors, setFormErrors] = useState({ email: "", username: "" });
  const [usernameDisplay, setUsernameDisplay] = useState(
    session?.user?.user_metadata.username
  );
  const [usernameBtn, setUsernameBtn] = useState(false);
  const [emailBtn, setEmailBtn] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [reportActive, setReportActive] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const fileRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const updateSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session != null) {
        setSession(session.session);
        setAvatarUrl(session?.session?.user?.user_metadata.avatar_url);
        setUsername(session?.session?.user.user_metadata.username);
        setEmail(session?.session?.user.email);
      }
    };
    updateSession();
  }, []);
  useEffect(() => {
    setUsernameDisplay(session?.user?.user_metadata.username);
  }, [session]);
  /*
  const updateAvatarUrl = async (url) => {
    const { error } = await supabase
      .from("users")
      .update({ avatar_url: url })
      .eq("id", session?.user?.id);
    if (error) {
      toast.error("Unable to update avatar");
    }
    toast.success("Avatar updated");
  };  */

  const uploadAvatar = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${session?.user?.email}.${nanoid()}`;

    deleteFile(avatarUrl).then((res) =>
      uploadFile(filePath, file).then((res) =>
        updateUserAvatar(filePath).then((res) => setAvatarUrl(filePath))
      )
    );

    setUploading(false);
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
    if (!usernameBtn) {
      setUsernameBtn(true);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    if (!emailBtn) {
      setEmailBtn(true);
    }
  };

  const submitUsername = () => {
    const finalSubmit = () => {
      setUsernameLoading(true);
      const validateUsername = (res) => {
        if (res) {
          toast.success("Username updated!");
          setUsernameDisplay(username);
        }
        setUsernameLoading(false);
      };
      updateUserUsername(username).then((res) => validateUsername(res));
      setFormErrors((prev) => {
        return {
          ...prev,
          username: "",
        };
      });
    };
    if (
      !/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
        username
      )
    ) {
      setFormErrors((prev) => {
        return {
          ...prev,
          username: "6-20 letters. Only letters, numbers or _.",
        };
      });
    } else {
      checkUsernameUnique(username).then((res) => res && finalSubmit());
    }
  };
  const submitEmail = () => {
    const notUniqueEmail = () => {
      setEmailLoading(false);
      toast.error("Email is already in use.");
      setTimeout(() => {
        toast("Send an error report if you believe this to be a mistake.", {
          duration: 4000,
          position: "top-center",

          // Styling
          style: {},
          className: "",

          // Custom Icon
          icon: "❗",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }, 2000);
    };
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      emailRef.current.focus();
      setFormErrors((prev) => {
        return {
          ...prev,
          email: "Invalid Email",
        };
      });
    } else {
      const validateEmail = (res) => {
        if (res) {
          toast(
            "Email updated! Please check your new email for verification.",
            {
              duration: 4000,
              position: "top-center",

              // Styling
              style: {},
              className: "",

              // Custom Icon
              icon: "👏",

              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },

              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            }
          );
        }
        setEmailLoading(false);
      };

      setEmailLoading(true);
      checkEmailUnique(email).then((res) =>
        res // run is email is unique
          ? updateUserEmail(email).then((res) => validateEmail(res))
          : // run if email is not unique
            notUniqueEmail()
      );

      setFormErrors((prev) => {
        return {
          ...prev,
          email: "",
        };
      });
    }
  };

  const hideReport = () => {
    setReportActive(false);
  };

  return (
    <Cont colors={COLORS} className="container">
      <Toaster />
      <Link
        href={{
          pathname: `/account`,
        }}
      >
        <div className="mar-bottom-one click-back lg-icon-circle">
          <FontAwesomeIcon
            style={{ transform: "rotate(90deg)" }}
            icon={faTurnDown}
            className="icon-blue icon-lg"
          />
        </div>
      </Link>
      <div className="center-inline  ssm-spacer">
        <h1 className="text-shadow text-wrap">Edit Profile</h1>
      </div>
      {session ? (
        <div className="fake-form" onSubmit={onSubmit}>
          <div
            style={{ height: "80px" }}
            className="flex align-center mar-bottom-one"
          >
            <div>
              <div
                onClick={() => fileRef.current.click()}
                className="image-cont mar-right-32"
              >
                {avatarUrl && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_AVATAR_BASE_URL}${avatarUrl}`}
                    objectFit="cover"
                    layout="fill"
                    size="100%"
                    alt="profile"
                  />
                )}
              </div>
            </div>
            <div>
              <h4 className="black">{usernameDisplay}</h4>
              <h5
                onClick={() => fileRef.current.click()}
                className="blue cursor"
              >
                Change profile picture
              </h5>
            </div>
            {uploading && (
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            )}
          </div>
          <input
            type="file"
            onChange={uploadAvatar}
            ref={fileRef}
            hidden={true}
          />
          <label>
            <h5 className="black mar-bottom-8">Username</h5>
            <input
              value={username}
              onChange={updateUsername}
              type="text"
              placeholder="Username"
              ref={inputRef}
              className={formErrors.username !== "" ? "border-red" : ""}
            />
            <p className="red">{formErrors.username}</p>
          </label>

          {usernameLoading ? (
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          ) : (
            <button onClick={submitUsername} className="dark-blue-btn">
              <h5>Update</h5>
            </button>
          )}

          <label>
            <h5 className="black mar-bottom-8">Email</h5>
            <p className="mar-bottom-16 contrast">
              To make sure you have access to this email address, we will send
              an email to this account with the confirmation link
            </p>
            <input
              value={email}
              onChange={updateEmail}
              type="text"
              placeholder="Email"
              ref={emailRef}
              className={formErrors.email !== "" ? "border-red" : ""}
            />
            <p className="red">{formErrors.email}</p>
          </label>
          {emailBtn &&
            (emailLoading ? (
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            ) : (
              <button onClick={submitEmail} className="dark-blue-btn">
                <h5>{emailLoading ? "Loading..." : "Update"}</h5>
              </button>
            ))}
        </div>
      ) : (
        <div className="center-inline">
          {" "}
          <h3 className="black light mar-bottom-one">
            Please login or create an account to view this page...
          </h3>
          <div className="shallow-cont ssm-spacer">
            <h3>Have an Account?</h3>
            <p className="mar-bottom-one">Login or sign up below</p>
            <div className="mar-bottom-16 sign-up">
              <Link href={{ pathname: "/signup" }} title="Sign up">
                <DefaultBtn text="Sign Up" />
              </Link>
            </div>
            <div>
              <Link href={{ pathname: "/login" }}>
                <AntiDefaultBtn text="Sign In" />
              </Link>
            </div>
          </div>
        </div>
      )}
      {reportActive && (
        <>
          <div className="popup-screen"></div>
          <ReportForm hideReport={hideReport} />{" "}
        </>
      )}
      <div
        onClick={() => setReportActive(true)}
        className="report-bottom-right flex  cursor"
      >
        <FontAwesomeIcon
          icon={faExclamation}
          className="icon-ssm red mar-right-4"
        />
        <p className="red underline-hover">report issue</p>
      </div>
    </Cont>
  );
};

export default Editprofile;
