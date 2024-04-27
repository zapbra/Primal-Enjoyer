import client from '@mailchimp/mailchimp_marketing'

client.setConfig({
    apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_CLIENT_KEY,
    server: "us18"
});

export default client;