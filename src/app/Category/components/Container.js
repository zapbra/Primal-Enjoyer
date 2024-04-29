import React, {useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import Catagory from "./Catagory";
import {nanoid} from "nanoid";
import PageIndex from "./pageIndex";


const Container = ({catagories}) => {
    const [page, setPage] = useState(0);
    const catagoryElems = catagories.map((catagory, index) => {
        return (
            <Catagory
                key={nanoid()}
                title={catagory.title}
                articles={catagory.article}
                img={catagory.coverImage.url}
                index={index}
            />
        );
    });
    const splitCatas = [];
    const articlesPer = 15;
    const pages = Math.ceil(catagories.length / articlesPer);
    for (let i = 0; i < pages; i++) {
        splitCatas.push([]);
    }
    let counter = 0;
    catagoryElems.map((catagory, index) => {
        splitCatas[Math.floor(index / articlesPer)].push(catagory);
    });

    function incrementPage() {
        if (page + 1 > splitCatas.length) {
        } else {
            setPage(page + 1);
        }
    }

    function decrementPage() {
        if (page - 1 < 0) {
        } else {
            setPage(page - 1);
        }
    }

    function setCustomPage(index) {
        setPage(index);
    }

    const [listRef] = useAutoAnimate();

    return (
        <div id="topCata">
            <div className="cont" ref={listRef}>
                {splitCatas[page]}
            </div>
            <PageIndex
                length={splitCatas.length}
                page={page}
                incrementPage={incrementPage}
                decrementPage={decrementPage}
                setCustomPage={setCustomPage}
            />
        </div>
    );
};

export default Container;
