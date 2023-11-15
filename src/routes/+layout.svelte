<script lang="ts">
	import Cursor from '$lib/components/base/Cursor.svelte';
    import "../app.css"
    import Nav from "$lib/components/base/Nav.svelte";
    import { onNavigate } from '$app/navigation';
    import { navigating } from '$app/stores';
    import { ColorStore } from '$lib/components/stores/ColorStore';
    

    // totally not copied from the svelte docs
    onNavigate((navigation) => {
	    if (!document.startViewTransition) return;

	    return new Promise<void>((resolve) => {
	    	document.startViewTransition(async () => {
	    		resolve();
	    		await navigation.complete;
        	});
	    });
    });

    navigating.subscribe(()=>{
        ColorStore.set({
            mainColor: "rgb(255 255 255)"
        })
    })
</script>

<svelte:head>
    <meta property="og:site_name" content="LITTLEPRICEONU">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://littlepriceonu.com/">
</svelte:head>

<div class="w-full h-full absolute overflow-hidden">
    <Cursor/>
</div>

<Nav/>

<slot />