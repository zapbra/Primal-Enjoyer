import styled from "styled-components";
import COLORS from "../../../../data/colors";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";

const Instructions = ({instructions}) => {
    return (
        <div className='mb-4'>
            <h5 className="mb-4 font-bold">Instructions</h5>

            <div className="ml-8">{instructions}</div>
        </div>
    );
};

export default Instructions;
