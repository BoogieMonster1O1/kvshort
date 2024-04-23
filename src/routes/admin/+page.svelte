<script lang="ts">
    export let data

    let apiKey = ""
</script>

<h1 class="text-5xl font-semibold">Log In</h1>

<form class="flex flex-col" method="post">
    <input type="text" bind:value={apiKey} id="api-key" placeholder="API Key" class="w-80">

    <button type="submit" class="transition bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mt-4">Continue</button>
</form>
