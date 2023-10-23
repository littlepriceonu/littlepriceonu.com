<script lang="ts">
    import { page } from "$app/stores";

    
</script>

<div class="w-full h-full bg-slate-900 flex flex-col items-center justify-center">
    <h1 class="font-mono text-5xl font-bold">
        {$page.status}
    </h1>

    <p class="">
        {$page.error?.message}
    </p>

    <p class="mt-4 text-blue-500 font-bold drop-shadow-[0_0_15px_blue]">
        How'd you even get here?
    </p>
</div>