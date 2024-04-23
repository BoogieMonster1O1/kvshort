import {error, redirect} from "@sveltejs/kit";

export async function POST({ request, cookies }) {
    let formData = await request.formData();
    let apiKey = formData.get('api-key') as string | null;
    if (!apiKey) {
        redirect(302, "'/admin")
    }
    cookies.set('api-key', apiKey, { path: '/', httpOnly: true });
    redirect(303, '/')
}
