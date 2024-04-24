<script lang="ts">
    import {expirations} from "$lib";

    let url = '';
    let slug = '';
    $: encodedSlug = encodeURI(slug.trim());
    let setToExpire = false;
    let expiration = 'In a day';
    $: hasCustomExpiration = expiration === 'Custom';
    let customExpiration = new Date()

    function submit() {
        let expirationDate;

        if (!encodedSlug) {
            return;
        }

        if (setToExpire) {
            if (hasCustomExpiration) {
                expirationDate = customExpiration.toISOString();
            } else {
                expirationDate = expirations[expiration]().toISOString();
            }
        } else {
            expirationDate = null;
        }

        fetch(`/${encodedSlug}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url,
                expiration: expirationDate
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }

            alert('Failed to shorten URL')
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });
    }
</script>

<h1 class="text-5xl font-semibold">URL Shortener</h1>

<form class="flex flex-col" method="post" on:submit|preventDefault={submit}>
    <input type="text" placeholder="URL" bind:value={url}>

    <input type="text" placeholder="Slug (optional)" class="mt-4" bind:value={slug}>

    <label class="mt-4">
        <input type="checkbox" bind:checked={setToExpire}>
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
