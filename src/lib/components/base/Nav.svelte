<script lang="ts">
	import ListeningModule from './ListeningModule.svelte';
    import { navigating } from "$app/stores";
    import { onMount } from "svelte";

    let pages: {leadsTo: string, name: string}[] = [{
        leadsTo: "/",
        name: "Home",
    },
    {
        leadsTo: "/projects",
        name: "Projects"
    }]

    let currentPage = ""

    navigating.subscribe((e)=>{
        if (e?.to?.url?.pathname) {
            currentPage = e?.to?.url?.pathname
        }
    })

    let width: number

    onMount(()=>{
        currentPage = document.location.pathname
        width = innerWidth

        addEventListener("resize", ()=>{
            width = innerWidth
        })
    })
</script>

<div class="bg-black md:bg-transparent border-b border-b-neutral-600 md:border-b-0 w-[100%] xl:w-[30%] xl:left-[70%] h-[10%] xl:h-full flex items-center justify-center md:flex-col md:items-end md:justify-start md:absolute z-[60] md:pr-12 md:py-12">
    <nav aria-label="Navigation for the page" class=" md:px-2 md:pt-2 space-x-4 xl:space-y-4 flex xl:flex-col items-end justify-center font-impact pointer-events-auto">
        {#each pages as page}
            <a class:selected={currentPage==page.leadsTo} href={page.leadsTo} class="select-none backdrop-blur-[84px] px-6 pt-2 rounded-md border border-transparent hover:border-neutral-600 transition-all duration-500 text-center leading-6 pb-1 text-sm">
                {page.name}
            </a>
        {/each}
    </nav>

    {#if width > 1280}
        <ListeningModule class="mt-auto"/>
    {/if}
</div>

<style lang="postcss">
    .selected {
        @apply  border-neutral-800 
    }
</style>