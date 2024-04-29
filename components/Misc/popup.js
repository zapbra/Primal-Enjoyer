import {XIcon} from "@heroicons/react/solid";


const Popup = ({hidePopup}) => {
    return (
        <div colors={COLORS}>
            <h3 className="mar-bottom-16">Thanks For Siging Up!</h3>
            <p>Please check your email to verify your account.</p>
            <XIcon className="hero-icon-med" onClick={hidePopup}/>
        </div>
    );
};

export default Popup;
