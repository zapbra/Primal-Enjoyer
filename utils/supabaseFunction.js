import toast from "react-hot-toast";
import supabase from "./supabaseClient";

//collections
export default async function insertCollection(user_id, title) {
    try {
        const {data, error} = await supabase
            .from("articleCollection")
            .insert({title, user_id});
        if (error) throw error;
    } catch (error) {
        return {error};
    }
}

export async function insertPostCollection(user_id, title) {
    try {
        const {data, error} = await supabase
            .from("postCollection")
            .insert({title, user_id});
        if (error) throw error;
    } catch (error) {
        return {error};
    }
}

export const getCollections = async (user_id) => {
    const {data, error} = await supabase
        .from("articleCollection")
        .select("*, savedArticle(title)")
        .eq("user_id", user_id);
    return data;
};

export const getPostCollections = async (user_id) => {
    const {data, error} = await supabase
        .from("postCollection")
        .select("*, savedPost(title)")
        .eq("user_id", user_id);
    return data;
};

export const getFullCollections = async (user_id) => {
    const {data, error} = await supabase
        .from("articleCollection")
        .select("*,savedArticle(link, title, id)")
        .eq("user_id", user_id);
    return data;
};

export const getFullPostCollections = async (user_id) => {
    const {data, error} = await supabase
        .from("postCollection")
        .select("*,savedPost(link, title, id)")
        .eq("user_id", user_id);
    return data;
};

