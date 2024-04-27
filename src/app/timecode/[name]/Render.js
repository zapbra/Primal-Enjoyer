"use client";
import {useState} from "react";
import Link from "next/link";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTurnDown} from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../../../data/colors";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import Featured from "@/app/search/components/Featured";
import {IoIosArrowBack, IoIosReturnLeft} from "react-icons/io";

const Render = ({timecode}) => {
    return (
        <div className='mx-auto max-w-4xl px-4 py-8'>
            <div className="header">
                <h1 className="res-heading-xl text-center mb-2">{timecode.name} </h1>
            </div>
            <Link href={'/search'} className=' res-text-base cursor-pointer'>

                <div className="inline-flex items-center hover:text-blue-500 mb-4">
                    <IoIosArrowBack
                        className='text-xl'
                    />
                    <p className='link'>
                        Back to
                        search
                    </p>
                </div>
            </Link>


            <div>
                {/*  <Sorter /> */}
                <Featured titles={timecode.article_titles}/>
                <div className="text-holder bg-white px-4 py-2 border-slate-300 border">
                    <ReactMarkdown className="text-renderer">
                        {timecode.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Render;
