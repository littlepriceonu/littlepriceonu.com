<script lang="ts">
	import Project from './../Project.svelte';
    import type { ProjectData } from '$lib/types/Main';

    const TheSiteUsual = [{
                name: "Svelte",
                icon: "/imgs/icons/Svelte.svg"
            }, {
                name: "Typescript",
                icon: "/imgs/icons/Typescript.svg"
            }, {
                name: "Tailwind",
                icon: "/imgs/icons/Tailwind.svg"
            }, {
                name: "PostCSS",
                icon: "/imgs/icons/PostCSS.svg"
            }
    ]

    const projects: ProjectData[] = [{
            name: "Lost Noise",
            image: "/imgs/projects/LostNoise.png",
            description: "The official Lost Noise website, uses alot of cool technologies.",
            href: "",
            color: "rgb(255, 0, 0)",
            languages: [...TheSiteUsual]
        }, {
            name: "Billy Sane",
            image: "/imgs/projects/BillySane.png",
            description: "The official Billy Sane website, had a lot of artistic freedom with this one.",
            href: "",
            color: "rgb(44, 132, 240)",
            languages: [...TheSiteUsual]
        }]
</script>

<div class="w-full h-full absolute flex flex-col pl-12 pt-12 z-10 overflow-y-auto scrollbar-thin scrollbar-track-transparent">
    <h1 class="title">/PROJECTS</h1>
    <p>BUILDING YOUR NEXT <mark class="font-mono font-semibold copyright">EXPERIENCE</mark></p>

    <h2 class="mt-12 title text-3xl">FEATURED</h2>
    <p>THE REALLY COOL <mark class="font-mono copyright font-semibold">STUFF</mark></p>
    <div class="mt-2 w-[51rem] grid grid-cols-2 gap-4 ">
        {#each projects as project}
            <Project {project}/>
        {/each}
    </div>

    <h2 class="mt-12 title">OPEN SOURCE</h2>
    <p>THE SLIGHTLY LESS COOL <mark class="font-mono copyright font-semibold">STUFF</mark></p>
    <div>

    </div>
</div>