export const saveToCollection = async (
    title,
    link,
    articleCollection_id,
    user_id
) => {
    try {
        const {data, error} = await supabase
            .from("savedArticle")
            .insert({title, link, articleCollection_id, user_id})
            .select();

        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const saveToPostCollection = async (
    title,
    link,
    postCollection_id,
    user_id
) => {
    try {
        const {data, error} = await supabase
            .from("savedPost")
            .insert({title, link, postCollection_id, user_id})
            .select();

        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const removeFromCollection = async (
    articleCollection_id,
    title,
    user_id
) => {
    try {
        const {data, error} = await supabase
            .from("savedArticle")
            .delete()
            .eq("articleCollection_id", articleCollection_id)
            .eq("title", title)
            .eq("user_id", user_id);
        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const removeFromPostCollection = async (
    postCollection_id,
    title,
    user_id
) => {
    try {
        const {data, error} = await supabase
            .from("savedPost")
            .delete()
            .eq("postCollection_id", postCollection_id)
            .eq("title", title)
            .eq("user_id", user_id);

        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const deleteCollectionParent = async (id) => {
    try {
        const {data, error} = await supabase
            .from("articleCollection")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const deletePostCollectionParent = async (id) => {
    try {
        const {data, error} = await supabase
            .from("postCollection")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const deleteCollection = async (articleCollection_id) => {
    try {
        const {data, error} = await supabase
            .from("savedArticle")
            .delete()
            .eq("articleCollection_id", articleCollection_id);

        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const deletePostCollection = async (postCollection_id) => {
    try {
        const {data, error} = await supabase
            .from("savedPost")
            .delete()
            .eq("postCollection_id", postCollection_id);

        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const testFunc = async () => {
    try {
        const {data, error} = await supabase.from("profile").select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};
//articles
export const checkArticleCreated = async (title) => {
    try {
        const {data, error} = await supabase
            .from("article")
            .select()
            .eq("title", title);
        if (error) throw error;
        // article created
        if (data.length > 0) {
            // article not created
        } else {
            const {data, error} = await supabase.from("article").insert({title});
        }
    } catch (error) {
        return false;
    }
};

export const fetchArticleLike = async (id, title) => {
    try {
        const {data, error} = await supabase
            .from("users")
            .select("articleLikes(*)")
            .filter("articleLikes.title", "eq", title)
            .eq("id", id);
        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};

export const fetchArticleId = async (title) => {
    try {
        const {data, error} = await supabase
            .from("article")
            .select("id")
            .eq("title", title)
            .maybeSingle();

        if (error) throw error;

        return data;
    } catch (error) {
        return error;
    }
};

export const likePost = async (user_id, article_id, title) => {
    try {
        const {data, error} = await supabase
            .from("articleLikes")
            .insert([{user_id, article_id, title}]);
        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};

export const unlikePost = async (article_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("articleLikes")
            .delete()
            .eq("article_id", article_id)
            .eq("user_id", user_id);
        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};

export const getLikeCount = async (title) => {
    try {
        const {data, count, error} = await supabase
            .from("articleLikes")
            .select("*", {count: "exact"})
            .eq("title", title);

        if (error) throw error;
        return count;
    } catch (error) {
        return error;
    }
};

//anecdotes
export const deleteAnecdotes = async (post_id) => {
    try {
        const {data, error} = await supabase
            .from("anecdote")
            .delete()
            .eq("post_id", post_id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};
export const createAnecdote = async (title, content, post_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("anecdote")
            .insert({
                title: title,
                content: content,
                post_id: post_id,
                user_id: user_id,
            })
            .select()
            .maybeSingle();
        if (error) throw error;

        return data;
    } catch (error) {
        return false;
    }
};

export const createGuestAnecdote = async (title, content, post_id, name) => {
    try {
        const {data, error} = await supabase
            .from("anecdote")
            .insert({
                title,
                content,
                post_id,
                name,
            })
            .select()
            .maybeSingle();
        if (error) throw error;

        return data;
    } catch (error) {
        return error;
    }
};

export const deleteAnecdote = async (anecdote_id) => {
    try {
        const {error} = await supabase
            .from("anecdote")
            .delete()
            .eq("id", anecdote_id);
        if (error) throw error;
        return error;
    } catch (error) {
        return error;
    }
};

export const updateAnecdotePlease = async (
    title,
    content,
    user_id,
    real_anecdote_id
) => {
    try {
        const {data, error} = await supabase
            .from("anecdote")
            .update({title, content})
            .eq("user_id", user_id)
            .eq("id", real_anecdote_id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const fetchPageViews = async (title) => {
    try {
        const {data, error} = await supabase.from;
        if (error) throw error;
    } catch (error) {
        return error;
    }
};
//comments
export const createArticleComment = async (content, user_id, article_id) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .insert([{content: content, user_id: user_id, article_id}]);
        if (error) throw error;
    } catch (error) {
        throw error;
    }
};

export const editArticleCommentById = async (id, content) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .update({content})
            .eq("id", id);
        if (error) throw error;
    } catch (error) {
        throw error;
    }
};

export const editArticleCommentReplyById = async (id, content) => {
    try {
        const {data, error} = await supabase
            .from("commentReplies")
            .update({content})
            .eq("id", id);
        if (error) throw error;
    } catch (error) {
        throw error;
    }
};

export const fetchCommentsByTitle = async (title) => {
    try {
        const {data, error} = await supabase
            .from("article")
            .select(
                "comments(*, comments(*, commentLikes(*), users(username, avatar_url)), commentLikes(*), users(username, avatar_url))"
            )
            .eq("title", title);
        if (error) throw error;
        return data[0].comments.sort((a, b) => -1);
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const fetchPostCommentsByTitle = async (title) => {
    try {
        const {data, error} = await supabase
            .from("post")
            .select(
                "comments(*, comments(*, commentLikes(*), users(username, avatar_url)), commentLikes(*), users(username, avatar_url))"
            )
            .eq("title", title);
        if (error) throw error;
        return data[0].comments.sort((a, b) => -1);
    } catch (error) {
        return false;
    }
};

export const fetchCommentsByArticleId = async (article_id) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .select("content, created_at, user_id(username)")
            .eq("article_id", article_id);
        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};

//users
export const checkUsernameUnique = async (username) => {
    try {
        const {data, error} = await supabase
            .from("users")
            .select()
            .eq("username", username);
        if (error) throw error;
        // if username doesn't exist, return true
        if (!data.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const checkEmailUnique = async (email) => {
    try {
        const {data, error} = await supabase
            .from("users")
            .select()
            .eq("email", email);
        if (error) throw error;
        // if email doesn't exist, return true
        if (!data.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};
export const fetchUserById = async (user_id) => {
    try {
        const {data, error} = await supabase
            .from("users")
            .select("username, role")
            .eq("id", user_id);
        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};

export const updateUserEmail = async (email) => {
    try {
        const {data, error} = await supabase.auth.updateUser({
            email,
        });
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const updateUserUsername = async (username) => {
    try {
        const {data, error} = await supabase.auth.updateUser({
            data: {username: username},
        });
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const updateUserAvatar = async (avatar_url) => {
    try {
        const {data, error} = await supabase.auth.updateUser({
            data: {avatar_url},
        });
        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

//posts
export const deletePost = async (post_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("post")
            .delete()
            .eq("id", post_id)
            .eq("user_id", user_id);

        if (error) throw error;

        return true;
    } catch (error) {
    }
};
export const fetchPostId = async (title) => {
    try {
        const {data, error} = await supabase
            .from("post")
            .select("id")
            .eq("title", title)
            .maybeSingle();

        if (error) throw error;

        return data;
    } catch (error) {
        return error;
    }
};
export const fetchPostLike = async (id, title) => {
    try {
        const {data, error} = await supabase
            .from("users")
            .select("postLikes(*)")
            .filter("postLikes.title", "eq", title)
            .eq("id", id);
        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};
export const getPostLikeCount = async (title) => {
    try {
        const {data, count, error} = await supabase
            .from("postLikes")
            .select("*", {count: "exact"})
            .eq("title", title);

        if (error) throw error;
        return count;
    } catch (error) {
        return error;
    }
};
export const likeUserPost = async (user_id, post_id, title) => {
    try {
        const {data, error} = await supabase
            .from("postLikes")
            .insert([{user_id, post_id, title}]);
        if (error) throw error;

        return data;
    } catch (error) {
        return error;
    }
};

export const unlikeUserPost = async (post_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("postLikes")
            .delete()
            .eq("post_id", post_id)
            .eq("user_id", user_id);
        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};
export const fetchPost = async (post_id) => {
    try {
        const {data, error} = await supabase
            .from("post")
            .select(
                "*, post_url(text), tags(title), postEdits(*, user_id(username)), post_url(text),user_id(username, id), anecdote(*), link(*), contributor(*)"
            )
            .eq("id", post_id);

        if (error) throw error;
        return data[0];
    } catch (error) {
        return error;
    }
};

export const checkPostCreated = async (title, user_id) => {
    try {
        const {data, error} = await supabase
            .from("post")
            .select()
            .eq("title", title)
            .eq("user_id", user_id)
            .eq("published", false);
        if (error) throw error;
        if (data.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const updatePost = async (
    title,
    introduction,
    main,
    conclusion,
    user_id,
    post_id
) => {
    try {
        const {data, error} = await supabase
            .from("post")
            .update({title, introduction, main, conclusion})
            .eq("id", post_id)
            .eq("user_id", user_id)
            .eq("published", false);

        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const savePostDraft = async (
    title,
    introduction,
    main,
    conclusion,
    user_id,
    post_id
) => {
    const alphaLetter = title[0].toLowerCase();
    if (!/[a-zA-Z]/.test(alphaLetter)) {
        document.getElementById("title").focus();
        toast.error("Title must start with a letter");
        return;
    }
    // return if title contains non letter/number characters
    if (!/^[a-zA-Z][a-zA-Z0-9- :\[\]'";:,(){}]*$/.test(title)) {
        document.getElementById("title").focus();
        toast.error("Title contains one or more invalid characters. !@#$%^&*/?");
        return;
    }

    updatePost(title, introduction, main, conclusion, user_id, post_id);
    toast.success("Post saved");
};
export const createPostDraft = async (
    title,
    introduction,
    main,
    conclusion,
    user_id,
    firstSave,
    setFirstPostBool,
    setFirstPostId,
    image,
    width
) => {
    // check if start with letter
    const alphaLetter = title[0].toLowerCase();
    if (!/[a-zA-Z]/.test(alphaLetter)) {
        document.getElementById("title").focus();
        toast.error("Title must start with a letter");
        return;
    }
    // return if title contains non letter/number characters
    if (!/^[a-zA-Z][a-zA-Z0-9- :\[\]'";:,(){}]*$/.test(title)) {
        document.getElementById("title").focus();
        toast.error("Title contains one or more invalid characters. !@#$%^&*/?");
        return;
    }

    const updateDraft = (post_id) => {
        updatePost(title, introduction, main, conclusion, user_id, post_id);
        toast.success("Post saved");
        return;
    };

    const submitDraft = async () => {
        if (firstSave.bool) {
            setFirstPostBool();

            const {data: post, error} = await supabase
                .from("post")
                .insert({
                    title: title,
                    introduction: introduction,
                    main: main,
                    conclusion: conclusion,
                    user_id: user_id,
                    published: false,
                    image_width: width,
                })
                .select("id");

            const uploadToServer = async () => {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("upload_preset", "my-uploads");

                const secure_url = await fetch(
                    "https://api.cloudinary.com/v1_1/dg7qdaefw/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                )
                    .then((r) => r.json())
                    .then((res) => {
                        return res.secure_url;
                    });

                return secure_url;
            };

            if (image !== null) {
                let url = await uploadToServer();
                const errorJ = await supabase.from("post_url").upsert({
                    text: url,
                    post_id: post[0].id,
                });
            } else {
                console.log("Error uploading");
            }

            setFirstPostId(post[0].id);
            toast.success("Post first save");
        } else {
            const {data: post, error} = await supabase
                .from("post")
                .update({
                    title,
                    introduction,
                    main,
                    conclusion,
                    user_id,
                    published: false,
                    image_width: width,
                })
                .eq("id", firstSave.post_id);

            toast.success("Post saved");
        }
    };
    // check if post created, submit or don't
    checkPostCreated(title, user_id).then((res) =>
        res ? updateDraft(firstSave.post_id) : submitDraft()
    );
};

//edits
export const createPostEdit = async (
    content,
    field,
    post_id,
    sender_id,
    user_id
) => {
    try {
        const {data, error} = await supabase
            .from("postEdits")
            .insert({content, field, post_id, sender_id, user_id});
        return true;
    } catch (error) {
        return false;
    }
};

export const editPostEdit = async (
    content,
    field,
    post_id,
    sender_id,
    user_id
) => {
    try {
        const {data, error} = await supabase
            .from("postEdits")
            .update({content})
            .eq("field", field)
            .eq("post_id", post_id)
            .eq("sender_id", sender_id);
        return true;
    } catch (error) {
        return false;
    }
};

export const checkPostEditCreated = async (field, post_id, sender_id) => {
    try {
        const {data, error} = await supabase
            .from("postEdits")
            .select()
            .eq("field", field)
            .eq("post_id", post_id)
            .eq("sender_id", sender_id);
        if (error) throw error;
        if (data.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};
export const fetchPostEditsByPostId = async (post_id) => {
    try {
        const {data, error} = await supabase
            .from("postEdits")
            .select()
            .eq("post_id", post_id);
        if (error) throw error;
        return data;
    } catch (error) {
        return false;
    }
};
export const deletePostEdit = async (id) => {
    try {
        const {data, error} = await supabase
            .from("postEdits")
            .delete()
            .eq("id", id);
        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const fetchPostEditById = async (id) => {
    try {
        const {data, error} = await supabase
            .from("postEdits")
            .select()
            .eq("id", id)
            .maybeSingle();
        if (error) throw error;

        return data;
    } catch (error) {
        return false;
    }
};

export const overwritePostFieldWithEdit = async (post_id, field, content) => {
    try {
        const {data, error} = await supabase
            .from("post")
            .update({[field]: content})
            .eq("id", post_id)
            .maybeSingle();
        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};
//endofedits
//endofposts

//contributors
export const deleteContributors = async (post_id) => {
    try {
        const {data, error} = await supabase
            .from("contributor")
            .delete()
            .eq("post_id", post_id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const createContributor = async (
    name,
    post_id,
    user_id,
    anecdote_id
) => {
    try {
        const {data, error} = await supabase
            .from("contributor")
            .insert({name, post_id, user_id, anecdote_id});
        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const deleteContributorByAnecdoteId = async (anecdote_id) => {
    try {
        const {data, error} = await supabase
            .from("contributor")
            .delete()
            .eq("anecdote_id", anecdote_id);
        return true;
    } catch (error) {
        return false;
    }
};
//endofcontributors
//comments
export const deleteArticleCommentLikes = async (id) => {
    try {
        const {data, error} = await supabase
            .from("commentLikes")
            .delete()
            .eq("comment_id", id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteArticleCommentReplyLikes = async (reply_id) => {
    try {
        const {data, error} = await supabase
            .from("replyLikes")
            .delete()
            .eq("reply_id", reply_id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteArticleCommentReplies = async (comment_id) => {
    try {
        const {data, error} = await supabase
            .from("commentReplies")
            .delete()
            .eq("comment_id", comment_id);

        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const createArticleCommentLike = async (user_id, comment_id) => {
    try {
        const {data, error} = await supabase
            .from("commentLikes")
            .insert({user_id, comment_id});

        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const deleteArticleCommentLike = async (user_id, comment_id) => {
    try {
        const {data, error} = await supabase
            .from("commentLikes")
            .delete()
            .eq("user_id", user_id)
            .eq("comment_id", comment_id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteArticleCommentReply = async (id, comment_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .delete()
            .eq("id", id)
            .eq("comment_id", comment_id)
            .eq("user_id", user_id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const createArticleCommentReplyLike = async (reply_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("replyLikes")
            .insert({reply_id, user_id});
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteArticleCommentReplyLike = async (reply_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("replyLikes")
            .delete()
            .eq("reply_id", reply_id)
            .eq("user_id", user_id);
        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const deleteCommentById = async (id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .delete()
            .eq("id", id)
            .eq("user_id", user_id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};
/*
export const createArticleCommentReply = async (
  content,
  comment_id,
  user_id
) => {
  try {
    const { data, error } = await supabase
      .from("commentReplies")
      .insert({ content, comment_id, user_id });
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};
*/

export const createArticleCommentReply = async (
    content,
    comment_id,
    user_id,
    post_id
) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .insert({content, comment_id, user_id, post_id});
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

//files
export const deleteFile = async (filePath) => {
    try {
        const {error} = await supabase.storage.from("avatars").remove(filePath);
        if (error) throw error;

        return true;
    } catch (error) {
        return false;
    }
};

export const uploadFile = async (filePath, file) => {
    try {
        const {error} = await supabase.storage
            .from("avatars")
            .upload(filePath, file);

        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

// notifications

export const createCommentLikeNotification = async (
    user_id,
    sender_id,
    comment_id,
    link,
    article_id
) => {
    // if user likes own comment, dont send notification
    if (user_id === sender_id) {
        return false;
    }
    try {
        const {data, error} = await supabase.from("notifications").insert({
            type: "liked",
            field: "comment",
            user_id,
            sender_id,
            comment_id,
            link,
            article_id,
        });
    } catch (error) {
        return error;
    }
};

export const deleteCommentLikeNotification = async (user_id, comment_id) => {
    try {
        const {data, error} = await supabase
            .from("notifications")
            .delete()
            .eq("user_id", user_id)
            .eq("comment_id", comment_id);
    } catch (error) {
        return error;
    }
};

export const createCommentReplyNotification = async (
    user_id,
    sender_id,
    comment_id,
    link
) => {
    if (user_id === sender_id) {
        return false;
    }
    try {
        const {data, error} = await supabase.from("notifications").insert({
            type: "replied",
            field: "comment",
            user_id,
            sender_id,
            comment_id,
            link,
        });

        if (error) throw error;
    } catch (error) {
        return error;
    }
};

export const deleteCommentReplyNotification = async (
    user_id,
    sender_id,
    comment_id
) => {
    try {
        const {data, error} = await supabase
            .from("notifications")
            .delete()
            .eq("sender_id", sender_id)
            .eq("comment_id", comment_id);
        eq("user_id", user_id);

        if (error) throw error;
    } catch (error) {
        return error;
    }
};

export const fetchNotifications = async (user_id) => {
    try {
        const {data, error} = await supabase
            .from("notifications")
            .select(
                "*, article_id(title), comment_id(content, id), sender_id(username)"
            )
            .eq("user_id", user_id);
        if (error) throw error;

        return data;
    } catch (error) {
        return error;
    }
};

export const deleteNotification = async (id) => {
    try {
        const {data, error} = await supabase
            .from("notifications")
            .delete()
            .eq("id", id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteNotificationsByCommentId = async (comment_id) => {
    try {
        const {data, error} = await supabase
            .from("notifications")
            .delete()
            .eq("comment_id", comment_id);
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const createEditNotification = async (
    user_id,
    sender_id,
    post_id,
    link
) => {
    try {
        const {data, error} = await supabase.from("notifications").insert({
            type: "edited",
            field: "post",
            user_id,
            sender_id,
            post_id,
            link,
        });
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const createEditAcceptedNotification = async (
    user_id,
    sender_id,
    post_id,
    link
) => {
    try {
        const {data, error} = await supabase.from("notifications").insert({
            type: "accepted",
            field: "edit",
            user_id,
            sender_id,
            post_id,
            link,
        });
        if (error) throw error;
        return true;
    } catch (error) {
        throw false;
    }
};
//endofnotifications
// post comments
export const createPostComment = async (content, user_id, post_id) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .insert({content: content, user_id: user_id, post_id});
        if (error) throw error;
    } catch (error) {
        return error;
    }
};

export const createGuestPostComment = async (content, name, email, post_id) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .insert({content, name, email, post_id});

        if (error) throw error;
        return data;
    } catch (error) {
        return error;
    }
};

// reply replies

export const createReplyReply = async (content, comment_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("comments")
            .insert({content, comment_id, user_id});
        if (error) throw error;
        return true;
    } catch (error) {
        return false;
    }
};

export const fetchFoods = async () => {
    try {
        const {data, error} = await supabase
            .from("foods")
            .select(
                "*, foodUpvotes(count), foodDownvotes(count), foodTagHolder(foodTag(name))"
            );
        if (error) throw error;
        return data;
    } catch (error) {
        return false;
    }
};

export const createUserFoodUpvote = async (food_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("foodUpvotes")
            .insert({food_id, user_id});
        if (error) throw error;
        return data;
    } catch (error) {
        return false;
    }
};

export const createFoodUpvote = async (food_id) => {
    try {
        const {data, error} = await supabase
            .from("foodUpvotes")
            .insert({food_id})
            .select("created_at, food_id(name)")
            .maybeSingle();
        if (error) throw error;
        return data;
    } catch (error) {
        return false;
    }
};

export const createUserFoodDownvote = async (food_id, user_id) => {
    try {
        const {data, error} = await supabase
            .from("foodDownvotes")
            .insert({food_id, user_id});
        if (error) throw error;
        return data;
    } catch (error) {
        return false;
    }
};

export const createFoodDownvote = async (food_id) => {
    try {
        const {data, error} = await supabase
            .from("foodDownvotes")
            .insert({food_id})
            .select("created_at, food_id(name)")
            .maybeSingle();
        if (error) throw error;
        return data;
    } catch (error) {
        return false;
    }
};

export const createTestimonial = async (
    content,
    title,
    name,
    start_date,
    gender,
    age,
    photos
) => {
    try {
        const {data, error} = await supabase
            .from("testimonials")
            .insert({content, title, name, start_date, gender, age, photos});
        if (error) throw error;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateTestimonial = async (
    content,
    title,
    name,
    start_date,
    gender,
    age,
    photos,
    testimonial_id
) => {
    try {
        const {data, error} = await supabase
            .from("testimonials")
            .update({content, title, name, start_date, gender, age, photos})
            .eq("id", testimonial_id);
        if (error) throw error;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteTestimonial = async (testimonial_id) => {
    try {
        const {data, error} = await supabase
            .from("testimonials")
            .delete()
            .eq("id", testimonial_id);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const approveTestimonial = async (testimonial_id) => {
    try {
        const {data, error} = await supabase
            .from("testimonials")
            .update({verified: true})
            .eq("id", testimonial_id);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const createUserTestimonial = async (
    content,
    title,
    name,
    start_date,
    gender,
    age,
    user_id,
    photos
) => {
    try {
        const {data, error} = await supabase.from("testimonials").insert({
            content,
            title,
            name,
            start_date,
            gender,
            age,
            user_id,
            photos,
            verified: true,
        });
        if (error) throw error;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const fetchVotes = async () => {
    try {
        const {data: allVotesFetch, error} = await supabase
            .from("foodUpvotes")
            .select("count");
        if (error) throw error;
        let date = new Date();
        date.setHours(0, 0, 0);
        const {data: votesTodayFetch, error: error2} = await supabase
            .from("foodUpvotes")
            .select("count")
            .gt("created_at", date.toISOString());
        if (error2) throw error2;
        return {votesTodayFetch, allVotesFetch};
    } catch (error) {
        console.log(error);

        return false;
    }
};

export const fetchUserVotes = async (user_id) => {
    return "?";
    try {
        const {data: allUserVotesFetch, error} = await supabase
            .from("foodUpvotes")
            .select("*")
            .eq("user_id", user_id);
        if (error) throw error;
        return allUserVotesFetch;
        let date = new Date();
        date.setHours(0, 0, 0);
        const {data: votesUserTodayFetch, error: error2} = await supabase
            .from("foodUpvotes")
            .select("count")
            .eq("user_id", user_id)
            .gt("created_at", date.toISOString());

        if (error2) throw error2;
        return {votesUserTodayFetch, allUserVotesFetch};
    } catch (error) {
        console.log(error);

        return false;
    }
};

export const fetchTenTestimonials = async () => {
    try {
        const {data, error} = await supabase
            .from("testimonials")
            .select(
                "title, name,age,gender,start_date, verified, photos[],  content, user_id(username)"
            )
            .eq("verified", true);

        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const fetchGuestTestimonials = async () => {
    try {
        const {data, error} = await supabase
            .from("testimonials")
            .select(
                "title,id, content, created_at, name,age,gender,start_date, verified, photos[],  content, user_id(username)"
            )
            .eq("verified", false)
            .order("id", {ascending: false});
        return data;
    } catch (error) {
        return false;
    }
};

export const deleteSubmisison = async (id) => {
    try {
        const {data, error} = await supabase
            .from("user_textfile")
            .delete()
            .eq("id", id)
            .select();

        return data;
    } catch (error) {
        return false;
    }
};

export const fetchTextFiles = async (id) => {
    try {
        const {data, error} = await supabase
            .from("user_textfile")
            .select("*, user_id(*), textfile_id(*)")
            .order("id", {ascending: false});

        return data;
    } catch (error) {
        return false;
    }
};

export const increment_and_return_view_data = async (slug) => {
    const {data: view_data} = await supabase
        .from("pages")
        .select("view_count")
        .filter("slug", "eq", slug)
        .maybeSingle();

    await supabase.rpc("increment_page_view", {
        page_slug: slug,
    });

    return view_data;
};
