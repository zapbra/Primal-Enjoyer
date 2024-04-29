import {useState} from "react";
import COLORS from "../../data/colors";
import TextParser from "./TextParser";
import {UpperCaseWhole} from "../../utils/Functions";


const Popup = ({children, text, link, title}) => {
    const [popupVisible, setPopupVisible] = useState(false);

    const showPopup = () => {
        setPopupVisible(true);
    };

    const hidePopup = () => {
        setPopupVisible(false);
    };
    return (
        <div>
            <div onMouseEnter={showPopup} onMouseLeave={hidePopup}>
                {children}
                <div
                    style={{
                        opacity: popupVisible ? 1 : 0,
                        display: popupVisible ? "block" : "none",
                    }}
                    className="popup-spec box-shadow-2 small-scrollbar"
                >
                    <h5 className="mar-bottom-4">{UpperCaseWhole(title)}</h5>
                    <div className="blue-line mar-bottom-8"></div>
                    <TextParser>{text != null ? text : ""}</TextParser>
                </div>
                {" "}
            </div>
        </div>
    );
};

export default Popup;
