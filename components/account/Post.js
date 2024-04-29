import Link from "next/link";
import {
    EyeIcon,
    HeartIcon,
    ChatIcon,
    ArrowRightIcon,
} from "@heroicons/react/solid";


const Post = ({title, link, views, likes, comments}) => {
    return (
        <Link href={`/encyclopedia/${title}`}>
            <div className="post-class" colors={COLORS}>
                <div className="flex flex-column">
                    <p className="bold dark-blue">{title}</p>
                    <div className="flex">
                        <div className="flex mar-right-8">
                            <HeartIcon className="icon-blue hero-icon-sm mar-right-4"/>
                            <p className="contrast small">{likes}</p>
                        </div>
                        <div className="flex">
                            <ChatIcon className="icon-blue hero-icon-sm mar-right-4"/>
                            <p className="contrast small">{comments}</p>
                        </div>
                    </div>
                </div>
                <ArrowRightIcon className="icon-blue hero-icon-sm arrow"/>
            </div>
        </Link>
    );
};

export default Post;
