import {Validation} from "../../../../lib/classes/Validation";
import {MailList} from "../../../../utils/classes/supabase/MailList";
import MailchimpClient from "../../../../utils/MailchimpClient";


export async function POST(request) {

    const {email} = await request.json();
    const data = {
        email_address: email,
        status: "pending"
    };
    // if email is invalid
    if (!Validation.validateEmail(email)) {
        return new Response(JSON.stringify({
                success: false,
                message: "Invalid email. Email must be in the form johndoe@gmail.com"
            }),
            {status: 400, statusText: "Invalid email"});
    }


    try {

        const response = await fetch(`https://us18.api.mailchimp.com/3.0/lists/${process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_1_ID}/members`, {
            body: JSON.stringify(data),
            headers: {
                Authorization: `apikey ${process.env.NEXT_PUBLIC_MAILCHIMP_CLIENT_KEY}`,
                'Content-Type': "application/json"
            },
            method: 'POST'
        });
        console.log('resposne')
        console.log(response);
        const message = await response.json();
        console.log("message");
        console.log(message);

        if (response.status >= 400) {
            return new Response(JSON.stringify({
                success: false,
                message: "Error: " + message.title + ". Please email primalenjoyer@hotmail.com and I will manually sign you up. Thanks!"
            }), {
                status: response.status,
                statusText: "Invalid"
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Successfully joined. Please check your email for a confirmation email! "
        }), {
            status: 201,
            statusText: "Success"
        })

    } catch (error) {
        return new Response(JSON.stringify({success: false, message: error.message || error.toString()}), {
            status: 500,
            statusText: error.message || error.toString()
        })
    }


}
