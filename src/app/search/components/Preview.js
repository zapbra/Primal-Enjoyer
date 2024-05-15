import Link from "next/link";
import {useState} from "react";
import COLORS from "../../../../data/colors";


const Preview = ({title, index}) => {
    return (
        <div className="flex align-center">
            <p className="blue num">({index + 1})</p>
            <div className="cont box-shadow-2">
                <Link href={`/timecode/${title}`}>
                    <h4 className="">{title}</h4>
                </Link>
            </div>
        </div>
    );
};

export default Preview;
