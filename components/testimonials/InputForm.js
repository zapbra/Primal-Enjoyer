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
} from "../../utils/supabaseFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import supabase from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import ImgurUpload from "../Misc/ImgurUpload";

const Cont = styled.form`
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
`;

const InputForm = () => {
  const [testimonial, setTestimonial] = useState("");
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session != null) {
        setUser(data?.session?.user);
      }
    };
    checkUser();
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

  const uploadImages = async () => {
    const imageUploads = [];
    for (let i = 0; i < photos.length; i++) {
      let formData = new FormData();
      formData.append("image", photos[i].file);
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
        console.log(res);
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
    const imageUploads = await uploadImages();
    setLoading((loading) => {
      return {
        msg: `uploading testimonial`,
        state: true,
      };
    });
    if (user == null) {
      const res = await createTestimonial(
        testimonial,
        formData.title,
        formData.name,
        formData.date == "" ? null : formData.date,
        formData.gender == "Select gender" ? null : formData.gender,
        formData.age == "" ? null : formData.age,
        imageUploads
      );
    } else {
      const res = await createUserTestimonial(
        testimonial,
        formData.title,
        formData.name,
        formData.date == "" ? null : formData.date,
        formData.gender == "Select gender" ? null : formData.gender,
        formData.age == "" ? null : formData.age,
        user.id,
        imageUploads
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
  return (
    <Cont colors={COLORS} onSubmit={submitForm}>
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
            When you started the diet <span className="light">(optional)</span>
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
        <PhotoSection photos={photos} setPhotos={setPhotos} />
      </div>

      <div className="input-line">
        <h5 className="black">Testimonial *</h5>
        <Editor section={testimonial} />
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
          <h4 className="mar-right-8">Create!</h4>
          <FontAwesomeIcon icon={faPaperPlane} className="white icon-sm " />
        </button>
      </div>
    </Cont>
  );
};

export default InputForm;
