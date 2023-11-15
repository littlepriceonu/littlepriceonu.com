<script lang="ts">
    import Projects from "$lib/components/base/pages/Projects.svelte";
</script>

<svelte:head>
    <title>
        Littlepriceonu | Projects
    </title>

    <meta property="og:title" content="ACCESS GRANTED">
    <meta property="og:description" content="FOREIGN CONNECTION DETECTED.">
    <meta property="og:image" content="https://littlepriceonu.com/PFP.gif">
    <meta property="og:image:alt" content="WHAT ARE YOU LOOKING AT?">

    <meta name="twitter:description" content="WHATS NEXT?">
</svelte:head>

<div class="w-full h-[90%] md:h-full bg-black scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-black scrollbar-thumb-neutral-800 relative overflow-hidden">
    <Projects />

    <div class="absolute w-full h-full flex items-center justify-center">
        <img src="/imgs/SKULL.gif" alt="A SKULL" class="opacity-[.10] md:opacity-[.025]">
    </div>
</div>