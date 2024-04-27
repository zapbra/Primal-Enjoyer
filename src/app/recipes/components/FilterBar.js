import {useState, useRef, use} from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const FilterBar = ({categories, setCategories, selectCategory}) => {
    const filterElems = categories.map((category, index) => {
        return (
            <div
                key={index}
                className={
                    category.selected
                        ? "flex items-center border rounded-xl border-slate-500 px-4 py-2 hover:bg-white hover:text-blue-950 shadow cursor-pointer bg-blue-950 text-slate-50 transition"
                        : "flex items-center border rounded-xl border-slate-500 px-4 py-2 bg-white cursor-pointer hover:bg-blue-950 hover:text-slate-50 transition"
                }
                onClick={() => selectCategory(category.name)}
            >
                <FontAwesomeIcon
                    icon={category.icon}
                    className="mr-2"
                />
                <p>{category.name}</p>
            </div>
        );
    });
    return (
        <div className='mb-8 max-w-2xl mx-auto'>
            <div className="flex-wrap flex gap-4 justify-center">{filterElems}</div>
        </div>
    );
};

export default FilterBar;
