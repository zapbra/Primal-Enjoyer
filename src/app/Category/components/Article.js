import Link from "next/link";
import React from "react";
import {ReturnPreview} from "../../../../utils/Functions";


const Article = ({title, content, year, index}) => {
    return (
        <Link
            href={{
                pathname: `/article/${title}`,
            }}
        >
            <div className="box-shadow" colors={COLORS}>
                <div className="article-title">
                    <p className="small contrast">#{index + 1}</p>
                    <h5 className="text-shadow">{title}</h5>
                    {year && (
                        <div className="year hover">
                            <p className="contrast">{year}</p>
                        </div>
                    )}
                </div>
                <div className="preview">
                    <p>{ReturnPreview(content.raw)}</p>
                </div>
            </div>
        </Link>
    );
};

export default Article;
