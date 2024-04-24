<script lang="ts">
    import {expirations} from "$lib";
    import {page} from "$app/stores";

    let url = '';
    let slug = '';
    $: encodedSlug = encodeURI(slug.trim());
    let setToExpire = false;
    let expiration = 'In a day';
    $: hasCustomExpiration = expiration === 'Custom';
    let customExpiration = new Date()
    let showModal = false;

    function submit() {
        let expirationDate;

        if (!encodedSlug || !url) {
            console.log('Skipping, missing required fields')
            return;
        }

        if (setToExpire) {
            if (hasCustomExpiration) {
                expirationDate = parseInt((customExpiration.valueOf() / 1000).toFixed(0));
            } else {
                expirationDate = parseInt((expirations[expiration]().valueOf() / 1000).toFixed(0));
            }
        } else {
            expirationDate = null;
        }

        let body = JSON.stringify({
            url: url,
            expiration: expirationDate
        })

        console.log(body);

        fetch(`/${encodedSlug}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(response => {
            if (response.ok) {
                showModal = true;
            } else if (response.status == 500) {
                alert('No platform available. Check your runtime');
            }
        }).catch(error => {
            console.error(error);
        });
    }
</script>

<h1 class="text-5xl font-semibold">URL Shortener</h1>

<form class="flex flex-col" method="post" on:submit|preventDefault={submit}>
    <label for="url" class="mt-4 text-lg">URL</label>
    <input type="text" placeholder="Enter the URL" bind:value={url}>

    <label for="slug" class="mt-4 text-lg">Slug</label>
    <input type="text" placeholder="Enter the Slug" class="" bind:value={slug}>

    <label class="mt-4">
        <input type="checkbox" bind:checked={setToExpire} class="text-3xl">
        Set to expire
    </label>

    {#if setToExpire}
        <select class="mt-4" bind:value={expiration}>
            {#each Object.keys(expirations) as key}
                <option value={key}>{key}</option>
            {/each}
        </select>

        {#if hasCustomExpiration}
            <input type="datetime-local" class="mt-4" bind:value={customExpiration}>
        {/if}
    {/if}

    <button type="submit" class="w-80 transition bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mt-4">Shorten</button>
</form>

{#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="flex flex-col gap-2 relative p-4 rounded dark:bg-neutral-700 bg-neutral-200">
            <h2 class="text-2xl">Shortened URL</h2>
            <a href={`${$page.url.origin}/${encodedSlug}`} class="text-3xl text-sky-400 hover:text-sky-500 transition">{$page.url.origin}/{encodedSlug}</a>
            <button class="transition bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" on:click={() => showModal = false}>Close</button>
        </div>
    </div>
{/if}
