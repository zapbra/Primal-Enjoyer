import {MailList} from "../utils/classes/supabase/MailList";
import {test, expect} from 'vitest';
import {Validation} from "../lib/classes/Validation";


/*
test('Inserted email', () => {
    expect(response).toBe(true);
});

*/


const response = await fetch(process.env.SITE_URL + "/api/email", {
    method: "POST",
    body: JSON.stringify({email: "jamesr@gmail.com"})
});

console.log("response")
console.log(response)

