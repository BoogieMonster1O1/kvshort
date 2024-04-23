import {error, redirect} from "@sveltejs/kit";

export async function POST({ request, cookies, platform }) {
    let form = await request.formData();
    let slug = form.get('slug') as string;
    slug = slug.trim();
    if (!slug) {
        error(400, 'Slug is required');
    }
    let url = form.get('url') as string;
    if (platform && platform.env) {
        await platform.env.KV.put(slug, url);
        request
    } else {

    }


}
