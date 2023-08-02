import { useState, useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFile,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const Cont = styled.div`
  .preview-image {
    width: 100vw;

    z-index: 5;
    height: 100vh;

    position: fixed;
    left: 0;
    top: 0;
    .image-holder {
      position: relative;
      width: 100%;
      z-index: 2;
      height: 100%;
    }
  }
  .image-cont {
    width: 320px;
    height: 200px;
    margin-bottom: 16px;
    margin-right: 16px;
    @media only screen and (max-width: 400px) {
      margin-right: 0;
    }
    .icons-holder {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 1;
    }
    border: 1px solid transparent;
    transition: border 0.25s ease;
    &:hover {
      border: 1px solid ${(props) => props.colors.black};
      .eye {
        .icon-sm {
          color: ${(props) => props.colors.black} !important;
        }
      }
    }
  }
  .delete {
    position: relative;

    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    background-color: #fff;
    &:hover {
      background-color: ${(props) => props.colors.grey};
    }
    &:active {
      border: 1px solid ${(props) => props.colors.black};
    }
  }
  .eye {
    position: absolute;
    left: 8px;
    top: 8px;
    z-index: 1;
    .icon-sm {
      transition: color 0.25s ease;
    }
  }
  .preview-image {
    .delete {
      z-index: 1;
      width: 40px;
      height: 40px;
      right: 32px;
      top: 16px;
      position: absolute;
    }
  }
`;

const UploadCont = styled.div`
  margin-right: 16px;
  border: 1px dashed ${(props) => props.colors.ultraLightGrey};
  background-color: ${(props) => props.colors.ultraLightBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 320px;
  margin-bottom: 16px;
  cursor: pointer;
  @media only screen and (max-width: 400px) {
    margin-right: 0;
  }
  p {
    transition: margin 0.25s ease;
  }
  &:hover {
    p {
      text-decoration: underline;
      margin-top: 8px;
    }
  }
  &:active {
    border: 1px solid ${(props) => props.colors.green};
  }
  h5 {
    margin-bottom: 0 !important;
  }
  .gradient {
    width: 100%;
    height: 200px;
  }
  .icon-x {
    border-radius: 8px;
  }
`;

const UploadBtn = ({ uploadImage }) => {
  const fileRef = useRef(null);
  return (
    <UploadCont colors={COLORS} onClick={() => fileRef.current.click()}>
      {/* <div className="flex flex-column">
        <FontAwesomeIcon
          icon={faUpload}
          className="icon-med green mar-bottom-8"
        />
        <p className="green">Upload photo</p>
      </div> */}
      <div className="drop-holder" id="hover-section">
        <>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => uploadImage(e)}
            ref={fileRef}
            hidden
          />

          <div className=" input-section flex flex-column align-center justify-center text-center">
            <p className="light-blue-2 mar-right-8 mar-bottom-8">
              Click to upload
            </p>
            <div className="download-green">
              <h5 className="green">Upload</h5>
            </div>
          </div>
        </>
      </div>
    </UploadCont>
  );
};

const PhotoSection = ({ photos, setPhotos, newPhotos, setNewPhotos }) => {
  const [previewState, setPreviewState] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("/");

  const showPreview = (url) => {
    setPreviewState(true);
    setPreviewUrl(url);
  };

  const deleteImage = (e, index) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    setPhotos((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };
  const imageElems = photos.map((photo, index) => {
    return (
      <div
        key={index}
        className="image-cont relative cursor"
        onClick={() => showPreview(photo.url)}
      >
        <div className="eye">
          <FontAwesomeIcon icon={faEye} className="grey icon-sm" />
        </div>
        <div className="icons-holder flex ">
          <div className="delete" onClick={(e) => deleteImage(e, index)}>
            <FontAwesomeIcon icon={faX} className="black icon-sm" />
          </div>
        </div>
        <Image src={photo.url} style={{ objectFit: "cover" }} fill />
      </div>
    );
  });

  const uploadImage = async (e) => {
    if (photos.length + newPhotos.length >= 20) {
      toast("Maximum 20 images. Please delete one to upload more", {
        duration: 4000,
        position: "top-center",

        // Styling
        style: {
          border: "1px solid red",
          backgroundColor: `rgba(255, 0, 0,.5)`,
        },
        className: "",

        // Custom Icon
        icon: "🖼️",

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
      return;
    }
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    const file = e.target.files[0];

    setNewPhotos((prev) => {
      return [...prev, { file, url: URL.createObjectURL(file) }];
    });
  };

  return (
    <Cont colors={COLORS}>
      {previewState && (
        <div className="preview-image opacity-anim">
          <div className="image-holder">
            <div className="delete" onClick={() => setPreviewState(false)}>
              <FontAwesomeIcon icon={faX} className="black icon-sm" />
            </div>
            <Image src={previewUrl} fill style={{ objectFit: "contain" }} />
          </div>
          <div className="popup-screen"></div>
        </div>
      )}
      <div className="flex flex-wrap">
        <UploadBtn uploadImage={uploadImage} />
        {imageElems}
      </div>
    </Cont>
  );
};

export default PhotoSection;
