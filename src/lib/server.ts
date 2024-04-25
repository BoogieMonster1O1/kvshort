import { env } from "$env/dynamic/private";
import {error} from "@sveltejs/kit";

export function auth(request: Request, cookies: any) {
    if (cookies.get('api-key') != env.API_KEY && request.headers.get('x-api-key') != env.API_KEY) {
        if (cookies.get('api-key') || request.headers.get('x-api-key')) {
            error(403, 'Forbidden')
        }
        error(401, 'Unauthorized');
    }
}
