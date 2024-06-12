import {error, redirect} from "@sveltejs/kit";

export async function GET({ request, cookies }) {
    cookies.set('api-key', undefined, { path: '/', httpOnly: true });
    redirect(302, '/admin')
}
