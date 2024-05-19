"use client";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import Featured from "@/app/search/components/Featured";
import {IoIosArrowBack, IoIosReturnLeft} from "react-icons/io";
import {useEffect} from "react";
import rehypeRaw from "rehype-raw";


const Render = ({timecode}) => {
    // the title of the section to scroll to. Sent from previous page /search link
    const searchParams = useSearchParams();
    let query = searchParams.get("query");
    let chunk = searchParams.get("chunk");
    query = encodeURIComponent(query);
    chunk = decodeURIComponent(chunk);


    console.log("chunk");
    console.log(chunk);

    console.log("query");
    console.log(query);

    if (chunk != null) {
        console.log("chunk")
        console.log(chunk);
        const index = timecode.content.indexOf(chunk);

        console.log("index");
        console.log(index);
        const firstString = timecode.content.substring(0, index + 1);
        let middleString = timecode.content.substring(index + 1, index + 1 + chunk.length);
        middleString = `<div id='chunk' class="bg-blue-50">${middleString.toLowerCase().replaceAll(query, `<span class="text-emerald-900 bg-emerald-300">${query} </span>`)}</div>`;
        const lastString = timecode.content.substring(index + 1 + chunk.length);

        timecode.content = (firstString + middleString + lastString).toLowerCase().replaceAll(query, `<span class="text-emerald-900 bg-emerald-300">${query} </span>`);


    }

    useEffect(() => {


        if (window.type !== "undefined") {
            // Get the title from the document to add links via id
            const headings = document.querySelectorAll(".text-renderer h3");
            for (let heading of headings) {
                heading.id = heading.innerHTML.replaceAll("&amp;", "and");
            }
            // scroll to specific part of page based on query parameter link
            if (chunk != null) {
                document.getElementById("chunk")?.scrollIntoView({behavior: 'smooth'});
            } else if (query != null && query !== "") {
                document.getElementById(decodeURIComponent(query))?.scrollIntoView({behavior: 'smooth'});
            }
        }
    }, []);
    return (
        <div className='mx-auto max-w-4xl px-4 py-8'>
            <div className="header">
                <h1 className="res-heading-xl text-center mb-2">{timecode.name} </h1>
            </div>
            {/** Back to search link */}
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
            {/** End of back to search link */}


            <div>
                {/** Link Section */}
                <Featured titles={timecode.article_titles} query={query}/>
                {/** End of link section */}

                <div className="text-holder bg-white px-4 py-2 border-slate-300 border">
                    <ReactMarkdown className="text-renderer" rehypePlugins={[rehypeRaw]}>
                        {timecode.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Render;
