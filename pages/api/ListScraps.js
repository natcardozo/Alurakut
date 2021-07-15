export default async function dataRequestReceiver(request, response) {
    const TOKEN = "0ce6dfe94724bdb541334337372096";
    if (request.method === 'POST') {
        const register = fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
              'Authorization': TOKEN,
              'Content-type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ "query": `query {
                allScraps {
                    id,
                    user,
                    message
                }
            }` })
          })
        .then(async (response) => {
            return await response.json();          
        })
        const listScraps = await Promise.resolve(register)
        response.json(listScraps.data.allScraps)
        return;
    }

    response.status(404).json({
        message: 'Method not allowed'
    })
}