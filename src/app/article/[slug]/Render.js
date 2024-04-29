"use client";

import {useContext, useState, useEffect, useRef, useCallback} from "react";
import Link from "next/link";
import Head from "next/head";
import toast, {Toaster} from "react-hot-toast";
import {RichText} from "@graphcms/rich-text-react-renderer";

import {FaRegBookmark, FaBookmark} from "react-icons/fa6";

import {GetRelatedArticles} from "../../../../utils/Functions";
import {nanoid} from "nanoid";
import {IoIosArrowBack} from "react-icons/io";

const Slug = ({article, articles, slug}) => {
    /* const [context, setContext] = useContext(AppContext); */
    const relatedArticles =
        article.tags.length > 0 ? GetRelatedArticles(articles, article.tags) : [];

    const [text, setText] = useState(() => {
        const textContent = article.content.raw.children.map((textNode) => {
            return textNode.children[0].text;
        });

        const text = textContent.join("\n");
        return text;
    });


    const tagElems = article.tags.map((tag) => {
        return (
            <div key={nanoid()} className='px-2 py-1 rounded-full border inline-block '>
                <p className='text-slate-500 res-text-xs'>{tag.text}</p>
            </div>
        );
    });

    const relatedElems = relatedArticles.map((article) => {
        return (
            <div key={nanoid()} className="mb-2">
                <Link href={`/article/${article.title}`} className='link--secondary'>
                    <p className='res-text-xs'>{article.title}</p>
                </Link>
            </div>
        );
    });


    const dropdownEl2 = useRef();
    const [showDropdown, setShowDropdown] = useState(false);
    // Dropdown function
    const handleClickOutside = useCallback(
        (e) => {
            if (e === "override") {
                setShowDropdown(false);
                return;
            }

            if (
                showDropdown &&
                e.target.closest(".dropdown-holder2") !== dropdownEl2.current
            ) {
                setShowDropdown(false);
                deFocus();
            }
        },
        [showDropdown, setShowDropdown, dropdownEl2]
    );
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    function Focus(e) {
        setShowDropdown(true);
    }

    function deFocus() {
        setShowDropdown(false);
    }


    const metaTags = article.tags.map((tag) => tag.text);

    const meta = {
        title: article.title,
        description: `Aajonus Vonderplanitz raw meat article related to ${article.title}`,
        link: `https://www.primalenjoyer.com/article/${article.title}`,
        type: "website",
        date: "2023-02-20 15:00:00.000",
        image: article.coverImage.url,
        keywords: `aajonus vonderplanitz, raw meat, health, information, raw primal, diet, ${
            article.title
        }, ${metaTags.join(", ")}`,
    };

    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index"/>
                <meta property="og:type" content={meta.type}/>
                <meta property="og:site_name" content="Primal Enjoyer"/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:title" content={meta.title}/>
                <meta property="og:image" content={meta.image}/>
                <meta property="article:published_time" content={meta.date}/>
                <link rel="canonical" href={meta.image}/>
                <meta property="og:url" content={meta.link}/>
                <meta name="keywords" content={meta.keywords}/>

                <meta name="description" content={meta.description}/>
            </Head>
            <div className=" bg-white p-4 pb-32">
                <div>
                    <Toaster/>
                    <div className="mx-auto max-w-4xl">
                        <Link href={'/articles'} className=' res-text-base cursor-pointer'>

                            <div className="inline-flex items-center hover:text-blue-500 mb-4">
                                <IoIosArrowBack
                                    className='text-xl'
                                />
                                <p className='link'>
                                    Back to
                                    articles
                                </p>
                            </div>
                        </Link>
                        {/** Heading */}
                        <div className="flex justify-between items-center border-b-2 border--secondary pb-4">

                            <h1 className="res-heading-2xl">
                                {article.title}
                            </h1>

                            {/*<FaRegBookmark*/}
                            {/*    className='text-3xl text-slate-500 hover:text-slate-950 cursor-pointer transition'*/}
                            {/*/>*/}

                        </div>
                        {/** End of heading */}


                        <div className="overflow-auto">

                            {/** Article text */}
                            <div className="pr-4 inline">

                                <div className=' pt-4 pr-4'>
                                    <div className="text-renderer">

                                    </div>
                                </div>
                            </div>
                            {/** End of article text */}

                            <div
                                className='w-full w- mb-6 sm:!w-40 ml-4  float-right border--secondary md:border-l-2 '>
                                <div className="pl-2 border-b-2 border--secondary pb-2 mb-4">
                                    {relatedElems}
                                </div>

                                <div className='pl-2 flex flex-wrap gap-2'>
                                    {tagElems}
                                </div>
                            </div>

                            <div className="text-renderer">

                                <RichText
                                    content={article.content.raw}
                                    renderers={{
                                        bold: ({children}) => <strong>{children}</strong>,
                                    }}
                                ></RichText>
                            </div>

                            {/** Right sidebar */}

                            {/** End of right sidebar */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slug;
