"use client";

import Link from "next/link";
import Head from "next/head";
import {useForm} from "react-hook-form";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import LinkBtn from "../../../components/Buttons/LinkBtn";
import supabase from "../../../utils/supabaseClient";
import toast, {Toaster} from "react-hot-toast";
import {shootFireworks} from "../../../utils/Functions";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/solid";

import COLORS from "../../../data/colors";

const Singin = () => {
    // variables for hiding/showing password
    const [passwordState, setPasswordState] = useState("password");
    const [passwordBool, setPasswordBool] = useState(false);
    const [error, setError] = useState(false);
    const [session, setSession] = useState({});
    const [collections, setCollections] = useState([]);
    const router = useRouter();
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: {errors},
    } = useForm();

    // set the type of password input and set variable which eye icon depends on true/false
    const togglePasswordState = () => {
        setPasswordState((prev) => {
            if (prev === "password") {
                setPasswordBool(true);
                return "text";
            }
            setPasswordBool(false);
            return "password";
        });
    };

    // form submit
    const onSubmit = handleSubmit(async (formData) => {
        // login user
        const {data, error} = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        // if no error clear screen, and redirect
        if (error === null) {
            setError(false);
            setValue("email", "");
            setValue("password", "");
            shootFireworks();
            toast.success(
                `You are now signed in as ${data.user.user_metadata.username}`
            );

            router.push("/account");
        } else {
            setError(true);
        }
    });

    useEffect(() => {
        const updateSession = async () => {
            const {data} = await supabase.auth.getSession();

            setSession(data);
        };
        updateSession();
    }, []);
    const meta = {
        title: "Login",
        description: "Login to Primal Enjoyer.",
        link: "https://www.primalenjoyer.com/signup",
        type: "website",
        date: "2022-12-11 15:00:00.000",
        image: "/seo/login.PNG",
        keywords:
            "aajonus vonderplanitz, raw meat, health, information, raw primal, diet, login",
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

            <div colors={COLORS}>
                <Toaster/>
                <div className="center-inline ssm-spacer">
                    <h1 className="text-shadow mar-bottom-16">Sign in</h1>
                    <p>Don't have an account? </p>
                    <span>
            <Link href={{pathname: "/signup"}}>
              <p className="link-blue inline-block">Sign Up</p>
            </Link>
          </span>
                </div>

                <form onSubmit={onSubmit} className=" box-shadow shallow-cont">
                    <div className="center-inline mar-bottom-one">
                        <h3 className="text-shadow">Nice to see you again!</h3>
                    </div>
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
                        <div className="flex-spec mar-bottom-one">
                            <input
                                {...register("password", {
                                    required: true,
                                })}
                                type={passwordState}
                                placeholder="Password"
                                name="password"
                            />
                            {passwordBool ? (
                                <div className="eye-icon" onClick={togglePasswordState}>
                                    <EyeIcon className="hero-icon-sm"/>
                                </div>
                            ) : (
                                <div className="eye-icon" onClick={togglePasswordState}>
                                    <EyeOffIcon className="hero-icon-sm"/>
                                </div>
                            )}
                        </div>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="form-errors">
                            {errors.email?.type === "required" && <p>*Email is required</p>}
                            {errors.password?.type === "required" && (
                                <p>*Password is required</p>
                            )}
                        </div>
                    )}
                    {error && (
                        <div className="center-inline mar-bottom-16">
                            <p className="red">Invalid login credentials</p>
                        </div>
                    )}
                    <LinkBtn/>
                </form>

                <div className="sm-spacer"></div>
            </div>
        </>
    );
};

export default Singin;
