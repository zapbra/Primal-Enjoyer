import React from "react";
import Link from 'next/link';

const ExploreCard = ({img, title, link, description}) => {

    return (
        <div className='bg-white shadow p-4 rounded w-80 '>

            <div className='flex-oe'>
                <img src={img}
                     alt={title}
                     className={'mb-8'}
                />
            </div>

            <div className='flex-oe'>
                <h3 className="res-heading-base mb-2">
                    {title}
                </h3>

                <p className='mb-4'>
                    {description}
                </p>
                <div className="flex justify-end">
                    <Link href={link}>
                        <button
                            className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Visit
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    )
};

export default ExploreCard;