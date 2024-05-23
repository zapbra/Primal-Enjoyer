import Render from "./Render";
import supabase from "../../../utils/supabaseClient";
import {promises as fs} from 'fs';
import {DotNetApi} from "../../../utils/classes/DotNetApi/DotNetApi";


export async function fetchData() {
    const {data, error} = await supabase.from("timecodes").select("name, article_titles");
    return {
        props: {
            data,
        },
    };
}

const Page = async () => {
    const pathname = "/search";

    // get timecode names
    const data = await fetchData();
    const previewData = data.props.data;

    // get json file with all timecode data
    const timecodeFile = await fs.readFile(process.cwd() + '/src/app/data/timecodes.json', 'utf-8');
    let timecodeData = JSON.parse(timecodeFile);

    /*
        // Send a log based on if timecode data was read from file properly
        if (timecodeData.length >= 0) {
            await DotNetApi.writeLog(pathname, "Successfully visited search page");
        } else {
            await DotNetApi.writeLog(pathname, "Failed to visit search page. Didn't load timecodes properly");
        }
    */
    return (
        <div>
            <Render previewData={previewData} timecodeData={timecodeData}></Render>
        </div>
    );
};

export default Page;
