import {error, redirect} from "@sveltejs/kit";

export async function POST({ request, cookies }) {
    let formData = await request.formData();
    let apiKey = formData.get('apiKey') as string | null;
    if (!apiKey) {
        error(302, "'/admin")
    }
    cookies.set('apiKey', apiKey, { path: '/', httpOnly: true });
    redirect(303, '/')
}
