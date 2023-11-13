<script lang="ts">
    import { offset, flip, shift, type Placement } from "svelte-floating-ui/dom";
    import {createFloatingActions} from 'svelte-floating-ui'

    export let text: string = "Button"
    export let tooltip: {
        text: string,
        placement?: Placement 
    } = {text: ""}
    export let disabled = false
    export let onclick: Function = () => {}
    export let show: boolean = true

    let clickFunction = onclick as any

    let clazz = ""
    let stylez = ""
    export {clazz as class, stylez as style}

    let showToolTip = false

    const [floatingRef, floatingContent] = createFloatingActions({
        strategy: "absolute",
        placement: tooltip.placement ? tooltip.placement : "top",
        middleware: [
            offset(6),
            flip(),
            shift({padding: 6}),
        ]
    })
</script>

<button class:hidden={!show} on:mouseenter={()=>{showToolTip = true}} on:focus={()=>{showToolTip=true}} on:focusout={()=>{showToolTip=false}} on:mouseleave={()=>{showToolTip=false}} use:floatingRef {disabled} on:click={clickFunction} on:keypress={clickFunction} class=" bg-black px-4 py-2 border border-neutral-600 rounded-md {clazz} hover:bg-neutral-800 active:bg-neutral-900 focus-visible:bg-neutral-800 outline-none focus-within:outline-none" style={stylez}>
    {text}
</button>

<div aria-label="Tooltip" use:floatingContent class:show={showToolTip && tooltip.text != "" && !disabled} class="bg-black px-4 py-2 border rounded-md border-neutral-900 opacity-0 transition-all duration-300 ease-in-out">
    {tooltip.text}
</div>

<style lang="postcss">
    button[disabled] {
        @apply border-neutral-800 bg-neutral-950 opacity-70 pointer-events-none
    }

    div.show {
        @apply !opacity-100
    }
</style>