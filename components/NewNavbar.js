import Link from 'next/link';
import {useRouter, usePathname} from 'next/navigation';
import React, {useState, useCallback, useRef, useEffect} from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {IoSearchOutline} from "react-icons/io5";

const NewNavbar = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        // get search text

        // redirect to search page with query
        router.push(`/search?query=${text}`);
        setText("");


    }
    return (
        <div className='bg-dark p-4'>
            <div className="flex justify-between items-center gap-4">
                {/** Primal Enjoyer logo */}
                <Link href={"/"}>
                    <div className='hidden md:flex'>
                        <img src="/meat_32.png" alt='meat_logo' className='mr-2'/>
                        <h2 className="text-2xl text--secondary">Primal Enjoyer</h2>
                    </div>
                </Link>
                {/** End of Primal Enjoyer logo */}


                {/** Navbar Links */}
                <div className="hidden lg:flex space-between gap-4 align-center ">
                    <Link href={"/"}>
                        <h4 className="text-lg link- transition">
                            Home
                        </h4>
                    </Link>

                    <Link href={"/articles"}>
                        <h4 className="text-lg link- transition">
                            Articles
                        </h4>
                    </Link>

                    <Link href={"/search"}>
                        <h4 className="text-lg link- transition">
                            Search
                        </h4>
                    </Link>

                    <Link href={"/blogs"}>
                        <h4 className="text-lg link- transition">
                            Blogs
                        </h4>
                    </Link>

                    <Link href={"/recipes"}>
                        <h4 className="text-lg link- transition">
                            Recipes
                        </h4>
                    </Link>

                    <Link href={"/contact"}>
                        <h4 className="text-lg link- transition">
                            Contact
                        </h4>
                    </Link>
                </div>
                {/** End of Navbar Links */}

                {/** Search bar **/}
                <form onSubmit={submitForm}>
                    <label className="input input-bordered flex items-center gap-2 relative">
                        <input id='searchText' type="text" className="w-full min-w-5" placeholder="Search" value={text}
                               onChange={(e) => setText(e.target.value)}/>

                        {text !== "" && (
                            <FontAwesomeIcon
                                onClick={() => setText("")}
                                icon={faCircleXmark}
                                className="text-slate-500 absolute right-20 cursor-pointer hover:text-slate-950 transition res-text-base"
                            />
                        )}
                        <button type='submit'
                                className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <IoSearchOutline
                            />
                        </button>

                    </label>
                </form>
                {/** End of articles bar */}

                {/** Menu Dropdown */}
                <div className="lg:hidden dropdown dropdown-end ">
                    <div tabIndex="0" role="button" className="bg-white btn m-1">
                        <GiHamburgerMenu size={24} className='text--primary'/>
                    </div>
                    <ul tabIndex="0" className="dropdown-content z-[100] bg-white menu p-2 shadow rounded-box w-52">
                        <li>
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={"/articles"}>
                                Articles
                            </Link>
                        </li>

                        <li>
                            <Link href={"/search"}>
                                Search
                            </Link>
                        </li>

                        <li>
                            <Link href={"/blogs"}>
                                Blogs
                            </Link>
                        </li>

                        <li>
                            <Link href={"/recipes"}>
                                Recipes
                            </Link>
                        </li>

                        <li>
                            <Link href={"/contact"}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                {/** End of menu dropdown */}

            </div>

        </div>

    );

};

export default NewNavbar;


