import {useEffect, useState} from "react";


const Featured = ({titles}) => {
    const [titleElems, setTitleElems] = useState(
        titles.map((title, index) => {
            return (
                <a key={index} href={`#(${index + 1}) ${title}`}>
                    <p className="link--secondary">
                        <span className="text-slate-500">#{index + 1} </span>
                        {title}
                    </p>
                </a>
            );
        })
    );
    useEffect(() => {
        if (window.type !== "undefined") {
            // Get the title from the document to add links via id
            const headings = document.querySelectorAll(".text-renderer h3");
            for (let heading of headings) {
                heading.id = heading.innerHTML;
            }
        }
    }, []);

    return (
        <div className="bg-white border-slate-300 border mb-12">
            <div className="px-4 py-2 border-slate-300 border-b-2">
                <h5 className='res-heading-sm'>Featured in this lecture</h5>
            </div>
            <div className="px-8 py-4 grid grid-cols-3 gap-2 max-h-[600px] overflow-auto">{titleElems}</div>
        </div>
    );
};

export default Featured;
