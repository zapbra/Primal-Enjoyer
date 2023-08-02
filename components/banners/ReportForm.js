import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import COLORS from "../../data/colors";

const Cont = styled.div`
  background: #fff;
  border: 1px solid ${(props) => props.colors.grey};
  position: fixed;
  width: 50%;
  left: 25%;
  top: 90px;
  animation-name: opacity;
  animation-duration: 0.25s;
  z-index: 5;
  border-radius: 16px;
  height: 80vh;
  overflow: auto;
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${(props) => props.colors.darkRed};
  }
  @media only screen and (max-width: 800px) {
    width: 75%;
    left: 12.5%;
  }
  @media only screen and (max-width: 440px) {
    width: 100%;
    left: 0;
  }
  @media only screen and (max-width: 250px) {
    .button-cont {
      flex-direction: column;
      .delete {
        margin-bottom: 16px;
      }
    }
  }

  .title-spec {
    background-color: ${(props) => props.colors.ultraLightBlue};
    border-radius: 16px 16px 0 0;
    padding: 16px;
    border-bottom: 2px solid ${(props) => props.colors.black};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    .delete-icon {
      justify-self: flex-end;
      border: 1px solid black;
      width: 64px;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: #fff;
      }
    }
  }
  .forms {
    padding: 16px;
  }
  textarea {
    resize: none;
    border-radius: 8px;
    width: 100%;
    outline: none;
    border: none;
    height: 160px;
    border: 1px solid transparent;
    &:focus {
      border: 1px solid ${(props) => props.colors.blue};
    }
  }

  .select-dropdown {
    border: 1px solid ${(props) => props.colors.black};
    border-radius: 8px;
    max-width: 360px;
    .selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: ${(props) => props.colors.ultraLightBlue};
      padding: 8px;
      border-radius: 8px;
      border-bottom: 1px solid black;
      cursor: pointer;
      p {
        color: ${(props) => props.colors.darkBlue};
      }
    }
    .line {
      padding: 8px;
      border-bottom: 1px solid black;
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.colors.veryLightBlue};
      }
      &:last-of-type {
        border: none;
        border-radius: 0px 0px 8px 8px;
      }
    }
  }
  .accordion-content {
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
  .chevron {
    transition: transform 0.2s ease;
  }
  .error-msg {
    position: relative;
    top: -16px;
  }
`;

const ReportForm = ({ hideReport }) => {
  const [contact, setContact] = useState("");
  const [submission, setSubmission] = useState("");
  const submissionRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [fields, setFields] = useState([
    { text: "Technical Bug/Error", selected: true },
    { text: "Suggest Improvement", selected: false },
    { text: "Other", selected: false },
  ]);
  const [selectedOption, setSelectedOption] = useState("Technical Bug/Error");
  const [loading, setLoading] = useState(false);
  const selectOption = (text) => {
    toggleAccordion();
    setFields((prev) => {
      return prev.map((field) => {
        field.text === text && setSelectedOption(text);
        return {
          ...field,
          selected: field.text === text ? true : false,
        };
      });
    });
  };
  const fieldElems = fields.map((field, index) => {
    return (
      !field.selected && (
        <div
          key={index}
          onClick={() => selectOption(field.text)}
          className="line"
        >
          <p>{field.text}</p>
        </div>
      )
    );
  });

  const accordion = useRef();

  const [visible, setVisible] = useState(true);
  const [height, setHeight] = useState("0px");
  const hello = "hello";
  const toggleAccordion = () => {
    setHeight(visible ? "0px" : `${accordion.current.scrollHeight}px`);
    setVisible((prev) => {
      return !prev;
    });
  };
  useEffect(() => {
    setHeight(`${accordion.current.scrollHeight}px`);
  }, []);

  const submitForm = () => {
    if (submission === "") {
      submissionRef.current.focus();
      document.getElementById("submission").classList.add("border-red");
      setErrorMsg("Cannot be blank");
      return;
    }
    document.getElementById("submission").classList.remove("border-red");
    setErrorMsg("");
    setLoading(true);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          contact: contact !== "" ? contact : "empty",
          submission,
          report_type: selectedOption,
          page_name: window.location.pathname,
        },
        process.env.NEXT_PUBLIC_EMAILJS_KEY
      )
      .then(
        (result) => {
          toast.success("Error report sent to admin");
          setContact("");
          setSubmission("");
          setSelectedOption("Technical Bug/Error");
          setLoading(false);
        },
        (error) => {
          toast.error("Error sending error report (lol)");
          setLoading(false);
        }
      );
  };

  return (
    <Cont className="box-shadow accordion-animation" colors={COLORS}>
      <div className="title-spec">
        <div></div>
        <h1 className="red">Report❗</h1>
        <div className="delete-icon" onClick={hideReport}>
          <FontAwesomeIcon
            onClick={hideReport}
            icon={faClose}
            className="red icon-xl"
          />
        </div>
      </div>
      <section className="forms">
        <h4 className="mar-bottom-16">Report Type</h4>
        <div className="select-dropdown mar-bottom-one">
          <div onClick={toggleAccordion} className="selected">
            <p className="bold">{selectedOption} </p>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="icon-ssm icon-blue chevron"
              style={{ transform: visible ? "rotate(180deg)" : "" }}
            />
          </div>
          <div
            className="accordion-content"
            ref={accordion}
            style={{ height: height }}
          >
            {fieldElems}
          </div>
        </div>
        <label htmlFor="name">
          <h4 className="mar-bottom-16">
            Contact <span className="light">(optional)</span>
          </h4>
          <input
            placeholder="Email/instagram, etc"
            type="text"
            name="name"
            id="name"
            className="mar-bottom-one"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>

        <label htmlFor="submission" className="mar-bottom-one">
          <h4 className="mar-bottom-16">Submission</h4>
          <textarea
            className="mar-bottom-one"
            placeholder="What is the issue?"
            name="submission"
            id="submission"
            cols="30"
            rows="5"
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            ref={submissionRef}
          ></textarea>
        </label>
        <p className="red error-msg">{errorMsg}</p>
        {!loading ? (
          <div className="red-btn" onClick={submitForm}>
            <h4 className="white">Submit</h4>
          </div>
        ) : (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        )}
      </section>
    </Cont>
  );
};

export default ReportForm;
