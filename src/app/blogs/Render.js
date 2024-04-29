import RecentPosts from "./components/RecentPosts/index.js";


const Render = ({sortedPosts}) => {
    return (
        <div className='bg-white py-16'>
            <div className='mx-auto max-w-7xl px-4'>
                <h1 className="res-heading-2xl font-bold mb-8">
                    BLOG
                </h1>
                <RecentPosts posts={sortedPosts}/>
            </div>
        </div>
    );
};

export default Render;
