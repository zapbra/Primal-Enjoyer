"use client";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from 'next/link';
import {FaArrowRight, FaEye, FaLongArrowAltRight} from "react-icons/fa";
import {IoIosArrowRoundForward} from "react-icons/io";


// amount of textual characters to split search results into
const CHAR_SEARCH_SIZE = 500;

const Render = ({previewData, timecodeData}) => {
    // get the search query
    const searchParams = useSearchParams();
    const query = searchParams.get('query');


    const [searchText, setSearchText] = useState(query || "");
    const [recentSearch, setRecentSearch] = useState("");

    const [timecodeElements, setTimecodeElements] = useState(
        previewData.map((timecode, index) => (

            <div key={index} className="bg-white  mb-4 shadow rounded min-w-5 ">

                <div
                    className=" flex justify-between items-center mb-4 px-4 py-4">
                    <h5 className='mr-4 font-bold res-heading-xs'>{timecode.name}</h5>
                    <Link href={`/timecode/${timecode.name}`} key={index}>
                        <button
                            className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">

                            <p className='text-blue-50 mr-2'>View</p>
                            <FaEye
                                className='text-lg'
                            />
                        </button>

                    </Link>
                </div>
                <div
                    className="collapse collapse-arrow join-item text-slate-500 max-h-72 hover:text-slate-950 transition border bg-blue-500 rounded-none rounded-b">
                    <input type="radio" name="my-accordion-4" checked="checked"/>
                    <div className="collapse-title res-text-base text-blue-50">
                        Show Topics
                    </div>
                    <div
                        className="collapse-content text-slate-950 gap-2 max-h-64 overflow-y-scroll grid sm:grid-cols-2 md:grid-cols-3 bg-white">
                        {timecode.article_titles.map((title, index) => {
                            return (
                                <Link key={index} href={`/timecode/${timecode.name}?query=(${index + 1}) ${title}`}>
                                    <p className='link--secondary res-text-sm'><span
                                        className='mr-2 text-slate-400'>#{index + 1}</span> <span>{title}</span>
                                    </p>
                                </Link>

                            )
                        })}
                    </div>
                </div>
            </div>


        ))
    );

    const [searchResults, setSearchResults] = useState([]);

    const findTimecodeSearchMatches = (search) => {
        search = search.toLowerCase();
        const timecodeMatchObjects = [];
        // get a list of all search that contain the articles text
        const timecodeArrayMatches = timecodeData.filter(timecode => {
            return timecode.content.toLowerCase().includes(search);
        });


        // iterate over the array matches to find matches within 100 characters
        for (let timecodeArray of timecodeArrayMatches) {


            // split the text content into 100 character chunks
            let stringChunks = [];
            for (let i = 0; i < timecodeArray.content.length; i += CHAR_SEARCH_SIZE) {

                // second parameter for substring (end of string)
                let stringEnd = i + CHAR_SEARCH_SIZE;
                // check to see if the end goes over max possible length of string content
                if (stringEnd > timecodeArray.content.length) {
                    stringEnd = timecodeArray.content.length;
                }
                // add chunk of current 100 characters from content
                stringChunks[i] = timecodeArray.content.substring(i, stringEnd);
            }
            // filter the string chunks for matches based on user articles

            stringChunks = stringChunks.filter(chunk => {
                return chunk.toLowerCase().includes(search);
            });

            // push all string chunk array with the corresponding name for articles results
            timecodeMatchObjects.push({
                name: timecodeArray.name,
                stringChunks: stringChunks
            });

        }


        // call the function that updates the searchResults state, which will render the articles results
        renderSearchResults(timecodeMatchObjects, search);
    }

    const renderSearchResults = (timecodeMatchObjects, search) => {
        const searchResultsArray = [];
        let totalChunks = 0;
        for (let timecodeMatchObject of timecodeMatchObjects) {
            // create the result object for rendering
            const resultObject = {};
            resultObject.name = timecodeMatchObject.name;
            // the list of matches
            resultObject.chunks = [];
            // increase the total chunk count for analytical information to user
            totalChunks += timecodeMatchObject.stringChunks.length;
            for (let chunk of timecodeMatchObject.stringChunks) {
                console.log("chunk");
                console.log(chunk);
                // add styling to the
                chunk = {
                    plainTextChunk: chunk,
                    highlightedChunk: chunk.toLowerCase().replaceAll(search, `<span class = 'text-emerald-900 bg-emerald-300'>${search}</span>`)

                }
                // add chunk to chunk list to be rendered
                resultObject.chunks.push(chunk);
            }

            // create the result element
            const resultObjectRender = <div className='border border-slate-300 p-4 rounded bg-white mb-8'>
                <div className="flex justify-between mb-4">

                    <h5 className="font-bold underline">{resultObject.name}</h5>
                    <Link href={`/timecode/${resultObject.name}`}>

                        <button
                            className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">


                            <p className='text-blue-50 mr-2'>View</p>
                            <FaEye
                                className='text-lg'
                            />
                        </button>

                    </Link>

                </div>
                {resultObject.chunks.map((chunk, index) => {
                    return (
                        <Link key={index}
                              href={`/timecode/${resultObject.name}?query=${searchText}&chunk=${encodeURIComponent(chunk.plainTextChunk)}`}>

                            <div
                                className='mb-4 pb-4 bg-blue-50 cursor-pointer px-2 py-2 hover:bg-blue-100 transition'>

                                <div
                                    dangerouslySetInnerHTML={{__html: chunk.highlightedChunk}}></div>
                                <div className="flex justify-end px-2">
                                    <FaLongArrowAltRight
                                        className='text-2xl text-blue-950'
                                    />
                                </div>
                            </div>
                        </Link>

                    )
                })}

            </div>;

            // add to the result elements list
            searchResultsArray.push(resultObjectRender);
        }
        // add the query information to the result elements list (quantity, etc)
        // if no results
        if (searchResultsArray.length === 0) {
            searchResultsArray.unshift(<p className='mb-4'>No results...try a different search</p>)
        } else {
            searchResultsArray.unshift(<p className='mb-4'>Matched sections: <b>{totalChunks}</b></p>)
            searchResultsArray.unshift(<p>Matched transcriptions: <b>{searchResultsArray.length - 1}</b></p>)
        }
        setSearchResults(searchResultsArray);

    }

    // perform search on load if query is sent
    useEffect(() => {
        if (query !== "" && query !== null) {
            findTimecodeSearchMatches(query.toLowerCase());
        }
    }, []);

    return (
        <div className='bg-whit'>
            <div className="mx-auto max-w-6xl px-4 py-10">
                {/** Heading */}
                <div className="text-center mb-16">
                    <h1 className="res-heading-2xl mb-2">
                        Aajonus Recordings Transcriptions
                    </h1>
                    <h5 className="res-heading-base">
                        Global search & view individual recordings
                    </h5>
                </div>
                {/** End of heading */}

                <div className="flex flex-col-reverse mx-auto max-w-3xl gap-4">
                    {/** Timecode links */}
                    <div className='w-full'>
                        {timecodeElements}
                    </div>
                    {/** End of timecode links */}

                    {/** Global timecode articles */}
                    <div className='w-full'>
                        {/** Search bar */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            findTimecodeSearchMatches(searchText);
                        }}>
                            <label className="input input-bordered flex items-center gap-2 py-8 mb-8 px-4 w-full">
                                <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}
                                       className="grow min-w-5" placeholder="Search transcriptions"/>
                                <button
                                    className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search
                                </button>
                            </label>
                        </form>
                        {/** End of articles bar*/}

                        {/** Search results */}

                        {searchResults}
                        {/** End of articles results */}
                    </div>
                    {/** End of global timecode articles */}
                </div>


            </div>

        </div>
    );
};

export default Render;
