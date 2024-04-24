import {error, redirect} from "@sveltejs/kit";

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
