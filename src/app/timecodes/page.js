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
    const data = await fetchData();
    const previewData = data.props.data;
    const timecodeFile = await fs.readFile(process.cwd() + '/src/app/data/timecodes.json', 'utf-8');
    const timecodeData = JSON.parse(timecodeFile);

    return (
        <div>
            <Render previewData={previewData} timecodeData={timecodeData}></Render>
        </div>
    );
};

export default Page;
