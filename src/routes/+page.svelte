<script lang="ts">
    import Home from "$lib/components/base/pages/Home.svelte"; 
</script>

<svelte:head>
    <title>
        Littlepriceonu
    </title>

    <meta property="og:title" content="VERSION 4">
    <meta property="og:description" content="FOR ALL YOUR NEEDS.">
    <meta property="og:image" content="https://littlepriceonu.com/imgs/SKULL.gif">
    <meta property="og:image:alt" content="SAFETY FIRST">

    <meta name="twitter:description" content="WHATS NEXT?">
</svelte:head>

<div class="w-full h-[90%] md:h-full bg-black scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-black scrollbar-thumb-neutral-800 relative overflow-hidden">
    <Home/>

    <div class="absolute w-full h-full flex items-center justify-center">
        <img src="/imgs/SKULL.gif" alt="A SKULL" class="opacity-[.10] md:opacity-[.025]">
    </div>
</div>