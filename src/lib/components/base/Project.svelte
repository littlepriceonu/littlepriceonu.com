<script lang="ts">
	import type { ProjectData } from '$lib/types/Main.d.ts';
    import { ColorStore } from '../stores/ColorStore';
    export let project: ProjectData

    function MouseEnter() {
        ColorStore.set({mainColor: project.color})
    }

    function MouseLeave() {
        ColorStore.set({mainColor: "rgb(255 255 255)"})
    }
</script>

<a style="--project-color: {project.color}" class="antialiased" on:mouseenter={MouseEnter} on:mouseleave={MouseLeave} href={project.href}>
    <div class="min-w-[24rem] h-[320px] rounded-md border overflow-clip relative" style="border-color: {project.color};">
        <img style="border-color: {project.color};" class="border-b " src={project.image} alt="{project.name}'s thumbnail">
    
        <div class="h-[98px] w-full p-2 bg-black flex flex-col">
            <h2 class="text-sm font-semibold" style="color: {project.color}">{project.description}</h2>
            <div class="flex mt-auto items-center space-x-1.5 w-full mb-1">
                {#each project.languages as language}
                    <div style="-webkit-mask: url({language.icon}) center no-repeat; background-color: {project.color}" class="icon h-7 w-7" />
                {/each}
    

                <svg style="color: {project.color}; border-color: {project.color}" class="!ml-auto rounded-md text-center translate-y-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>

            </div>
        </div>
    
        <div class="absolute w-full h-[calc(100%-98px)] z-20 top-0 left-0 p-2 flex flex-col items-start justify-end">
            <h1 style="color: {project.color};" class="font-impact text-xl translate-y-2">{project.name}</h1>
        </div>
    </div>
</a>

<style lang="postcss">
    .icon {
    }
</style>