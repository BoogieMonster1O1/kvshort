import { env } from "$env/dynamic/private";
import {error} from "@sveltejs/kit";
import { type KVNamespace } from '@cloudflare/workers-types';

export function auth(request: Request, cookies: any) {
    if (cookies.get('api-key') != env.API_KEY && request.headers.get('x-api-key') != env.API_KEY) {
        if (cookies.get('api-key') || request.headers.get('x-api-key')) {
            error(403, 'Forbidden')
        }
        error(401, 'Unauthorized');
    }
}


export interface Key {
    name: string,
    expiration: number,
    value: string
}

export interface PartialKey {
    name: string,
    expiration: number
}

export function listLinks(kv: KVNamespace) -> Key[] {
    let keys: PartialKey[] = [];

    let response = await kv.list();
    let listComplete = response.list_complete;
    keys = keys.concat(response.keys);

    while (!listComplete) {
	response = await kv.list({cursor: response.cursor});
	keys = keys.concat(response.keys);
	listComplete = response.list_complete;
    }

    let totalKeys: Key[] = [];

    for (let key of keys) {
	let value = await kv.get(key.name);
	totalKeys.push({
	    name: key.name,
	    expiration: key.expiration,
	    value: value
	});
    }

    totalKeys.sort((a, b) => a.expiration - b.expiration);
    return totalKeys;
}

