import supabase from "../../../../utils/supabaseClient";
import Render from "./Render";
import {TimecodeDAO} from "../../../../utils/classes/supabase/TimecodeDAO";
import {DotNetApi} from "../../../../utils/classes/DotNetApi/DotNetApi";


export async function generateStaticParams() {
    const {data, error} = await supabase.from("timecodes").select("name");

    return data.map((timecode) => {
        return {name: timecode.name};
    });
}

const Page = async ({params}) => {
    // extract name from url
    const name = decodeURIComponent(params.name);

    const pathname = "/timecode/" + name;

    // get full post data
    const {data, success} = await TimecodeDAO.getPostByName(name);

    // Send a log based on fetch condition
    // if (success) {
    //     await DotNetApi.writeLog(pathname, `Successfully visited ${name} timecode page`);
    // } else {
    //     await DotNetApi.writeLog(pathname, `Successfully visited ${name} timecode page`);
    // }

    return (
        <div>
            <Render timecode={data}/>
        </div>
    );
};

export default Page;
