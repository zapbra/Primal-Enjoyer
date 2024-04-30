import bg from '../../../public/images/homepage/homepage_hero_image_nature_1920.jpg';
import Explore from '../../../components/introduction/Explore/index.js';
import About from "../../../components/About";
import Donation from "../../../components/introduction/Donation";
import Searchbar from "@/app/home/Searchbar";
import {ArticleDAO} from "../../../utils/classes/supabase/ArticleDAO";


const YOUTUBE_PLAYLIST_ITEMS_API =
    "https://www.googleapis.com/youtube/v3/playlistItems";


export default function Home({data}) {

    return (
        <div>

            <main style={{backgroundImage: `url(${bg.src})`, width: "100%", height: "90vh"}}
                  className=' md:p-8 px-2 py-4 relative bg-cover bg-no-repeat'>
                <div style={{zIndex: "1"}} className={'relative mx-auto max-w-4xl '}>
                    <h1 className="res-heading-2xl mb-8">Primal Enjoyer.com</h1>

                    <h3 className="res-heading-base mb-4">Discover the truth of a healthy diet by eating natural raw
                        foods</h3>

                    <h3 className="res-heading-base mb-8"><b>Feel</b> your best, <b>look</b> your best
                        and <b>age</b> your
                        best
                    </h3>
                    {/** Search bar */}
                    <Searchbar/>
                    {/** End of search bar */}

                </div>
                <div className="absolute opacity-30 bg-light h-full w-full left-0 top-0" style={{zIndex: "0"}}></div>

            </main>
            <Explore/>

            <About
            />
            <div className="mb-16"></div>

            <Donation
            />


        </div>

    );
}
