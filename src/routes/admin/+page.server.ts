import type { PageServerLoad } from './$types';
import {env} from "$env/dynamic/private";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
    let cookie = cookies.get('api-key');
    console.log(`Cookie: ${cookie}`);
    if (!cookie) {
        // No api key
        console.log('No api key');
        return {
            invalid: false
        }
    }

    if (cookie == env.API_KEY) {
        console.log('Correct api key');
        // Correct api key
        redirect(302, '/')
    }

    // Incorrect api key
    console.log('Incorrect api key');
    return {
        invalid: true
    }
}
