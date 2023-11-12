<script lang="ts">
    import { page } from "$app/stores";

    let code: string[] = $page.status.toString().split("")
</script>

<svelte:head>
    <title>
        {$page.status}
    </title>

    <meta property="og:title" content="{$page.status.toString()}">
    <meta property="og:description" content="SOMETHING HAPPENED!">
    <meta property="og:image" content="https://littlepriceonu.com/PFP.gif">
    <meta property="og:image:alt" content="fake.">

    <meta name="twitter:description" content="WHATS NEXT?">
</svelte:head>

<div class="w-full h-full bg-black scrollbar scrollbar-track-slate-900 scrollbar-thumb-stone-900 relative overflow-hidden px-6 py-6">
    <div class="ml-4 mt-2">
        {#each code as number, index}
            <p class="text-6xl font-impact" style="transform: translateX({90 * index}px) translateY(20px)">
                {number}
            </p>
        {/each}
    </div>

    <p class="font-mono bg-neutral-900 rounded-md w-fit px-2 py-2 mt-6">{$page.error?.message}</p>

    <p class="mt-4">
        You're missing something out there.... 
    </p>
</div>