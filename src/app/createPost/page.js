"use client";

import {useRouter} from "next/navigation";
import {useState, useEffect, useRef} from "react";
import toast, {Toaster} from "react-hot-toast";
import ImgurUpload from "../../../components/Misc/ImgurUpload";
import COLORS from "../../../data/colors";
import Editor from "../../../components/Editor";

import supabase from "../../../utils/supabaseClient";

import {shootFireworks} from "../../../utils/Functions";
import DeleteBtn from "../../../components/Buttons/DeletePopup";
import {
    checkPostCreated,
    createPostDraft,
    likeUserPost,
} from "../../../utils/supabaseFunction";
import Upload from "../../../components/Functional/Upload";

const CreatePost = () => {
    const [session, setSession] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [postId, setPostId] = useState("");
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [main, setMain] = useState("");
    const [conclusion, setConclusion] = useState("");
    const [anecdote, setAnecdote] = useState({title: "", content: ""});
    const [relatedArticles, setRelatedArticles] = useState({
        link: "",
        title: "",
    });
    const [width, setWidth] = useState(50);
    const [firstSave, setFirstSave] = useState({bool: true, post_id: 0});
    const [links, setLinks] = useState([]);
    const [credit, setCredit] = useState("");
    const [formValid, setFormValid] = useState({
        title: false,
        introduction: false,
        main: false,
        conclusion: false,
    });
    const [description, setDescription] = useState("");
    const [keyword, setKeyword] = useState("");
    const keywordRef = useRef();
    const [keywords, setKeywords] = useState([]);

    function validateForm(form) {
        const state = Object.keys(form).every((key, index) => {
            return form[key] == true;
        });
        return state;
    }

    const updateKeyword = (e) => {
        if (keyword === "") {
            document.getElementById("keywords").classList.remove("border-red");
        }
        setKeyword(e.currentTarget.value);
    };

    const addKeyword = () => {
        // if text field is empty
        if (keyword === "") {
            keywordRef.current.focus();
            document.getElementById("keywords").classList.add("border-red");
            toast.error("Cannot be empty");
            return;
        } // if keyword already entered
        if (keywords.some((word) => word === keyword)) {
            keywordRef.current.focus();
            toast.error("Keyword already entered");
            return;
        }
        keywords.push(keyword);
        setKeyword("");
    };

    const checkSubmitTag = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            addKeyword();
        }
    };

    const removeKeyword = (index) => {
        setKeywords((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
    };
    useEffect(() => {
        const getSession = async () => {
            try {
                const {
                    data: {session},
                    errorX,
                } = await supabase.auth.getSession();
                if (errorX) throw errorX;
                if (session === null) {
                    toast.error("You need to log in to post!");
                    setTimeout(() => {
                        toast.error("Redirecting to sign up page...");
                    }, 1000);
                    setTimeout(() => {
                        router.push("/signup");
                    }, 3000);
                }
                setSession(session);
                setCredit(session.user.user_metadata.username);
            } catch (errorX) {
            }
        };
        getSession();
    }, []);

    const clearForm = () => {
        setIntroduction("");
        setMain("");
        setConclusion("");
        setFormValid({
            title: false,
            introduction: false,
            benefits: false,
            negatives: false,
        });
    };

    const publishToDatabase = async () => {
        // get first letter for alphabet category and check if letter
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
        if (!session) {
            // return if not logged in
            toast.error("Please log in");
            return;
        }

        // fetch alphabet
        let {data: alphabet, error} = await supabase
            .from("alphabet")
            .select("title, id")
            .eq("title", alphaLetter);
        // check if image uploaded
        let url = "";
        if (image !== null) {
            url = await uploadToServer();
        } else {
            console.log("Error uploading");
        }

        // if no category create catagory then create
        if (!alphabet.length > 0) {
            let {data: alphabet, error: error2} = await supabase
                .from("alphabet")
                .insert({title: alphaLetter})
                .select("id");
            // check if user saved
            if (firstSave.bool) {
                const {data: post, error: error3} = await supabase
                    .from("post")
                    .insert({
                        title: title,
                        introduction: introduction,
                        main: main,
                        conclusion: conclusion,
                        alphabet_id: alphabet[0].id,
                        user_id: session.user.id,
                        published: true,
                        created_at: new Date().toISOString().toLocaleString(),
                        image_width: width,
                    })
                    .select("id");
                const errorK = await supabase.from("contributor").insert({
                    name: credit,
                    post_id: post[0].id,
                    user_id: session.user.id,
                });
                const errorJ = await supabase.from("post_url").insert({
                    text: url,
                    post_id: post[0].id,
                });
                setPostId(post[0].id);
            } else {
                const {data: post, error: error3} = await supabase
                    .from("post")
                    .update({
                        title: title,
                        introduction: introduction,
                        main: main,
                        conclusion: conclusion,
                        alphabet_id: alphabet[0].id,
                        user_id: session.user.id,
                        published: true,
                        created_at: new Date().toISOString().toLocaleString(),
                        image_width: width,
                    })
                    .eq("id", firstSave.post_id)
                    .select("id");
                const errorK = await supabase.from("contributor").insert({
                    name: credit,
                    post_id: post[0].id,
                    user_id: session.user.id,
                });
                if (image !== null) {
                    const errorJ = await supabase.from("post_url").insert({
                        text: url,
                        post_id: post[0].id,
                    });
                }
                setPostId(post[0].id);
            }
            toast.success("Article Posted!");
            shootFireworks();

            setSubmitted(true);
            clearForm();
            return true;
        }

        // check if pre-existing title
        let {data: postTitle, error: error3} = await supabase
            .from("post")
            .select("title")
            .eq("title", title)
            .eq("published", true);

        if (postTitle.length > 0) {
            document.getElementById("title").focus();
            toast.error("Post already exists with this title");
            return;
        }

        // upload post because it doesn't exist
        if (firstSave.bool) {
            const {data: post, error: error3} = await supabase
                .from("post")
                .insert({
                    title: title,
                    introduction: introduction,
                    main: main,
                    conclusion: conclusion,
                    alphabet_id: alphabet[0].id,
                    user_id: session.user.id,
                    published: true,
                    created_at: new Date().toISOString().toLocaleString(),
                    image_width: width,
                })
                .select("id");
            setPostId(post[0].id);
            const errorK = await supabase.from("contributor").insert({
                name: credit,
                post_id: post[0].id,
                user_id: session.user.id,
            });
            if (image !== null) {
                const errorJ = await supabase.from("post_url").insert({
                    text: url,
                    post_id: post[0].id,
                });
            }
        } else {
            const {data: post, error: error3} = await supabase
                .from("post")
                .update({
                    title: title,
                    introduction: introduction,
                    main: main,
                    conclusion: conclusion,
                    alphabet_id: alphabet[0].id,
                    user_id: session.user.id,
                    published: true,
                    created_at: new Date().toISOString().toLocaleString(),
                    image_width: width,
                })
                .eq("id", firstSave.post_id)
                .select("id");
            setPostId(post[0].id);
            const errorK = await supabase.from("contributor").insert({
                name: credit,
                post_id: post[0].id,
                user_id: session.user.id,
            });
            if (image !== null) {
                const errorJ = await supabase.from("post_url").insert({
                    text: url,
                    post_id: post[0].id,
                });
            }
        }
        toast.success("Article Posted!");
        shootFireworks();

        setSubmitted(true);
        clearForm();
        return true;
    };

    const setFirstPostBool = () => {
        setFirstSave((prev) => {
            return {
                ...prev,
                bool: false,
            };
        });
    };

    const setFirstPostId = (post_id) => {
        setFirstSave((prev) => {
            return {
                ...prev,
                post_id,
            };
        });
    };

    const savePost = async () => {
        if (!session) {
            // return if not logged in
            toast.error("Please log in");
            return;
        }
        if (firstSave) {
            setFirstSave((prev) => {
                return {
                    ...prev,
                    bool: false,
                };
            });
        }

        createPostDraft(
            title,
            introduction,
            main,
            conclusion,
            session.user.id,
            firstSave,
            setFirstPostBool,
            setFirstPostId,
            image,
            width
        );
        //toast.success("Article Posted!");
    };

    const submitFields = async (e) => {
        e.preventDefault();
        if (
            (anecdote.title === "" && anecdote.content !== "") ||
            (anecdote.title !== "" && anecdote.content === "")
        ) {
            let elem, query;
            if (anecdote.title === "") {
                elem = document.getElementById("anecdoteTitle");
                query = "title";
            } else {
                elem = document.getElementById("anecdoteContent");
                query = "content";
            }
            elem.focus();
            toast.error(`Please enter ${query}`);
            return;
        }
        if (anecdote.title !== "") {
            const {error} = await supabase.from("anecdote").insert({
                title: anecdote.title,
                content: anecdote.content,
                post_id: postId,
                user_id: session.user.id,
            });
        }

        await Promise.all(
            links.map((link) => {
                return supabase.from("link").insert({
                    title: link.title,
                    url: link.url,
                    post_id: postId,
                });
            })
        );

        const {data, error} = await supabase
            .from("post")
            .update({description})
            .eq("id", postId);

        await Promise.all(
            keywords.map((keyword) => {
                return supabase.from("tags").insert({
                    title: keyword,
                    post_id: postId,
                });
            })
        );
        toast.success("Fields Submitted!");
        router.push(`${window.location.origin}/encyclopedia/${title}`);
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (validateForm(formValid)) {
            // form is valid
            publishToDatabase();
        } else {
            // find first invalid field and focus element
            const firstInvalid = Object.keys(formValid).find((key, index) => {
                return formValid[key] === false;
            });
            let elemInvalid = document.querySelector(`#${firstInvalid} textarea`);

            if (elemInvalid == null) {
                elemInvalid = document.getElementById(firstInvalid);
            }

            elemInvalid.focus();
            toast.error(`Please Fill in ${firstInvalid}`);
        } // check if anedcote field is entered correctly, if not -> focus elem
    };
    // update title usestate and set is valid
    const updateTitle = (e) => {
        if (e.target.value !== "") {
            setFormValid((prev) => {
                return {
                    ...prev,
                    title: true,
                };
            });
        } else {
            setFormValid((prev) => {
                return {
                    ...prev,
                    title: false,
                };
            });
        }
        setTitle(e.target.value);
    };

    // update introduction usestate and set is valid
    const updateIntroduction = (value) => {
        if (value !== "") {
            setFormValid((prev) => {
                return {
                    ...prev,
                    introduction: true,
                };
            });
        } else {
            setFormValid((prev) => {
                return {
                    ...prev,
                    introduction: false,
                };
            });
        }
        setIntroduction(value);
    };

    // update benefits usestate and set is valid
    const updateMain = (value) => {
        if (value !== "") {
            setFormValid((prev) => {
                return {
                    ...prev,
                    main: true,
                };
            });
        } else {
            setFormValid((prev) => {
                return {
                    ...prev,
                    main: false,
                };
            });
        }
        setMain(value);
    };

    // update negatives usestate and set is valid
    const updateConclusion = (value) => {
        if (value !== "") {
            setFormValid((prev) => {
                return {
                    ...prev,
                    conclusion: true,
                };
            });
        } else {
            setFormValid((prev) => {
                return {
                    ...prev,
                    conclusion: false,
                };
            });
        }
        setConclusion(value);
    };

    const updateCredit = (value) => {
        setCredit(value);
    };

    const updateAnecdote = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAnecdote((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const updateLink = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setRelatedArticles((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // check if links are from this website
    const validateLink = (link) => {
        if (link === "") {
            return true;
        }

        const origin = window.location.origin;
        let url;
        // check if valid url, might be unneeded
        const isValidUrl = (link) => {
            try {
                return Boolean(new URL(link));
            } catch (e) {
                return false;
            }
        };

        if (isValidUrl(link)) {
            url = new URL(link);

            //check if comes from this website
            if (origin === url.origin) {
                if (relatedArticles.title !== "") {
                    return true;
                }
            }
        }
        // if invalid
        toast.error("Invalid link");
        return false;
    };

    // add link to link list
    const pushLink = () => {
        //check if valid link
        if (validateLink(relatedArticles.link)) {
            if (
                //check if link is already in list
                links.some((link) => {
                    if (relatedArticles.link === "") return false;
                    return link.url == relatedArticles.link;
                })
            ) {
                toast.error("You've already added this link");
                return;
            } else if (
                links.some((link) => {
                    return link.title === relatedArticles.title;
                })
            ) {
                toast.error("You've already added this title");
                return;
            }
            // push link to list because it's valid
            setRelatedArticles((prev) => {
                return {
                    link: "",
                    title: "",
                };
            });
            setLinks((prev) => {
                return [
                    ...prev,
                    {url: relatedArticles.link, title: relatedArticles.title},
                ];
            });
        }
    };

    const deleteLink = (index) => {
        setLinks((prev) => {
            const arr = [...prev];
            arr.splice(index, 1);
            return arr;
        });
    };

    const linkElems = links.map((link, index) => {
        return (
            <div className="link-line" key={index}>
                <div className="link-text">
                    <h5>{link.title}</h5>
                    <p> {link.url}</p>
                </div>
                <div className="flex item">
                    <div className="close" onClick={() => deleteLink(index)}>
                        {/*<FontAwesomeIcon icon={faClose} className="delete-btn icon-med"/>*/}
                    </div>
                </div>
            </div>
        );
    });

    const [image, setImage] = useState(null);
    const updateImage = (val) => {
        setImage(val);
    };
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

    const updateRange = (e) => {
        setWidth(e.target.value);
    };
    return (
        <Cont colors={COLORS} className="box-shadow">
            <Toaster/>
            {/* Change to !submitted */}
            {!submitted ? (
                <form onSubmit={submitForm}>
                    <input
                        type="text"
                        className="title-form mar-bottom-one"
                        placeholder="Title"
                        value={title}
                        name="title"
                        id="title"
                        onChange={updateTitle}
                    />

                    <div className="form-content">
                        <div className="flex-inline flex-column align-center range-holder">
                            <h3 className="light">Set Image Width</h3>
                            <img style={{width: `${width}%`}} src="/images/eye.jpg"/>

                            <input
                                className="range"
                                type="range"
                                onChange={updateRange}
                                value={width}
                            />
                            <p>{width}%</p>
                        </div>
                        <Upload image={image} updateImage={updateImage}/>
                        <div className="input">
                            <label htmlFor="introduction">
                                <h3 className="light ">Introduction *</h3>
                                <p className="contrast">
                                    Provide a quick introduction to the topic.
                                </p>
                            </label>

                            <div id="introduction">
                                <Editor
                                    id="introduction"
                                    section={introduction}
                                    updateSection={updateIntroduction}
                                    width={width}
                                />
                            </div>
                        </div>
                        <div className="input">
                            <label htmlFor="main">
                                <h3 className="light">Main *</h3>
                                <p className="contrast">
                                    This is your meat and potatoes on the article. What makes this
                                    topic good, bad, etc. Get creative.
                                </p>
                            </label>
                            <div id="main">
                                <Editor
                                    id="main"
                                    section={main}
                                    updateSection={updateMain}
                                    width={width}
                                />
                            </div>
                        </div>
                        <ImgurUpload setText={setMain} text={main}/>
                        <div className="input">
                            <label htmlFor="conclusion">
                                <h3 className="light">Conclusion *</h3>
                                <p className="contrast">
                                    Final statements. Strike a final thought in the readers mind.
                                    Ex. this is detoxing so be careful.
                                </p>
                            </label>
                            <div id="conclusion">
                                <Editor
                                    id="conclusion"
                                    section={conclusion}
                                    updateSection={updateConclusion}
                                    width={width}
                                />
                            </div>
                        </div>
                        <div className="input">
                            <label htmlFor="related">
                                <h3 className="light">Sources</h3>
                            </label>

                            <div
                                style={{alignItems: "flex-end !important"}}
                                className="flex-split  mar-bottom-16 "
                            >
                                <div className="flex-item-100">
                                    <h5 className="black mar-bottom-8">
                                        Link <span className="light ">(optional)</span>
                                    </h5>
                                    <input
                                        type="text"
                                        className=""
                                        placeholder="Link. Ex https://www.primalenjoyer.com/article/Unfrozen%20Meat%20&%20Butter"
                                        value={relatedArticles.link}
                                        name="link"
                                        onChange={updateLink}
                                    />
                                </div>

                                <div className="flex-item-100">
                                    <h5 className="black mar-bottom-8">Title *</h5>
                                    <input
                                        type="text"
                                        className=""
                                        placeholder="Link. Ex Unfrozen Meat & Butter"
                                        value={relatedArticles.title}
                                        name="title"
                                        onChange={updateLink}
                                    />
                                </div>
                            </div>
                            <div onClick={pushLink}>
                                <DefaultBtn text="Add Link"/>
                            </div>
                            <div className="mar-bottom-one"></div>
                            {linkElems}
                        </div>
                        <div className="flex space-between">
                            <NoLinkSubmit text="Submit"/>
                            <div onClick={savePost} className="box-shadow save-btn">
                                <h5>Save your work</h5>
                                {/*<FontAwesomeIcon*/}
                                {/*    icon={faFloppyDisk}*/}
                                {/*    className="  green icon-lg"*/}
                                {/*/>*/}
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <form onSubmit={submitFields} className="second-form">
                    <div className="grid">
                        <div></div>
                        <div className="center-inline">
                            <h1 className="text-shadow">Optional fields</h1>
                        </div>
                        <div className="flex-right">
                            <div
                                onClick={() =>
                                    router.push(`${window.location.origin}/encyclopedia/${title}`)
                                }
                            >
                                <DeleteBtn/>
                            </div>
                        </div>
                    </div>
                    <div className="input">
                        <label htmlFor="credit">
                            <h3 className="light">Credit</h3>
                        </label>
                        <div className="box">{credit}</div>
                    </div>
                    <div className="input">
                        <label htmlFor="anecdote">
                            <h3 className="light">Anecdote</h3>
                        </label>
                        <label htmlFor="anecdoteTitle">
                            <h5 className="black mar-bottom-8">Title</h5>
                        </label>
                        <input
                            type="text"
                            className="mar-bottom-16"
                            placeholder="Title"
                            value={anecdote.title}
                            name="title"
                            id="anecdoteTitle"
                            onChange={updateAnecdote}
                        />
                        <label htmlFor="anecdoteContent">
                            <h5 className="black mar-bottom-8">Content</h5>
                        </label>
                        <textarea
                            type="text"
                            placeholder="Content"
                            value={anecdote.content}
                            name="content"
                            id="anecdoteContent"
                            onChange={updateAnecdote}
                        ></textarea>
                    </div>
                    <div className="input">
                        <label htmlFor="Search Engine Optimization">
                            <h3 className="light">Search Engine Optimization</h3>
                        </label>
                        <p className="contrast mar-bottom-8">
                            This is used to attract page visitors
                        </p>
                        <label htmlFor="description">
                            <h5 className="black mar-bottom-8">Description</h5>
                        </label>
                        <textarea
                            type="text"
                            className="mar-bottom-16"
                            placeholder="Title"
                            value={description}
                            name="description"
                            id="description"
                            onChange={(e) => setDescription(e.currentTarget.value)}
                        />

                        <label htmlFor="keywords">
                            <h5 className="black mar-bottom-8">Keywords</h5>
                        </label>
                        <input
                            type="text"
                            className="mar-bottom-16"
                            placeholder="Ex. milkshake, how to make milkshakes, milkshake recipe, raw milkshake recipe"
                            value={keyword}
                            name="keywords"
                            id="keywords"
                            onChange={updateKeyword}
                            onKeyPress={checkSubmitTag}
                            ref={keywordRef}
                        />
                        <div
                            onClick={addKeyword}
                            className="base-btn-flex btn-blue mar-bottom-16"
                        >
                            <h5 className="text-shadow ">Add</h5>
                            {/*<FontAwesomeIcon*/}
                            {/*    icon={faPlus}*/}
                            {/*    className=" mar-left-8 icon-ssm white"*/}
                            {/*/>*/}
                        </div>
                        <div className="tag-box">
                            {keywords.map((keyword, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => removeKeyword(index)}
                                        className="tag"
                                    >
                                        <p>{keyword}</p>
                                        <div className="white-x">
                                            {/*<FontAwesomeIcon*/}
                                            {/*    icon={faClose}*/}
                                            {/*    className="icon-ssm  cursor"*/}
                                            {/*/>*/}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div onClick={submitFields} className="submit-btn-airplane">
                        <h5>Submit</h5>
                        {/*<FontAwesomeIcon icon={faPaperPlane} className="white-icon"/>*/}
                    </div>
                </form>
            )}
        </Cont>
    );
};

export default CreatePost;
