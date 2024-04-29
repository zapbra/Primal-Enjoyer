"use client"
import Link from 'next/link';
import React from "react";
import toast, {Toaster} from "react-hot-toast";

const Footer = () => {

    const validateAndPostEmail = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email');
        // make sure email is valid and send request to email subscriber server
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/email", {
            method: "POST",
            body: JSON.stringify({email: email.value})
        });

        const message = await response.json();

        // Successfully signed up
        if (message.success) {
            toast.success(message.message);
            email.value = "";
        } else {
            toast.error(message.message);
        }


    }
    return (
        <div className='bg-dark  '>
            <Toaster/>
            <div className="flex flex-wrap justify-between max-w-7xl mx-auto px-4 pt-2 pb-8 md:px-8 md:py-4">
                {/** Left side links */}
                <div className='mb-4 md:mb-0'>
                    <Link href={"/"}>
                        <p className="text--secondary link- mb-2">
                            Home
                        </p>
                    </Link>

                    <Link href={"/search"}>
                        <p className="text--secondary link- mb-2">
                            Search
                        </p>
                    </Link>

                    <Link href={"/articles"}>
                        <p className="text--secondary link- mb-2">
                            Articles
                        </p>
                    </Link>

                    <Link href={"/blogs"}>
                        <p className="text--secondary link- mb-2">

                        </p>
                    </Link>

                    {/*<Link href={"/categories"}>*/}
                    {/*    <p className="text--secondary link- mb-2">*/}
                    {/*        Categories*/}
                    {/*    </p>*/}
                    {/*</Link>*/}


                    <Link href={"/blogs"}>
                        <p className="text--secondary link- mb-2">
                            Blogs
                        </p>
                    </Link>

                    <Link href={"/contact"}>
                        <p className="text--secondary link-">
                            Contact
                        </p>
                    </Link>
                </div>
                {/** End of left side links */}

                {/** Right side newsletter & feedback */}
                <div className='text-right w-full sm:w-auto'>
                    <h5 className="res-heading-sm font-bold text--secondary mb-2">
                        Newsletter & Updates
                    </h5>
                    <form onSubmit={validateAndPostEmail} className='flex justify-end'>
                        <label className="input input-bordered flex items-center gap-2 mb-4 max-w-64 w-full">
                            <input id='email' type="text" className="grow min-w-5 " placeholder="Email"/>
                            <button
                                type='submit'
                                className="transition bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                                Join
                            </button>
                        </label>
                    </form>


                    <h5 className="res-heading-sm font-bold text--secondary mb-2">
                        Feedback
                    </h5>

                    <Link href={"/contact"}>
                        <p className="text--secondary underline hover:text-blue-400 transition">
                            Send a message
                        </p>
                    </Link>
                </div>
                {/** End of right side newsletter & feedback */}
            </div>
        </div>
    )
};


export default Footer;