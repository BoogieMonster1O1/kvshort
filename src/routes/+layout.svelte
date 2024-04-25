<script>
  import "../app.css";
</script>

<svelte:head>
    <title>URL Shortener</title>
</svelte:head>

<div class="flex flex-col min-h-screen justify-center items-center">
    <div class="flex flex-col min-h-screen justify-center items-center max-w-screen-md gap-4">
        <slot />
    </div>
</div>
