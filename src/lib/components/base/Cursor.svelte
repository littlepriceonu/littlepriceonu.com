<script lang="ts">
    import { ColorStore } from "../stores/ColorStore";

    let x: number = $state(0)
    let y: number = $state(0)

    let xOffset = 40
    let yOffset = 40
    
    let show = $state(false)

    let scale = $state(1)

    // TODO
    // make cursor react to colorstore updates 

    let CursorColor: string = $state("")

    ColorStore.subscribe((color)=>{
        CursorColor = color.mainColor
    })
</script>

<svelte:window onmousemove={(e)=>{
    x = e.clientX
    y = e.clientY
    show = true
}} onmousedown={()=>{
    scale = 1.25
}} onmouseup={()=>{
    scale = 1
}} />

<div class:show class="cursor overflow-hidden z-10 absolute opacity-0 w-20 h-20 bg-white rounded-full pointer-events-none blur-3xl transition-all duration-[0.3s] ease-[cubic-bezier(.33,.64,.44,.73)]" style="transform: translateY({y - yOffset}px) translateX({x - xOffset}px) scale({scale}); background-color: {CursorColor};"></div>

<style lang="postcss">
    .show {
        @apply opacity-50;
    }

    @media (pointer: coarse) {
        .cursor {
            display: none;
        }
    }
</style>