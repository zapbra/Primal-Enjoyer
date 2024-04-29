import Post from "./Post";
import DraftPost from "./DraftPost";
import {useState} from "react";


const Posts = ({posts}) => {
    const [posted, setPosted] = useState(true);
    const postElems = posts.map((post, index) => {
        return (
            post.published && (
                <Post
                    key={index}
                    title={post.title}
                    likes={post.postLikes.length}
                    comments={post.comments.length}
                />
            )
        );
    });
    const draftElems = posts.map((post, index) => {
        return (
            !post.published && (
                <DraftPost id={post.id} key={index} title={post.title}/>
            )
        );
    });
    return (
        <div className="box-light">
            <div className="title-spec">
                <div
                    onClick={() => setPosted(true)}
                    className={posted ? "inner-title selected" : "inner-title"}
                >
                    <h5>Posted</h5>
                </div>
                <div
                    onClick={() => setPosted(false)}
                    className={!posted ? "inner-title selected" : "inner-title"}
                >
                    <h5>Drafts</h5>
                </div>
            </div>
            <div className="posts-cont">{posted ? postElems : draftElems}</div>
        </div>
    );
};

export default Posts;
