import React from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";

const PageIndex = ({
                       length,
                       page,
                       incrementPage,
                       decrementPage,
                       setCustomPage,
                   }) => {
    const indexes = [];
    for (let i = 0; i < length; i++) {
        indexes.push(
            <a href="#topCata" key={i}>
                <div
                    onClick={() => setCustomPage(i)}
                    className={i == page ? "index active" : "index"}
                >
                    <h4>{i + 1}</h4>
                </div>
            </a>
        );
    }
    return (
        <div>
            {page > 0 && (
                <a href="#topCata">
                    <ChevronLeftIcon onClick={decrementPage} className="lrg-icon"/>
                </a>
            )}
            {indexes}
            {page < length - 1 && (
                <a href="#topCata">
                    <ChevronRightIcon onClick={incrementPage} className="lrg-icon"/>
                </a>
            )}
        </div>
    );
};

export default PageIndex;
