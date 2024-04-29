"use client";

import Link from "next/link";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Head from "next/head";
import supabase from "../../../utils/supabaseClient";
import toast, {Toaster} from "react-hot-toast";
import {shootFireworks} from "../../../utils/Functions";

import {
    checkUsernameUnique,
    checkEmailUnique,
} from "../../../utils/supabaseFunction";

const Signup = () => {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: {errors},
    } = useForm();
    const [loading, setLoading] = useState(false);
    const password = watch("password", "");
    const [errorMsg, setErrorMsg] = useState("");
    const onSubmit = handleSubmit(async (formData) => {
        setLoading(true);

        const createUser = async () => {
            setErrorMsg("");
            try {
                const {
                    data: {user},
                    error,
                } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            username: formData.username,
                            avatar_url: "anon",
                        },
                    },
                });

                if (error) throw error;
                setValue("username", "");
                setValue("email", "");
                setValue("password", "");
                setValue("confirmPassword", "");
                shootFireworks();
                toast.success("Thanks for signing up!");
                window.scrollTo(0, 0);
                setTimeout(() => {
                    toast("Please check your email for a confirmation link!", {
                        duration: 8000,
                        position: "top-center",

                        // Styling
                        style: {},
                        className: "",

                        // Custom Icon
                        icon: "✉️",

                        // Change colors of success/error/loading icon
                        iconTheme: {
                            primary: "#000",
                            secondary: "#fff",
                        },

                        // Aria
                        ariaProps: {
                            role: "status",
                            "aria-live": "polite",
                        },
                    });
                }, 1500);
                setShowPopup(true);
            } catch (error) {
                toast.error(error.error_description || error.messsage);
            } finally {
                setLoading(false);
            }
        };
        // check if user name is unique
        checkUsernameUnique(formData.username).then((res) =>
            res // is unique then check email unqiue
                ? checkEmailUnique(formData.email).then((res) =>
                    // is unique then create user, not send error message
                    res ? createUser() : setErrorMsg("Email taken")
                ) // username isn't unique
                : setErrorMsg("Username taken")
        );
    });
    const hidePopup = () => {
        setShowPopup(false);
    };
    const meta = {
        title: "Sign up",
        description:
            "Sign up page for Primal Enjoyer. Create an account to write posts, save posts, and write comments.",
        link: "https://www.primalenjoyer.com/signup",
        type: "website",
        date: "2022-12-11 15:00:00.000",
        image: "/seo/signup.PNG",
        keywords:
            "aajonus vonderplanitz, raw meat, health, information, raw primal, diet, signup",
    };
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index"/>
                <meta property="og:type" content={meta.type}/>
                <meta property="og:site_name" content="Primal Enjoyer"/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:title" content={meta.title}/>
                <meta property="og:image" content={meta.image}/>
                <meta property="article:published_time" content={meta.date}/>
                <link rel="canonical" href={meta.image}/>
                <meta property="og:url" content={meta.link}/>
                <meta name="keywords" content={meta.keywords}/>

                <meta name="description" content={meta.description}/>
            </Head>
            <div onSubmit={onSubmit}>
                {showPopup && (
                    <>
                        <div className="popup-screen"></div>
                        <div className="popup-cont">
                            {/*<Popup hidePopup={hidePopup} />*/}
                        </div>
                    </>
                )}

                <Toaster/>
                <div className="center-inline  ssm-spacer">
                    <h1 className="text-shadow mar-bottom-16">Create New Account!</h1>
                    <p>Already have an account? </p>
                    <span>
            <Link href={{pathname: "/login"}}>
              <p className="link-blue inline-block">Sign In</p>
            </Link>
          </span>
                </div>

                <form className=" box-shadow shallow-cont">
                    <div className="center-inline mar-bottom-one">
                        <h3 className="text-shadow">Thanks for signing up!</h3>
                    </div>
                    <div className="input-line">
                        <label htmlFor="username">
                            <h4 className="black">Username</h4>
                        </label>
                        <input
                            {...register("username", {
                                required: true,
                                pattern: {
                                    value: /^[a-zA-Z0-9_.]{6,20}$/,
                                    message: "6-20 letters. Only letters, numbers or _.",
                                },
                            })}
                            type="text"
                            placeholder="Username"
                            name="username"
                        />
                    </div>
                    <br/>
                    <div className="input-line">
                        <label htmlFor="email">
                            <h4 className="black">Email</h4>
                        </label>
                        <input
                            {...register("email", {required: true})}
                            type="email"
                            placeholder="Email"
                            name="email"
                        />
                    </div>
                    <br/>
                    <div className="input-line">
                        <label htmlFor="password">
                            <h4 className="black">Password</h4>
                        </label>
                        <input
                            {...register("password", {
                                required: true,
                                pattern: {
                                    value: /.{6,30}/,
                                    message: "Password must be 6-30 characters",
                                },
                            })}
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="mar-bottom-one"
                        />
                    </div>
                    <div className="input-line confirm-password">
                        <label htmlFor="confirmPassword">
                            <h4 className="black">Confirm Password</h4>
                        </label>
                        <input
                            {...register("confirmPassword", {
                                required: true,
                                validate: (value) =>
                                    value === password || "The passwords do not match",
                                message: "hello",
                            })}
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className="mar-bottom-one"
                        />
                    </div>
                    <br/>
                    {Object.keys(errors).length > 0 && (
                        <div className="form-errors">
                            {errors.username?.type === "required" && (
                                <p>*Username is required</p>
                            )}
                            {errors.email?.type === "required" && <p>*Email is required</p>}
                            {errors.password?.type === "required" && (
                                <p>*Password is required</p>
                            )}
                            {errors.username?.type === "pattern" && (
                                <p>{errors.username.message}</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p>{errors.password.message}</p>
                            )}
                            {errors.confirmPassword?.type === "pattern" && (
                                <p>{errors.confirmPassword.message}</p>
                            )}
                            {errors.confirmPassword?.type === "required" && (
                                <p>Confirm Password.</p>
                            )}
                            {errors.confirmPassword?.type === "validate" && (
                                <p>Passwords do not match</p>
                            )}
                        </div>
                    )}
                    {errorMsg && <p className="red mar-bottom-16">{errorMsg}</p>}
                    {/*<LinkBtn />*/}
                </form>
                <div className="sm-spacer"></div>
            </div>
        </>
    );
};

export default Signup;
