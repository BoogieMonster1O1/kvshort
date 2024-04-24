import {error, json, redirect} from "@sveltejs/kit";

interface Body {
    url: string;
    slug: string;
    expiration: number | null;
}

export async function POST({ request, cookies, platform }) {
    let body: Body = await request.json() as Body;

    let slug = body.slug;
    slug = encodeURI(slug.trim());
    if (!slug) {
        error(400, 'Slug is required');
    }
    if (platform && platform.env) {
        if (body.expiration) {
            await platform.env.KV.put(slug, body.url, {expiration: body.expiration});
        } else {
            await platform.env.KV.put(slug, body.url);
        }
    } else {
        error(500, 'No platform available');
    }

    return json({slug: slug, url: body.url, expiration: body.expiration});
}
