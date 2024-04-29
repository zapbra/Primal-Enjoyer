import {useState, useRef} from "react";

const Upload = ({image, updateImage}) => {
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const inputRef = useRef(null);

    const uploadToClient = async (event) => {

        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            updateImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    return (
        <div className="mar-bottom-one">
            <img src={createObjectURL || image}/>
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
                {/*<FontAwesomeIcon*/}
                {/*  icon={faUpload}*/}
                {/*  className="icon-ssm green mar-right-8"*/}
                {/*/>*/}
                <p className="bold">Upload</p>
            </div>
        </div>
    );
};

export default Upload;
