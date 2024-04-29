import Link from "next/link";
import {useState} from "react";
import {UpperCase} from "../../../../utils/Functions";

const TextPreview = ({categories}) => {
    const [categoryLines, setCategoryLines] = useState(
        categories.map((category, index) => {
            return (
                <Link key={index} href={`/Category/${category.title}`}>
                    <p className="inline-block mar-right-8">
                        {UpperCase(category.title)},{" "}
                    </p>
                </Link>
            );
        })
    );
    return <div>{categoryLines}</div>;
};

export default TextPreview;
