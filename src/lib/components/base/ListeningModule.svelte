<script lang="ts">
	import Vibrant from 'node-vibrant';
    import type { LastFMData } from "$lib/types/LastFMTypes";
    import { onMount } from "svelte";
    import { ColorStore } from '../stores/ColorStore'

    let clazz: string = ""

    export {clazz as class}

    let image: string = ""
    let title: string = ""
    let album: string = ""
    let artist: string = ""
    let url: string = ""
    let displayTitle: string = ""

    const borderTemplate = "rgb([r] [g] [b] / 0.8)"
    let color = ""
    let secondColor = ""
    let error: Error
    let checkbackLater: boolean = false
    let enableClickage: boolean = true

    const IMAGE_OVERRIDES: {[album: string]: string} = {
        "Blind - Single": "https://i1.sndcdn.com/artworks-zMyZk0ZNsPVbAQyK-sdnleA-t500x500.jpg"
    }

    const COLOR_OVERRIDES: {[album: string]: {color: string, secondColor: string, [label: string]: string}} = {
        "EIGHTY PROOF": {
            color: "rgb(255 255 255 / 0.8)",
            secondColor: "rgb(255 255 255 / 0.8)"
        },
        "22101": {
            color: "rgb(255 255 255 / 0.8)",
            secondColor: "rgb(255 255 255 / 0.8)"
        }
    }

    let isListeningNow: boolean = false

    const NAME_MAP: {[title: string]: {album: string, title: string}} = {
        "Methhead Freestyle (feat. Eric North, JOHNNASCUS, Half Metal Kaiba, BLCKK, Bruhmanegod, LiL CUBENSiS, Royalty the Kidd, Afourteen & WENDIGO)": {
            album: "Methhead Freestyle (feat. Spider Gang) - Single",
            title: "Methhead Freestyle"
        },
    }

    function ConstructRGBfromArray(array: number[], album?: string, getting?: string): string {
        if (COLOR_OVERRIDES[album!] && getting) {
            return COLOR_OVERRIDES[album!][getting]
        }

        let str = borderTemplate.replace("[r]", array[0].toString())
        str = str.replace("[g]", array[1].toString())
        str = str.replace("[b]", array[2].toString())

        return str
    }

    onMount(async ()=>{
        let data: LastFMData = await (await fetch("/api/getListeningData")).json()

        if (!data.recenttracks?.track) {
            checkbackLater = true
            color = "rgb(255,0,0)"
            enableClickage = false
            return
        }

        let track = data.recenttracks.track[0]

        if (track["@attr"]?.nowplaying) {
            isListeningNow = true
        }

        let nameReplacement = NAME_MAP[track.name]

        if (nameReplacement) {
            track.name = nameReplacement.title
            track.album["#text"] = nameReplacement.album
        }

        let imageReplace = IMAGE_OVERRIDES[track.album['#text']]

        if (imageReplace) {
            track.image[2]['#text'] = imageReplace
        }

        image = track.image[2]['#text']
        title = track.name
        album = track.album['#text']
        artist = track.artist['#text']
        url = track.url

        Vibrant.from(image).getPalette().then((palette)=>{
            color = ConstructRGBfromArray(palette.Vibrant!.rgb, album, "color")
            secondColor = ConstructRGBfromArray(palette.Muted!.rgb, album, "secondColor")
        }).catch((e)=>{
            loaded = true
            error = e
        })
    })

    function onMouseEnter() {
        ColorStore.set({
            mainColor: color
        })
    }

    function onMouseLeave() {
        ColorStore.set({
            mainColor: "rgb(255 255 255)"
        })
    }
    
    let loaded = false
    let hideAlbum = false

    $: if (title.length > 40) {
        displayTitle = title.substring(0, 40) + "..."
    } else {
        displayTitle = title
    }
    
    $: hideAlbum = album.toLowerCase().includes(title.toLowerCase()) && album.toLowerCase().includes("single")
</script>

<a on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave} href={url} aria-label="Displays Littlepriceonu's recent music listening status"  class="{clazz} rounded-md border w-80 h-36 px-2 py-2 bg-black bg-opacity-80 backdrop-blur-3xl flex flex-col overflow-clip" style="border-color: {color}; pointer-events: {enableClickage ? "auto" : "none"}">
    <div class="flex px-1">
        <h1 class="text-sm font-bold z-10" style="color: {color}"> {isListeningNow ? "Listening To..." : "Last Listened To..."} </h1>

        <div class="ml-auto flex items-end space-x-0.5" class:hide={!isListeningNow}>
            <div style="background-color: {color}" class="w-1 h-2"/>
            <div style="background-color: {color}" class="w-1 h-1"/>
            <div style="background-color: {color}" class="w-1 h-3"/>
        </div>
    </div>
    
    <div class="flex mt-2 ml-2 items-center flex-grow relative">
        <img on:load={()=>{loaded = true}} class="w-[5.5rem] aspect-square rounded-md z-10" src={image} alt="Album art for {title}">
        <img class="w-[5.5rem] aspect-square rounded-md absolute scale-110 opacity-60 blur-md" src={image} aria-hidden="true" alt="Blur for {title}">

        <div class="flex flex-col h-full pl-3 pt-2 pb-2 text-xs overflow-clip text-neutral-400">
            <h1 style="color: {color}" class="font-semibold text-base text-white z-10">{displayTitle}</h1>
            <p style="color: {secondColor}" class:hide={hideAlbum} class="mt-auto z-10 font-semibold">On: {album}</p>
            <p style="color: {secondColor}" class:mt-auto={hideAlbum} class="z-10  font-semibold"> By: {artist} </p>
        </div>
    </div>

    {#if !loaded}
        <div class="w-full h-full translate-x-[-.5rem] translate-y-[-.5rem] absolute z-20 flex flex-col items-center justify-center bg-black">
            <div class="w-8 h-8 rounded-full border-2 border-black border-t-white animate-spin"/>
            <p class="font-mono text-xs mt-4">
                Loading Your Next Experience...
            </p>
        </div>
    {/if}

    {#if error}
        <div class="w-full h-full translate-x-[-.5rem] translate-y-[-.5rem] absolute z-30 flex flex-col items-center justify-center bg-black">
            <p class="font-mono text-xs mt-4 text-red-600 px-4 text-center">
                Something went wrong!
                A Last.FM oopsie caused this module to load incorrectly. 
            </p>
        </div>
    {/if}

    {#if checkbackLater}
        <div class="w-full h-full absolute translate-x-[-.5rem] translate-y-[-.5rem] z-50 flex flex-col items-center justify-center bg-black">
            <h1 class="font-mono text-red-700 px-4 text-center font-bold">
                Check Back Later.
            </h1>
            <p class="mt-4 px-6 text-xs text-red-700 text-center font-mono font-semibold">
                My recent tracks are turned off right now.
                They'll be back later.
            </p>
        </div>
    {/if}
</a>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mouseleave={onMouseLeave} on:mouseenter={onMouseEnter} class=" pointer-events-auto absolute w-80 h-36 rounded-md top-[80%] scale-125 scale-y-150 -z-10">

</div>

<style lang="postcss">
    .hide {
        @apply hidden
    }
</style>