import type { PageServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";
import {env} from "$env/dynamic/private";

export const load: PageServerLoad = async ({ cookies }) => {
    let cookie = cookies.get('api-key');
    // No api key
    if (!cookie) {
        redirect(302, '/admin')
    }
    // Incorrect api key
    if (cookie !== env.API_KEY) {
        redirect(302, '/admin')
    }
}
