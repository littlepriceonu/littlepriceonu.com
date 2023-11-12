<script lang="ts">
    import { useLanyard } from 'sk-lanyard'
	import Socials from './../../Socials.svelte';

    let mark: HTMLElement

    let slogans = [
        "DESIGN",
        "HUMAN",
        "SAFETY",
        "REALISTIC",
    ]
    
    function getRandomSlogan(): string {
        let index = Math.round(Math.random() * slogans.length)

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
</script>

<div class="w-full h-full absolute flex flex-col pl-12 pt-12 pb-6 z-10">
    <h1 class="text-4xl font-mono font-semibold">/HOME</h1>
    <p class="">FOR ALL YOUR <mark bind:this={mark} class="px-1 copyright font-semibold font-mono">{getRandomSlogan()}</mark> NEEDS</p>
    <p class="text-sm">STATUS: <mark class="font-mono font-bold" data-status={$presence?.discord_status ?? ""} >{$presence?.discord_status ?? ""}</mark></p>

    <img src="/imgs/PFP.gif" alt="Littlepriceonu's PFP" class="aspect-square w-32 mb-4 mt-auto rounded-md ml-1">

    <Socials class="" />
    <h1 class="font-impact text-5xl mt-6 v4">
        LITTLEPRICEONU
    </h1>
</div>

<style lang="postcss">
    .v4::after {
        content: "v4";
        @apply inline-block text-lg -translate-y-[1.30rem] translate-x-1
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