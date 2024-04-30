import ContentLine from "../components/ContentLine";
import {IoIosArrowBack} from "react-icons/io";

const Render = ({post, slug}) => {

    return (
        <div
            className="bg-white px-2 py-8">
            <div className="mx-auto max-w-5xl">
                {/** Link back to blogs */}
                <div className="inline-flex items-center hover:text-blue-500">
                    <IoIosArrowBack
                        className='text-xl'
                    />
                    <a href={'/blogs'} className="link res-text-base cursor-pointer">Back to
                        blogs</a>
                </div>
                {/** End of links back to blogs */}

                {/** Title */}
                <h1 className="res-heading-2xl mb-8">
                    {post.title}
                </h1>
                {/** End of title */}

                {/** Blog content */}
                <ContentLine
                    title="Introduction"
                    content={post?.introduction}
                    width={post?.image_width}
                />

                <ContentLine
                    title="Main"
                    content={post?.main}
                    width={post.image_width}
                />
                <ContentLine
                    title="Conclusion"
                    content={post?.conclusion}
                    width={post.image_width}
                />
                {/** End of blog content */}
            </div>
        </div>

    )
};

export default Render;
