"use client";
import {IoIosDownload} from "react-icons/io";
import {TextParser} from "../../../utils/classes/utility/TextParser";


const Download = ({article}) => {
    const downloadFile = () => {
        const downloadUrl = TextParser.getBlobUrlFromRawText(article.content.raw.children);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = article.title;
        link.click()
        URL.revokeObjectURL(link.href);
    }
    return (
        <button onClick={downloadFile}
                className="bg-emerald-600 text-white rounded px-4 py-2 shadow hover:bg-emerald-700 transition flex items-center">
            <IoIosDownload
                className='text-4xl mr-2'
            />
            Download Text File
        </button>
    )
}

export default Download;