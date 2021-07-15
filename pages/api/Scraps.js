import { SiteClient } from "datocms-client";

export default async function dataRequestReceiver(request, response) {
    const TOKEN = '0ce6dfe94724bdb541334337372096';
    const client = new SiteClient (TOKEN);
    if (request.method === 'POST') {
        const register = await client.item.create({
            itemType: '972628',
            ...request.body,
        });

        response.json({
            register
        })
        return;
    }

    response.status(404).json({
        message: 'Method not allowed'
    })
}