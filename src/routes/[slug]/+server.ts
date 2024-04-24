import {error, json, redirect} from "@sveltejs/kit";

import {auth} from "$lib/server";

export async function GET({ params, platform }) {
    if (!platform || !platform.env) {
        error(500, 'No platform available');
    }

    let slug = params.slug;
    let url = await platform.env.KV.get(slug);
    if (!url) {
        error(404, 'Not found');
    }
    redirect(302, url);
}

interface Body {
    url: string;
    expiration: number | null;
}

export async function POST({ params, request, cookies, platform }) {
    auth(request, cookies);

    let body: Body = await request.json() as Body;

    let slug = params.slug;
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

export async function DELETE({ params, request, cookies, platform }) {
    auth(request, cookies);

    let slug = params.slug;
    if (platform && platform.env) {
        await platform.env.KV.delete(slug);
    } else {
        error(500, 'No platform available');
    }

    return json({slug: slug});
}

// TODO: add PATCH for retroactively updating url
