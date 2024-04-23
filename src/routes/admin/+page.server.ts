import type { PageServerLoad } from './$types';
import {API_KEY} from "$env/static/private";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
    let cookie = cookies.get('api-key');
    if (!cookie) {
        // No api key
        return {
            invalid: false
        }
    }

    if (cookie == API_KEY) {
        // Correct api key
        redirect(302, '/')
    }

    // Incorrect api key
    return {
        invalid: true
    }
}
