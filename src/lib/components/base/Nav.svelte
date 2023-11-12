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

    onMount(()=>{
        currentPage = document.location.pathname
    })
</script>

<div class="w-[30%] left-[70%] h-full flex flex-col items-end justify-start bg-transparent absolute z-[60] pr-12 pt-12 pb-12">
    <nav aria-label="Navigation for the page" class=" px-2 pt-2 space-y-4 flex flex-col items-end justify-center font-impact pointer-events-auto">
        {#each pages as page}
            <a class:selected={currentPage==page.leadsTo} href={page.leadsTo} class="backdrop-blur-[84px] px-6 pt-2 rounded-md border border-transparent hover:border-neutral-600 transition-all duration-500 text-center   ">
                {page.name}
            </a>
        {/each}
    </nav>

    <ListeningModule class="mt-auto"/>
</div>

<style lang="postcss">
    .selected {
        @apply bg-black bg-opacity-30 border-neutral-800 
    }
</style>