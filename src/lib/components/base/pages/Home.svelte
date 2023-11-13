<script lang="ts">
    import { useLanyard } from 'sk-lanyard'
	import Socials from './../Socials.svelte';
    import { ColorStore } from '$lib/components/stores/ColorStore';
    

    let mark: HTMLElement

    let slogans = [
        "DESIGN",
        "HUMAN",
        "SAFETY",
        "REALISTIC",
        "ARTISTIC",
        "WONDERFUL"
    ]
    
    function getRandomSlogan(): string {
        let index = Math.floor(Math.random() * slogans.length)

        if (index < 0) {
            index = 0
        }

        if (index > slogans.length-1) {
            index = slogans.length-1
        }

        let slogan = slogans[index]

        return slogan
    }

    const presence = useLanyard({method: "ws", id: "526120594929090561"})

    const ColorMap: {[status: string]: string} = {
        "online": "rgb(34 197 94)",
        "dnd": "rgb(239 68 68)",
        "idle": "rgb(234 179 8)",
        "offline": "rgb(107 114 128)",
        "_": "rgb(255 255 255)"
    }

    let setColor = false

    function MouseEnter() {
        setColor = true
        ColorStore.set({mainColor: ColorMap[$presence.discord_status ?? "_"]})
    }

    function MouseLeave() {
        setColor = false
        ColorStore.set({mainColor: ColorMap["_"]})
    }

    $: if (setColor) {
        ColorStore.set({mainColor: ColorMap[$presence.discord_status ?? "_"]})
    }
</script>

<div class="w-full h-full absolute flex flex-col pl-4 md:pl-12 pt-6 md:pt-12 pb-6 md:pb-10 z-10">
    <h1 class="title">/HOME</h1>
    <p class="">FOR ALL YOUR <mark bind:this={mark} class="px-1 copyright font-semibold font-mono">{getRandomSlogan()}</mark> NEEDS</p>
    <p class="text-sm">STATUS: <mark on:mouseleave={MouseLeave} on:mouseenter={MouseEnter} class="font-mono font-bold" data-status={$presence?.discord_status ?? ""} >{$presence?.discord_status ?? ""}</mark></p>

    <Socials class="mt-auto" />
    <h1 class="font-impact text-2xl sm:text-3xl md:text-4xl mt-4 v4">
        LITTLEPRICEONU
    </h1>
    <h2 class="font-mono font-semibold">FULL STACK DEVELOPER</h2>
</div>

<style lang="postcss">
    .v4::after {
        content: "v4";
        @apply inline-block text-sm -translate-y-[.6rem] translate-x-1;

        @media (min-width: 640px) {
            @apply text-base -translate-y-[.75rem]
        }
        
        @media (min-width: 768px) {
            @apply -translate-y-[1.05rem] text-lg
        }
    }

    mark[data-status="online"] {
        @apply text-green-500
    }

    mark[data-status="dnd"] {
        @apply text-red-500
    }

    mark[data-status="offline"] {
        @apply text-gray-500
    }

    mark[data-status="idle"] {
        @apply text-yellow-500
    }
</style>