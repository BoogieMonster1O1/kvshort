import type { PageServerLoad } from './$types';
import { listLinks } from '$lib/server';
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, platform }) => {
    let cookie = cookies.get('api-key');
    
    if (!cookie || cookie != env.API_KEY) {
        redirect('/');
    } else if (!platform || !platform.env || !platform.env.KV) {
	error(500, 'No platform available');
    }
    
    return listLinks(platform.env.KV);
};
