import Link from "next/link";

const Render = () => {

    return (
        <Link href={"https://buy.stripe.com/3csg2oeQp1DaeYgdQQ"}>

            <div
                className='flex justify-center items-center flex-col text-center mb-16 bg-white mx-auto max-w-xl rounded px-8 py-4'>
                <h3 className="res-heading-xl mb-2">
                    Donation Link
                </h3>
                <p className='mb-4'>
                    Please consider donating to support future development
                </p>

                <button className="bg-emerald-600 text-white rounded px-4 py-2 shadow hover:bg-emerald-700 transition">
                    Donate Now
                </button>
            </div>
        </Link>

    )
};

export default Render;