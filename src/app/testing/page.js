"use client";
import {usePathname} from "next/navigation";
import {DotNetApi} from "../../../utils/classes/DotNetApi/DotNetApi";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

const Testing = () => {
    const pathname = usePathname();

    console.log("pathname");
    console.log(pathname);

    const runRequest = async () => {


    }

    const markdownContent = " # This is a Markdown Heading \n\n" +
        "<h1>This is an HTML Heading</h1>";


    return (
        <>
            <div className="p-4 border" onClick={runRequest}>
                Click me
            </div>

            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {markdownContent}
            </ReactMarkdown>
        </>
    )
}

export default Testing;