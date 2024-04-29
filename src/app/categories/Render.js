"use client";

import React from "react";

import Container from "./components/Container";
import {useState} from "react";
import Slider from "../../../components/UltraSlider.js";
import TextPreview from "./components/TextPreview";


const Categories = ({catagoriesFetch}) => {
    const [catagories, setCatagories] = useState(
        catagoriesFetch.sort(function (a, b) {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
    );

    return (
        <div>
            <div className="content ">
                <div className="sm-spacer main-title">
                    <h2 className="text-shadow">Categories</h2>
                    <p className="dark-blue text-shadow">
                        Click any catagory to view the articles contained.
                    </p>
                </div>
                <Slider catagories={catagories}/>

                <TextPreview categories={catagories}/>

                <div className="ssm-spacer-bot-res"></div>
                <Container catagories={catagories}/>
            </div>
        </div>
    );
};

export default Categories;
