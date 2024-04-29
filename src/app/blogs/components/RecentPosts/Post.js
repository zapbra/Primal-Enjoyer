import Link from "next/link";
import {fetchDaysDiff} from "../../../../../utils/Functions";

const Post = ({
                  title,
                  created_at,
                  introduction,
                  url,
              }) => {

    return (
        <div
            className='border-r-2 border-slate-300 pr-8 max-w-64 border-b-2 max-h-96 overflow-hidden hover:underline'>
            <Link href={{pathname: `/blogs/${title}`}}>
                <img src={url[0]?.text} className='w-full max-h-28 object-cover mb-2' alt={title}/>
                <p className='text-slate-500 res-text-xs mb-1'>{fetchDaysDiff(created_at)} </p>
                <h5 className="res-text-lg font-bold mb-2">
                    {title}
                </h5>
                <p>{introduction}</p>
            </Link>
        </div>
    );
};

export default Post;
