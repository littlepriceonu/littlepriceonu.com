<script lang="ts">
	import BigProject from '../BigProject.svelte';
    import type { FeaturedProjectData, ProjectData } from '$lib/types/Main';
    import SmallProject from '../SmallProject.svelte';

    const TheSiteUsual = [{
                name: "Svelte",
                icon: "/imgs/icons/languages/Svelte.svg"
            }, {
                name: "Typescript",
                icon: "/imgs/icons/languages/Typescript.svg"
            }, {
                name: "Tailwind",
                icon: "/imgs/icons/languages/Tailwind.svg"
            }, {
                name: "PostCSS",
                icon: "/imgs/icons/frameworks/PostCSS.svg"
            }
    ]

    const Featured: FeaturedProjectData[] = [{
            name: "Lost Noise",
            image: "/imgs/projects/LostNoise.png",
            description: "The official Lost Noise website, uses alot of cool technologies.",
            href: "",
            color: "rgb(255, 0, 0)",
            technologies: [...TheSiteUsual]
        }, {
            name: "Billy Sane",
            image: "/imgs/projects/BillySane.png",
            description: "The official Billy Sane website, had a lot of artistic freedom with this one.",
            href: "",
            color: "rgb(44, 132, 240)",
            technologies: [...TheSiteUsual]
        }
    ]

    const OpenSource: ProjectData[] = [{
            name: "Littlepriceonu.com",
            description: "You're looking at it.",
            icon: "/imgs/SKULL.png",
            color: "rgb(215 215 215)",
            technologies: [...TheSiteUsual],
            href: "https://github.com/littlepriceonu/littlepriceonu.com"
        },{
            name: "LilYTDownloader",
            description: "Download Youtube videos on your own computer, without forced website limitations.",
            color: "rgb(15, 23, 42)",
            icon: "/imgs/icons/projects/LilYTDownloader.svg",
            technologies: [{
                    name: "Electron",
                    icon: "/imgs/icons/frameworks/Electron.svg"
                }, {
                    name: "Typescript",
                    icon: "/imgs/icons/languages/Typescript.svg"
                }, {
                    name: "Tailwind",
                    icon: "/imgs/icons/languages/Tailwind.svg"
                }, {
                    name: "PostCSS",
                    icon: "/imgs/icons/frameworks/PostCSS.svg"
                }
            ],
            href: "https://github.com/littlepriceonu/LilYTDownloader"
        }, {
            name: "Pls Donate Self Bot",
            description: "A self bot for the Roblox experience 'Pls Donate', V2 was discontinued due to Byfron. ",
            technologies: [{
                    name: "Lua",
                    icon: "/imgs/icons/languages/Lua.svg"
                }, {
                    name: "Synapse X",
                    icon: "/imgs/icons/etc/SynapseX.svg"
                }
            ],
            href: "https://github.com/littlepriceonu/Pls-Donate-Self-Bot"
        }, {
            name: "(Slightly) Better V3rm",
            description: "A Tampermonkey script to make v3rmillion.net look less bad, also adds some cool features.",
            href: "https://github.com/littlepriceonu/-Slightly-Better-V3rm",
            color: "rgb(100, 0, 0)",
            technologies: [{
                    name: "Tampermonkey",
                    icon: "/imgs/icons/frameworks/Tampermonkey.svg"
                }, {
                    name: "Javascript",
                    icon: "/imgs/icons/languages/Javascript.svg"
                }, 
            ]
        }
    ]
</script>

<div class="w-full h-full absolute flex flex-col pl-4 md:pl-14 pt-6 md:pt-12 z-10 overflow-y-auto scrollbar-thin scrollbar-track-transparent scale-x-[-1]">
    <!-- The good old sleeve tactic to flip the scrollbar (scale-x-[-1]) -->
    <div class="scale-x-[-1] w-full h-full pl-4 md:pl-10 pb-10">
        <h1 class="title">/PROJECTS</h1>
        <p>BUILDING YOUR NEXT <mark class="font-mono font-semibold copyright">EXPERIENCE</mark></p>
    
        <h2 class="mt-12 title text-3xl">FEATURED</h2>
        <p>THE REALLY COOL <mark class="font-mono copyright font-semibold">STUFF</mark></p>
        <div class="mt-2 w-[51rem] grid min-[880px]:grid-cols-2 gap-4 ">
            {#each Featured as project}
                <BigProject {project}/>
            {/each}
        </div>
    
        <h2 class="mt-12 title">OPEN SOURCE</h2>
        <p>THE SLIGHTLY LESS COOL <mark class="font-mono copyright font-semibold">STUFF</mark></p>
        <!-- the pb-6 here is important to add spacing for the scrollbar -->
        <div class="flex flex-col bg-transparent mt-2 space-y-4 pb-6 w-full min-[880px]:w-fit">
            {#each OpenSource as project}
                <SmallProject {project}/>
            {/each}
        </div>
    </div>
</div>