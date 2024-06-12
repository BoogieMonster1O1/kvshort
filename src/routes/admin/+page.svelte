<script lang="ts">
 import ShortlinkCreator from '$lib/ShortlinkCreator.svelte'
 
 interface Props {
     invalid: boolean,
     auth: boolean
 }
 
 export let data: Props

 let apiKey = ""
</script>

{#if data.auth}
    <ShortlinkCreator />
{:else}
    <h1 class="text-5xl font-semibold">Log In</h1>

    <form class="flex flex-col" method="post" action="/admin/login">
	<input type="password" bind:value={apiKey} id="api-key" name="api-key" placeholder="API Key" class="w-80">

	<button type="submit" class="transition bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mt-4">Continue</button>
    </form>
{/if}
