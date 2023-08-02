import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import COLORS from "../../data/colors";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Editor from "../Editor";
import PhotoSection from "./PhotoSection";

import {
  createTestimonial,
  createUserTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "../../utils/supabaseFunction";
import DeletePopup from "../Buttons/DeletePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPenToSquare,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import supabase from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import ImgurUpload from "../Misc/ImgurUpload";

const Cont = styled.div`
  form {
    max-width: 1000px;
  }
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid ${(props) => props.colors.ultraLightGrey};
  padding: 32px;
  .loading-screen {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
  }
  @media only screen and (max-width: 600px) {
    padding: 16px;
  }
  @media only screen and (max-width: 400px) {
    padding: 8px;
  }
  .input-line {
    margin-bottom: 32px;
  }
  input {
    max-width: 400px;
    width: 100%;
  }
  .input-small {
    max-width: 200px;
  }
  input[type="date"] {
    max-width: auto;
    width: auto;
  }
  h5 {
    margin-bottom: 8px;
  }
  .gradient-blue-btn {
    @media only screen and (max-width: 250px) {
      padding: 8px 16px;
    }
  }
  .rem {
    h5 {
      margin-bottom: 0;
    }
  }
  button.selected {
    padding: 8px;
  }
  .edit-icon {
    width: auto !important;
    height: auto !important;
    border-radius: 16px !important;
    padding: 8px 16px;
    border: 2px solid transparent;
    h5 {
      margin-bottom: 0;
    }
  }
`;

const EditForm = ({
  setEditing,
  title,
  name,
  age,
  gender,
  start_date,
  content,
  photos_fetch,
  user_id,
  testimonial_id,
}) => {
  const router = useRouter();
  const [testimonial, setTestimonial] = useState(content);
  const [photos, setPhotos] = useState(
    photos_fetch.map((photo) => {
      return { url: photo };
    })
  );
  const [newPhotos, setNewPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session != null) {
        setUser(data?.session?.user);
      }
    };
    checkUser();
    setValue("title", title);
    setValue("name", name);
    setValue("age", age);
    setValue("gender", gender);
    const date = new Date(start_date);

    const dateFormat = `${date.getFullYear()}-${
      parseInt(date.getMonth()) + 1 < 10
        ? "0" + String(parseInt(date.getMonth()) + 1)
        : String(parseInt(date.getMonth()) + 1)
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;

    setValue("date", dateFormat);
  }, []);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm();

  const clearForm = () => {
    setValue("title", "");
    setValue("name", "");
    setValue("age", "");
    setValue("gender", "Select gender");
    setValue("date", "");
    setTestimonial("");
    setPhotos([]);
  };

  const [deleting, setDeleting] = useState(false);

  const uploadImages = async () => {
    const imageUploads = [];

    for (let i = 0; i < newPhotos.length; i++) {
      let formData = new FormData();
      formData.append("image", newPhotos[i].file);
      try {
        setLoading((loading) => {
          return {
            msg: `uploading image ${i + 1}`,
            state: true,
          };
        });
        const response = await fetch("https://api.imgur.com/3/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
          },
        });
        const res = await response.json();

        if (res.status == 200) {
          imageUploads.push(res.data.link);

          if (uploadState != true) {
            toast.error(`Error uploading image ${i + 1}`);
          }
        } else {
          toast("Error uploading image", {
            duration: 4000,
            position: "top-center",

            // Styling
            style: { border: "1px solid #E52323" },
            className: "",

            // Custom Icon
            icon: "⚠️",

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
        }
      } catch (err) {
        console.log(err.message);
        setLoading((loading) => {
          return {
            msg: ``,
            state: false,
          };
        });
      }
    }

    return imageUploads;
  };

  const submitForm = handleSubmit(async (formData) => {
    if (testimonial == "") {
      toast.error("Please add some text...");
      return;
    }
    setLoading((loading) => {
      return {
        ...loading,
        state: true,
      };
    });
    let imageUploads;
    let resX = await filterPhotos();
    if (resX) {
      imageUploads = await uploadImages();
    }

    setLoading((loading) => {
      return {
        msg: `updating testimonial`,
        state: true,
      };
    });
    const photoCopies = photos.filter((photo) => {
      if (photo.file == undefined) {
        return true;
      } else {
        return !newPhotos.some(
          (newPhoto) => newPhoto.file.name == photo.file.name
        );
      }
    });
    const actualUploads = [
      ...imageUploads,
      ...photoCopies.map((photo) => photo.url),
    ];
    if (user == null) {
      const res = await createTestimonial(
        testimonial,
        formData.title,
        formData.name,
        formData.date == "" ? null : formData.date,
        formData.gender == "Select gender" ? null : formData.gender,
        formData.age == "" ? null : formData.age,
        actualUploads
      );
    } else {
      const res = await updateTestimonial(
        testimonial,
        formData.title,
        formData.name,
        formData.date == "" ? null : formData.date,
        formData.gender == "Select gender" ? null : formData.gender,
        formData.age == "" ? null : formData.age,
        actualUploads,
        testimonial_id
      );
    }
    clearForm();
    toast("Successfully uploaded testimonial", {
      duration: 4000,
      position: "top-center",

      // Styling
      style: { border: "1px solid green" },
      className: "",

      // Custom Icon
      icon: "✅",

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
    setLoading((loading) => {
      return {
        msg: ``,
        state: false,
      };
    });
    setTimeout(() => {
      router.reload();
    }, 500);
  });

  const [loading, setLoading] = useState({
    state: false,
    msg: "...",
  });

  const deleteTestimonialFunc = () => {
    const res = deleteTestimonial(testimonial_id);
    toast.promise(res, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error deleting",
    });
    toast("Reloading...", {
      duration: 1500,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "🔄",

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
    setTimeout(() => {
      router.reload();
    }, 500);
  };

  const filterPhotos = async () => {
    setPhotos((prevPhotos) => {
      return prevPhotos.filter((photo) => {
        if (photo.file == undefined) {
          return true;
        } else {
          return !newPhotos.some(
            (newPhoto) => newPhoto.file.name == photo.file.name
          );
        }
      });
    });
    return true;
  };
  return (
    <Cont colors={COLORS}>
      {deleting && (
        <DeletePopup
          cancelFunction={() => setDeleting(false)}
          deleteFunction={deleteTestimonialFunc}
        />
      )}
      <form onSubmit={submitForm}>
        {loading.state && (
          <>
            <div className="msg-box flex flex-column align-center box-shadow-2">
              <div className="lds-ring mar-bottom-8">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p>{loading.msg}</p>
            </div>
            <div className="loading-screen"></div>
          </>
        )}

        <div className="flex flex-end align-center flex-wrap">
          <div
            className="red-bg-btn flex align-center  cursor mar-bottom-8"
            onClick={() => setDeleting(true)}
          >
            <h5 className="mar-right-8">Delete</h5>
            <FontAwesomeIcon icon={faTrash} className="icon-ssm white" />
          </div>
          <div
            className="edit-icon box-shadow cursor mar-left-16 mar-bottom-8"
            onClick={() => setEditing(false)}
          >
            <h5 className="white mar-right-8">Close</h5>
            <FontAwesomeIcon icon={faX} className="icon-ssm white" />
          </div>
        </div>
        <div className="input-line">
          <label htmlFor="title">
            <h5 className="black">Title *</h5>
          </label>
          <input
            {...register("title", {
              required: true,
            })}
            name="title"
            placeholder="Raw primal cured my depression..."
            type="text"
          />
          {errors.title?.type === "required" && (
            <p className="red mar-top-8">*Title is required</p>
          )}
        </div>

        <div className="input-line">
          <label htmlFor="name">
            <h5 className="black">
              Name/contact <span className="light">(optional)</span>
            </h5>
          </label>
          <input
            {...register("name", {
              required: false,
            })}
            placeholder="name"
            name="name"
            type="text"
          />
        </div>

        <div className="input-line">
          <label htmlFor="date">
            <h5 className="black">
              When you started the diet{" "}
              <span className="light">(optional)</span>
            </h5>
          </label>
          <input
            name="date"
            type="date"
            {...register("date", {
              required: false,
            })}
          />
        </div>

        <div className="input-line">
          <label htmlFor="age">
            <h5 className="black">
              Age <span className="light">(optional)</span>
            </h5>
          </label>
          <input
            type="number"
            className="input-small"
            {...register("age", {
              required: false,
              maxLength: 3,
            })}
          />
          {errors.name?.type === "maxLength" && (
            <p className="red">*Age cannot extend past 3 characters</p>
          )}
        </div>

        <div className="input-line">
          <label htmlFor="">
            <h5 className="black">
              Gender <span className="light">(optional)</span>
            </h5>
          </label>
          <select
            {...register("gender", {
              required: false,
            })}
            defaultValue={"Select gender"}
          >
            <option name="gender"></option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value={null}>Select gender</option>
          </select>
        </div>

        <div className="input-line">
          <h5 className="black">
            Attach any photos <span className="light">(optional)</span>
          </h5>
          <p className="mar-bottom-8">
            At any point you can edit/delete these photos or delete the entire
            submission
          </p>
          <PhotoSection
            photos={photos}
            setPhotos={setPhotos}
            setNewPhotos={setNewPhotos}
          />
        </div>

        <div className="input-line">
          <h5 className="black">Testimonial *</h5>
          <Editor section={testimonial} updateSection={setTestimonial} />
          <div className="mar-bottom-16"></div>
          <div className="rem">
            <ImgurUpload setText={setTestimonial} />
          </div>
        </div>

        <div className="flex flex-end">
          <button
            className="gradient-blue-btn flex flex-wrap justify-center"
            type="submit"
          >
            <h4 className="mar-right-8">Update</h4>
            <FontAwesomeIcon icon={faPenToSquare} className="white icon-sm " />
          </button>
        </div>
      </form>
    </Cont>
  );
};

export default EditForm;
