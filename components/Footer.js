import Link from 'next/link';
import React from "react";

const Footer = () => {

    return (
        <div className='bg-dark  '>

            <div className="flex justify-between max-w-7xl mx-auto px-8 py-4">
                {/** Left side links */}
                <div>
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

                    <Link href={"/categories"}>
                        <p className="text--secondary link-">
                            Categories
                        </p>
                    </Link>
                </div>
                {/** End of left side links */}

                {/** Right side newsletter & feedback */}
                <div className='text-right'>
                    <h5 className="res-heading-sm font-bold text--secondary mb-2">
                        Newsletter & Updates
                    </h5>

                    <label className="input input-bordered flex items-center gap-2 mb-4">
                        <input type="text" className="grow" placeholder="Email"/>
                        <button
                            className="transition bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                            Join
                        </button>
                    </label>

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