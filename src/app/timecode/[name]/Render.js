"use client";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import Featured from "@/app/search/components/Featured";
import {IoIosArrowBack, IoIosReturnLeft} from "react-icons/io";
import {useEffect} from "react";
import rehypeRaw from "rehype-raw";
import {FaShare} from "react-icons/fa";
import {Toaster} from "react-hot-toast";
import {EventHandler} from "../../../../utils/classes/EventHandler";


const Render = ({timecode}) => {
    // the title of the section to scroll to. Sent from previous page /search link
    const searchParams = useSearchParams();
    let query = searchParams.get("query");
    let chunk = searchParams.get("chunk");
    let hash = window.location.hash;

    console.log("hash")
    console.log(hash);

    query = encodeURIComponent(query);
    if (chunk != null) {
        chunk = decodeURIComponent(chunk);
    }

    if (hash != null) {
        hash = decodeURIComponent(hash);
    }


    if (chunk != null) {
        const index = timecode.content.indexOf(chunk);

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

            if (hash != null) {
                document.getElementById(hash.substring(1))?.scrollIntoView({behavior: "smooth"});
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
            <Toaster/>
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
                {/** Share Section */}
                <div className="bg-white px-4 py-2 mb-6">
                    <h3 className="res-heading-base mb-2 font-bold ">
                        Share
                    </h3>
                    <p className=''>
                        If you have searched for a specific term or clicked an in page link,
                        you can share that link and they will be redirected to the exact page section you were
                    </p>
                    <p className="mb-8 italic text-slate-400">
                        I am aware of a bug where the in page links don't work when you are viewing a specific search
                        section
                    </p>
                    <div className="flex justify-end">
                        <button
                            onClick={EventHandler.copyPageLink}
                            className="bg-emerald-400 hover:bg-emerald-500 transition text-emerald-50 flex items-center px-4 py-2 rounded">
                            <p className='text-emerald-50 mr-4'>Copy Page Link</p>
                            <FaShare
                                className='text-lg'
                            />
                        </button>
                    </div>
                </div>
                {/** End of share section */}

                {/** Link Section */}
                <Featured titles={timecode.article_titles} query={query}/>
                {/** End of link section */}


                <div className="text-holder bg-white px-4 py-2 shadow">
                    <ReactMarkdown className="text-renderer" rehypePlugins={[rehypeRaw]}>
                        {timecode.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Render;
