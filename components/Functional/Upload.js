import styled from "styled-components";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";

const Cont = styled.div`
  img {
    max-height: 300px;
  }
  input {
    display: none;
  }
  .upload-btn {
    background: #fff;
    padding: 8px;
    border: 1px solid ${(props) => props.colors.grey};
    cursor: pointer;

    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    &:hover {
      background: rgb(0, 43, 103);
      background: linear-gradient(
        180deg,
        ${(props) => props.colors.ultraLightBlue} 0%,
        #fff 51%,
        ${(props) => props.colors.ultraLightBlue} 100%
      );
      p {
        text-decoration: underline;
      }
    }
  }
`;

const Upload = ({ image, updateImage }) => {
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const inputRef = useRef(null);

  const uploadToClient = async (event) => {
    /*
    if (image !== null) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "my-uploads");

      const secure_url = await fetch(
        "https://api.cloudinary.com/v1_1/dg7qdaefw/image/destroy",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((r) => r.json())
        .then((res) => {
          return res;
        });
      //if (error) throw error;
      console.log(secure_url);
    } */
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      updateImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  return (
    <Cont colors={COLORS} className="mar-bottom-one">
      <img src={createObjectURL || image} />
      <h3 className="light">Post Image</h3>
      <input
        ref={inputRef}
        type="file"
        name="myImage"
        onChange={uploadToClient}
      />
      <div
        onClick={() => inputRef.current.click()}
        className="flex justify-center upload-btn"
      >
        <FontAwesomeIcon
          icon={faUpload}
          className="icon-ssm green mar-right-8"
        />
        <p className="bold">Upload</p>
      </div>
    </Cont>
  );
};

export default Upload;
