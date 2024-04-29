import COLORS from "../../data/colors";
import Link from "next/link";
import {
    EyeIcon,
    HeartIcon,
    ChatIcon,
    ArrowRightIcon,
    PencilIcon,
} from "@heroicons/react/solid";


const Post = ({id, title, link, views, likes, comments}) => {
    return (
        <Link
            href={{
                pathname: `/editPost/${title}`,
                query: {
                    id: id,
                },
            }}
        >
            <div className="post-class" colors={COLORS}>
                <div className="flex flex-column">
                    <p className="bold dark-blue">{title}</p>
                </div>
                <PencilIcon className="icon-blue hero-icon-sm arrow"/>
            </div>
        </Link>
    );
};

export default Post;
