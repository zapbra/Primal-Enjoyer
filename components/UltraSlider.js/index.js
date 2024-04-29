import Image from "next/image";
import Link from "next/link";
import React from "react";
import {useState, useRef} from "react";
import {UpperCase} from "../../utils/Functions";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/solid";


const Index = ({catagories}) => {
    const count = catagories.length;
    const [iteration, setIteration] = useState(0);
    const sliderRef = useRef(null);
    const slideContRef = useRef(null);
    const slideChange = 874;
    const articleElems = catagories.map((catagory, index) => {
        return (
            <Link
                href={{
                    pathname: `/Category/${catagory.title}`,
                }}
                key={index}
            >
                <div className="article">
                    <div className="text">
                        <h6>{UpperCase(catagory.title)}</h6>
                    </div>
                    <Image
                        alt={catagory.title}
                        src={catagory.coverImage.url}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </Link>
        );
    });

    const increaseIteration = () => {
        const left = sliderRef.current.offsetLeft;

        if (iteration >= Math.floor(count / 7)) {
        } else {
            //setIteration(iteration + 1);
            if (left - slideChange <= Math.floor(count / 7) * slideChange * -1) {
                sliderRef.current.style.left = Math.floor(count / 7) * slideChange * -1;
            } else {
                sliderRef.current.style.left = `${
                    left - slideContRef.current.offsetWidth
                }px`;
            }
        }
    };

    const decreaseIteration = () => {
        const left = sliderRef.current.offsetLeft;
        if (left + slideChange > 0) {
            sliderRef.current.style.left = `0px`;
        } else {
            sliderRef.current.style.left = `${
                left + slideContRef.current.offsetWidth
            }px`;
        }
    };

    const left = "-" + iteration * slideChange + "px";

    return (
        <>
            <div className="mar-bottom-32 tablet-hide">
                <div count={count}>
                    <div className="sidebar" onClick={decreaseIteration}>
                        <ChevronDoubleLeftIcon className="icon-chev"/>
                    </div>

                    <div ref={slideContRef} className="hide-articles">
                        <div ref={sliderRef} className="articles" style={{left: left}}>
                            {articleElems}
                        </div>
                    </div>
                    <div className="sidebar" onClick={increaseIteration}>
                        <ChevronDoubleRightIcon className="icon-chev"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
