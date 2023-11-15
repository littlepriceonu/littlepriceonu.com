<script lang="ts">
    import type { ProjectData } from "$lib/types/Main";
    import { ColorStore } from "../stores/ColorStore";

    export let project: ProjectData

    const defaultColor = "rgb(25 25 25)"

    function MouseEnter() {
        ColorStore.set({
            mainColor: project.color ?? defaultColor
        })
    }

    function MouseLeave() {
        ColorStore.set({
            mainColor: "rgb(255 255 255)"
        })
    }
</script>

<a href={project.href} on:mouseenter={MouseEnter} on:mouseleave={MouseLeave} class="w-fit min-w-[100%] min-[880px]:min-w-[815px] min-[880px]:max-w-[815px] antialiased">
    <div style="border-color: {project.color ?? defaultColor}" class="w-full h-full rounded-md border border-neutral-800 bg-black bg-opacity-50 transition-all duration-500 ease-in-out backdrop-blur-[84px] flex flex-col md:flex-row overflow-clip">
        <div class="w-full h-[25px] md:h-auto md:w-[40px]" style="background-color: {project.color ?? defaultColor}"/>

        <div class="flex-grow pt-1 pl-2">
            <div class="flex">
                <h1 class="font-mono font-semibold text-xl">
                    {project.name}
                </h1>
                
                {#if project.icon}
                    <img src={project.icon} alt="{project.name}'s Icon" class="ml-auto mr-3 translate-y-0.5 min-[880px]:translate-y-1 h-7 w-7" />
                {/if}
            </div>

            <p class="leading-[1.1rem] mt-1 min-[880px]:mt-0">
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