<script lang="ts">
    import { page } from "$app/stores";

    let code: string[] = $page.status.toString().split("")
</script>

<svelte:head>
    <title>
        {$page.status}
    </title>

    <meta property="og:title" content="{$page.status.toString()}">
    <meta property="og:description" content="YOU'RE MISSING SOMETHING OUT THERE">
    <meta property="og:image" content="https://littlepriceonu.com/imgs/SKULL.gif">
    <meta property="og:image:alt" content="SAFETY FIRST">

    <meta name="twitter:description" content="WHATS NEXT?">
</svelte:head>

<div class="w-full h-[90%] md:h-full bg-black scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-black scrollbar-thumb-neutral-800 flex flex-col relative overflow-hidden px-6 py-6">
    <div class="ml-4 -translate-y-[1rem] md:-translate-y-0 md:mt-2">
        {#each code as number, index}
            <p class="text-6xl font-impact" style="transform: translateX({90 * index}px) translateY(20px)">
                {number}
            </p>
        {/each}
    </div>

    <p class="font-mono bg-neutral-900 rounded-md w-fit px-2 py-1 mt-auto md:mt-6">{$page.error?.message}</p>

    <p class="mt-4">
        You're missing something out there.... 
    </p>

    <div class="absolute w-full h-full flex items-center justify-center top-0 left-0">
        <img src="/imgs/SKULL.gif" alt="A SKULL" class="opacity-[.10] md:opacity-[.025]">
    </div>
</div>