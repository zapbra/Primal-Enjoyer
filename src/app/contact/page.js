import Render from './Render';

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
const Contact = () => {

    return (
        <Render/>
    )
};

export default Contact;