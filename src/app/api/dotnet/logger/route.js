export async function POST(request) {
    try {
        // send the log object to the dotnet server api
        // it will write a server log file
        const {log} = await request.json();
        const response = await fetch(process.env.NEXT_PUBLIC_DOTNET_API_BASE_URL + "/logger", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(log)
        });


        return response;
    } catch (error) {
        return Response.json({message: error}, {status: 500});
    }

}