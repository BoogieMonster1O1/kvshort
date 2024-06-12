import {error, json, redirect} from "@sveltejs/kit";

import { listLinks, auth} from "$lib/server";

export async function GET({ params, platform }) {
    auth(request, cookies);
    return json(listLinks(platform));
}
