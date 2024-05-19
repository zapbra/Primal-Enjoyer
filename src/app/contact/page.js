import Render from './Render';
import {headers} from 'next/headers';
import {DotNetApi} from "../../../utils/classes/DotNetApi/DotNetApi";

export const metadata = {
    title: "Contact Page",
    description: "Send a message if you have any questions related to the primal diet or other inquiries.",
    openGraph: {
        images: [
            {
                url: "/seo/contact_opengraph.png"
            }
        ]
    }
};
const Contact = async () => {
    const header = headers();
    const pathname = header.get('next-url');
    await DotNetApi.writeLog(pathname, "Visited contact page");

    
    return (
        <Render/>
    )
};

export default Contact;