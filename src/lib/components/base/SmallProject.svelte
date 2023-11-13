<script lang="ts">
    import type { ProjectData } from "$lib/types/Main";

    export let project: ProjectData

    const defaultColor = "rgb(25 25 25)"
</script>

<a href={project.href}>
    <div style="border-color: {project.color ?? defaultColor}" class="min-w-[815px] max-w-[815px] min-h-[100px] rounded-md border border-neutral-800 bg-black bg-opacity-50 transition-all duration-500 ease-in-out backdrop-blur-[84px] flex overflow-clip">
        <div class="w-[40px]" style="background-color: {project.color ?? defaultColor}"/>

        <div class="flex-grow pt-1 pl-2">
            <div class="flex">
                <h1 class="font-mono font-semibold text-xl">
                    {project.name}
                </h1>
                
                {#if project.icon}
                    <div style="-webkit-mask: url({project.icon}) center no-repeat;" class="bg-white ml-2 h-7 w-7" />
                {/if}
            </div>

            <p class="leading-[1.1rem]">
                {project.description}
            </p>

            <div class="flex items-center space-x-1.5 mt-2.5 pb-2">
                <p class="text-sm font-mono">
                    Uses: 
                </p>

                {#each project.technologies as technology}
                    <div style="-webkit-mask: url({technology.icon}) center no-repeat;" class="icon h-6 w-6 bg-white" />
                {/each}
            </div>
        </div>
    </div>
</a>