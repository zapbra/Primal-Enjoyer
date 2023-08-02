import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const Cont = styled.div`
  .circle {
    position: relative;
  }
  .text-box-spec {
    background: #fff;
    border: 1px solid ${(props) => props.colors.black};
    padding: 2px 4px;
    display: inline-block;
    margin-left: 16px;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
  .copy-elem {
    .share-popup {
      left: 50%;
      transform: translateX(-50%);
      top: -200%;
    }
    &:hover {
      .share-popup {
        display: flex;
      }
    }
  }
`;

const ImgurUpload = ({ setText }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const uploadRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(image);
    document.querySelector(".share-text").classList.add("scale-pop");
    document.querySelector(".share-icon").classList.add("scale-pop");
    setTimeout(() => {
      document.querySelector(".share-text").classList.remove("scale-pop");
      document.querySelector(".share-icon").classList.remove("scale-pop");
    }, 500);
  };

  const uploadImage = async (e) => {
    setLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("https://api.imgur.com/3/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_ID}`,
      },
    });
    const res = await response.json();

    if (res.status == 200) {
      setImage(`![${image.name}](${res.data.link})`);
      setText((prev) => {
        return prev + ` \n \n ![${image.name}](${res.data.link})`;
      });
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
    setLoading(false);
  };

  return (
    <Cont colors={COLORS} className="mar-bottom-32">
      {!loading ? (
        <div className="circle" onClick={() => uploadRef.current.click()}>
          <h5 className="green text-shadow mar-right-8">Upload Image</h5>
          <FontAwesomeIcon icon={faUpload} className="icon-ssm green" />
        </div>
      ) : (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div
        className="relative inline copy-elem"
        onMouseLeave={() => setCopied(false)}
      >
        <div onClick={copyLink} className="text-box-spec">
          <p>{image}</p>
        </div>
        <div className="share-popup flex flex-center">
          <FontAwesomeIcon
            icon={faCopy}
            className="icon-sm mar-right-8 share-icon"
          />
          <p className="bold black share-text">{copied ? "Copied" : "Copy"}</p>
        </div>
      </div>
      <input type="file" hidden ref={uploadRef} onChange={uploadImage} />
    </Cont>
  );
};

export default ImgurUpload;
