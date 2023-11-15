<script lang="ts">

    let clazz: string = ""

    export {clazz as class}

    const SocialMediaLinks: {icon: string, name: string, leadsTo: string}[] = [{
        name: "Github",
        icon: "/imgs/socials/github.png",
        leadsTo: "https://github.com/littlepriceonu"
    },{
        name: "Discord",
        icon: "/imgs/socials/discord.png",
        leadsTo: "https://discord.com/users/526120594929090561"
    },{
        name: "LastFM",
        icon: "/imgs/socials/lastfm.png",
        leadsTo: "https://www.last.fm/user/littlepriceonu/library"
    },{
        name: "Steam",
        icon: "/imgs/socials/steam.png",
        leadsTo: "https://steamcommunity.com/id/littlepriceonu"
    },{
        name: "Email",
        icon: "/imgs/socials/email.png",
        leadsTo: "mailto:me@littlepriceonu.com"
    },{
        name: "Instagram",
        icon: "/imgs/socials/instagram.png",
        leadsTo: "https://instagram.com/littlepriceonu"
    }] 

</script>

<div aria-label="Littlepriceonu's Socials" class="flex items-center space-x-4 {clazz}">
    {#each SocialMediaLinks as link}
        <a href={link.leadsTo} class="aspect-square w-9 h-9 rounded-full transition-all duration-500 hover:scale-110 outline-none focus-within:outline-none focus-within:scale-110">
            <img class="invert" src={link.icon} alt="A link to Littlepriceonu's {link.name}">
        </a>
    {/each}
</div>