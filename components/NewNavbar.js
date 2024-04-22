import Link from 'next/link';
import {useRouter, usePathname} from 'next/navigation';
import {useState, useCallback, useRef, useEffect} from "react";
import {GiHamburgerMenu} from "react-icons/gi";

const NewNavbar = () => {

    return (
        <div className='bg-dark p-4'>
            <div className="flex justify-between items-center gap-8">
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

                    <Link href={"/search"}>
                        <h4 className="text-lg link- transition">
                            Search
                        </h4>
                    </Link>

                    <Link href={"/timecodes"}>
                        <h4 className="text-lg link- transition">
                            Transcriptions
                        </h4>
                    </Link>

                    <Link href={"/encyclopedia"}>
                        <h4 className="text-lg link- transition">
                            Blogs
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
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search"/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="w-4 h-4 opacity-70">
                        <path fill-rule="evenodd"
                              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                              clip-rule="evenodd"/>
                    </svg>
                </label>
                {/** End of search bar */}

                {/** Menu Dropdown */}
                <div className="lg:hidden dropdown dropdown-end ">
                    <div tabIndex="0" role="button" className="bg-white btn m-1">
                        <GiHamburgerMenu size={24} className='text--primary'/>
                    </div>
                    <ul tabIndex="0" className="dropdown-content z-[1] bg-white menu p-2 shadow rounded-box w-52">
                        <li>
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={"/search"}>
                                Search
                            </Link>
                        </li>

                        <li>
                            <Link href={"/viewall"}>
                                View All
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


