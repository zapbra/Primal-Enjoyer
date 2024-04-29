import ReactMarkdown from "react-markdown";

const ContentLine = ({
                         title,
                         content,
                     }) => {

    return (
        <div className='mb-8'>
            <h3 className="font-bold res-text-xl border-b-2 border-slate-950 mb-2">{title}</h3>

            <ReactMarkdown className="text-renderer">{content}</ReactMarkdown>

        </div>
    );
};

export default ContentLine;
