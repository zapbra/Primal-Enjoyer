import Render from "./Render";
import supabase from "../../../utils/supabaseClient";
import {promises as fs} from 'fs';

export async function fetchData() {
    const {data, error} = await supabase.from("timecodes").select("name");
    return {
        props: {
            data,
        },
    };
}

const Page = async () => {
    // get timecode names
    const data = await fetchData();
    const previewData = data.props.data;
    // get json file with all timecode data
    const timecodeFile = await fs.readFile(process.cwd() + '/src/app/data/timecodes.json', 'utf-8');
    let timecodeData = JSON.parse(timecodeFile);
    timecodeData = timecodeData.map(timecodeObj => {
        return {
            ...timecodeObj,
            content: timecodeObj.content.toLowerCase()
        }
    });
    return (
        <div>
            <Render previewData={previewData} timecodeData={timecodeData}></Render>
        </div>
    );
};

export default Page;
