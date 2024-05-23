import {useEffect, useState} from "react";
import Link from 'next/link';

const Featured = ({titles, query}) => {
    const titleElems =
        titles.map((title, index) => {
            return (
                <Link key={index} href={`#(${index + 1}) ${title.replaceAll("&", "and")}`}>
                    <p className="link--secondary res-text-sm">
                        <span className="text-slate-500">#{index + 1} </span>
                        {title}
                    </p>
                </Link>
            );
        });


    return (
        <div className="bg-white shadow mb-6">
            <div className="px-4 py-2 ">
                <h5 className='res-heading-sm'>Featured in this lecture</h5>
            </div>
            <div
                className="px-8 py-4 grid grid-cols-3 gap-2 max-h-[240px] md:max-h-[400px] overflow-auto">{titleElems}</div>
        </div>
    );
};

export default Featured;
