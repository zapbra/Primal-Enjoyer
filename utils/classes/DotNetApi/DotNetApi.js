export class DotNetApi {

    static async writeLog(pathname, message) {
        try {

            const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/dotnet/logger", {
                method: "POST",
                body: JSON.stringify({log: {PagePath: pathname, Message: message}})
            });

            return await response.json();
        } catch (error) {
            return error.message;
        }
    }
}