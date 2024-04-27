"use client";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from 'next/link';
import COLORS from "../../../data/colors";
import Preview from "./components/Preview";

const CHAR_SEARCH_SIZE = 500;

const Render = ({previewData, timecodeData}) => {
    // get the search query
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [searchText, setSearchText] = useState("");
    const [timecodeElements, setTimecodeElements] = useState(
        previewData.map((timecode, index) => (
            <Link href={`/timecode/${timecode.name}`} key={index}>

                <div
                    className="bg-white flex justify-between items-center mb-4 py-2 px-4 rounded border border-blue-900 max-w-72 min-w-5 ">
                    <p className='mr-4'>{timecode.name}</p>
                    <button
                        className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View
                    </button>
                </div>
            </Link>

        ))
    );

    const [searchResults, setSearchResults] = useState([]);

    const findTimecodeSearchMatches = (search) => {
        const timecodeMatchObjects = [];
        // get a list of all search that contain the articles text
        const timecodeArrayMatches = timecodeData.filter(timecode => {
            return timecode.content.includes(search);
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
                return chunk.includes(search);
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
                // add styling to the
                chunk = chunk.replaceAll(search, `<span class = 'text-emerald-900 bg-emerald-300'>${search}</span>`)
                // add chunk to chunk list to be rendered
                resultObject.chunks.push(`<p> ${chunk} </p>`);
            }

            // create the result element
            const resultObjectRender = <div className='border border-slate-300 p-4 rounded bg-white mb-8'>
                <div className="flex justify-between mb-4">

                    <h5 className="font-bold underline">{resultObject.name}</h5>
                    <Link href={`/timecode/${resultObject.name}`}>

                        <button
                            className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View
                        </button>
                    </Link>

                </div>
                {resultObject.chunks.map((chunk, index) => {
                    return (
                        <div key={index} className='mb-4 pb-4 border-b-2 border-blue-950'
                             dangerouslySetInnerHTML={{__html: chunk}}></div>
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
        if (query !== null) {
            findTimecodeSearchMatches(query);
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

                <div className="flex md:flex-row flex-col-reverse gap-4">
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
