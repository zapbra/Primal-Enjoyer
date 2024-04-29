import React from "react";
import {TiDelete} from "react-icons/ti";

const SearchTag = (props) => {
    return (
        <div id={props.id}
             className='inline-flex pl-4 pr-2 py-2 rounded-full shadow  items-center bg-white'>
            <p className='mr-2 text-slate-500'>{props.text}</p>
            <TiDelete
                className='text-3xl transition cursor-pointer text-slate-500 hover:text-black'
                onClick={() => props.removeTag(props.text)}
            />
        </div>
    );
};

export default SearchTag;
