import Link from "next/link";
import Image from "next/image";
import React from "react";
import {UpperCase} from "../../../../utils/Functions";


const Article = ({title}) => {
    return (
        <Link
            href={{
                pathname: `/article/${title}`,
            }}
        >
            <div>
                <p className="small">{title}</p>
            </div>
        </Link>
    );
};

const Catagory = ({title, articles, img, index}) => {
    const articleElems = articles.map((article, index) => {
        return (
            <div key={index}>
                <Article title={article.title}/>
                <div className="line"></div>
            </div>
        );
    });

    return (
        <div>
            <Link
                href={{
                    pathname: `/Category/${title}`,
                }}
            >
                <div>
                    <Image alt={title} src={img} fill style={{objectFit: "cover"}}/>
                </div>

                <div className="title-article">
                    <h4 style={{minWidth: "0"}}>{UpperCase(title)}</h4>
                </div>
                <div className="icon">
                    <h4>{index + 1}</h4>
                </div>
            </Link>
            <div>{articleElems}</div>
        </div>
    );
};

export default Catagory;
