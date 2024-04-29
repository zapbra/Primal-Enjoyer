"use client";

import {useRouter} from "next/navigation";

const Searchbar = () => {
    const router = useRouter();
    const submitForm = (e) => {
        e.preventDefault();
        const searchElement = document.getElementById("search");
        router.push(`/search?query=${searchElement.value}`);
    }

    return (
        <form onSubmit={submitForm}>

            <label className="input input-bordered flex items-center gap-2 py-8 px-4">
                <input id="search" type="text"
                       className="grow min-w-5" placeholder="Search the Aajonus database..."/>

                <button type='submit'
                        className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search
                </button>
            </label>
        </form>
    )
};

export default Searchbar;