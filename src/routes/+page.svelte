
<!-- ! WARNING WARNING WARNING ! -->
<!-- USER SEEMS TO BE BROWSING SOURCE. CONTINUE TO MONITOR FOR FURTHER IMPROPER USE -->
<!-- ! MONITORING HAS BEEN ESCALATED TO A LEVEL *1* ! -->

<script lang="ts">
    import { onMount } from "svelte";
    import Vibrant from 'node-vibrant';
    import type { DiscordData, LanyardSocketResponse } from "$lib/types/DiscordTypes";
    import type { LastFMData } from "$lib/types/LastFMTypes";

    onMount(() => {
        // ! WARNING WARNING WARNING !
        // USER ACCESSED INTERAL OPERATIONS
        // ! MONITORING HAS BEEN ESCALATED TO A LEVEL *2* !
        
        console.log("%c[ACCESS GRANTED] %c! WARNING ! UNKNOWN CONNECTION HOST ! WARNING !", "color: green; font-weight: 800;", "color: red;")
        
        // TODO
        // Overall redesign
        // Use sveltekit stuff to make this not suck
        // Honestly this code sucks so much
        // Like its alright
        // but it only uses base ts
        
        //#region Variables
        
        const SONGS: { [song: string]: string } = {
            "iamsuicidal": "https://images.genius.com/28bff45b39ecc8c7b6f26bef075d3600.500x500x1.jpg",
            "COCKNBALLTORTURE": "https://images.genius.com/d11ccddb4dbc5d7964e54102cbfe5525.1000x1000x1.png",
            "B*******E (feat. Lil D****e)": "https://cdns-images.dzcdn.net/images/cover/d4de137520fee181a4d3d89e453290a5/500x500.jpg",
            "warm rain": "https://i.scdn.co/image/ab67616d0000b2735b3e06096b1604016b729a93",
            "when the world end": "https://i1.sndcdn.com/artworks-0xZLnKADQJHhFEoI-06nAKw-t500x500.jpg",
            "RUN": "https://i1.sndcdn.com/artworks-Mbwvi7htzOpNHV7o-kixKIw-t500x500.jpg",
            "Hall of Fame (feat. Lake Kyle & Lil D****e)": "https://i.scdn.co/image/ab67616d00001e023f3a016617a325b1dfc4dd5d",
            "frick suckaz": "/img/fricksuckaz.jpg",
            "stardust": "/img/stardust.jpg",
            "No Hook, Pt. 2": "https://i.scdn.co/image/ab67616d00001e02d3800d40e3f17986fd0a4f9f",
            "D****e Still Cannot Rap Pt. 1 (Remix)": "https://i1.sndcdn.com/artworks-nxOhOCH4l4wJk3Pj-EqfEGQ-t500x500.jpg",
            "is there anyone home?": "https://i.scdn.co/image/ab67616d0000b27398bc0cadfed62e38f5a7455d",
            "When You Gone": "https://i.scdn.co/image/ab67616d00001e023a4882894fe2fa490340235c",
            "don't think": "https://i1.sndcdn.com/artworks-s9jV0rcQINSxv4io-qGSjAQ-t500x500.jpg",
            "they just put my dog down (RIP TUGBOAT RIP PERCY) [feat. Lil D****e & Wendigo]": "https://i1.sndcdn.com/artworks-jy3lqiZdzeudarPo-cb3fTQ-t500x500.jpg",
            "LISTENING TO BIRDS": "https://i1.sndcdn.com/artworks-0YtmVgIroROVgXkK-n8bz2Q-t500x500.jpg",
            "WEATHERMAN": "https://images.genius.com/bae5e1f333458df3e176e9508cfeee86.1000x1000x1.jpg",
            "reminding": "https://images.genius.com/9071d579e081380bf254418d64164b9e.500x500x1.jpg",
            "TRANSSEXUAL APPRECIATION DAY": "https://i1.sndcdn.com/artworks-dWruiiQqAPCpp0Bv-zLKHJA-t500x500.jpg",
        }
        
        const ALBUMS: { [album: string]: string }  = {
            "SUPER DARK VR": "https://i1.sndcdn.com/artworks-000475938783-ej4tvp-t500x500.jpg",
            "WE ARE BEHIND AN OBJECT (a spider gang thing)": "https://images.genius.com/80460f1ef4675f4231c9f80932b04ef6.1000x1000x1.png"
        }
        
        const COLORS: { [status: string]: string } = {
            online: "rgb(67, 181, 129)",
            dnd: "rgb(244, 70, 72)",
            idle: "rgb(248, 166, 25)",
            offline: "rgb(115, 126, 141)",
        }
        
        var LOADING_PROGRESS: { [key: string]: boolean } = {
            LastFMIntergration: false,
            DiscordIntergration: false,
        }
        
        const LENNYS: Array<string> = [
            "<mark style='background-color:transparent; color:blue;'>◑</mark>.<mark style='background-color:transparent; color:blue;'>◑</mark>",
            "<mark style='background-color:transparent; color:saddlebrown;'>ʕ•́ᴥ•̀ʔっ</mark><mark style='background-color:transparent; color:red;'>♡</mark>",
            "<mark style='background-color:transparent; color:red;'>( ◥◣_◢◤ )</mark>",
            "<mark style='background-color:transparent; color:blue;'>（◞‸◟）</mark>",
            "<mark style='background-color:transparent; color:green;'>(•‿•)</mark>",
            "<mark style='background-color:transparent; color:yellow;'>(◑‿◐)</mark>",
            "<mark style='background-color:transparent; color:green;'>┗(^o^　)┓</mark>三"
        ]
        
        //#endregion
        
        //#region Misc. Functions
        
        function getRandomNumber(min:number, max: number): number {
            return Math.random() * (max - min) + min;
        }
        
        function getRandomInterger(min:number, max:number): number {
            return Math.floor(Math.random() * (max - min) ) + min;
        }
        
        function checkSongNameWithCover(name: string, data: LastFMData) {
            if (SONGS[name]) {
                data.recenttracks.track[0].image[2]["#text"] = SONGS[name]
            }
        }
        
        function checkAlbumNameWithCover(name: string, data: LastFMData) {
            if (ALBUMS[name]) {
                data.recenttracks.track[0].image[2]["#text"] = ALBUMS[name]
            }
        }    
        
        //#endregion
        
        //#region Loading Screen
        
        const loadingScreen = <HTMLDivElement>document.getElementById("loadingScreen")!
        const contentHolder = <HTMLDivElement>document.getElementById("contentHolder")!
        const lennyFace =  <HTMLTextAreaElement>document.getElementById("lennyFace")!
        
        const loadingBarBackground = <HTMLDivElement>document.getElementById("loadingBarBackground")!
        const loadingBar = <HTMLDivElement>document.getElementById("loadingBar")!
        
        lennyFace.innerHTML = LENNYS[getRandomInterger(0, LENNYS.length)]
        
        const PROGRESS_DEFAULT = Object.keys(LOADING_PROGRESS).length + 1
        
        var loadingInterval = setInterval(()=>{
            // WARNING code ahead is very odd, but it works
            // heres how it works, the Progress variable is the length of all the items in the "LOADING_PROGRESS" variable plus one, I check to see how many of the entries in the LOADING_PROGRESS is complete and minus 1 from
            // progress for each that is complete
        
            // then I check if the progress is equal to the value it was at that start (length of LOADING_PROGRESS + 1), if it is then we haven't loaded anything yet so the bar stays at 0px, if its changed then I divide the
            // i make the length of the bar to the length of the background bar divived by the Progress variable (i.e. if Progress was 3 and one thing was loaded, progress would become 2, so the bar would be background / 2 pixels)
            // long) if progress is 1, meaning that all of the entires are loaded, I fade out the loading screen and fade in all of the actual content on the page
        
            let Progress = PROGRESS_DEFAULT
        
            Object.entries(LOADING_PROGRESS).forEach(isFinished => {
                if (isFinished[1]) {
                    Progress -= 1
                }
            })
        
            // if the progress is the same as the length (so no progress has been made)
            if (Progress == PROGRESS_DEFAULT) {
                loadingBar.style.width = "0px"
            }
            // make loadingBar's width the background's size / by the amount of progress we've made (i.e. if we had made it half way through (progress = 2) and the background was 50px, the bar would be 25px (half of 50px))
            else {
                loadingBar.style.width = (loadingBarBackground.clientWidth / Progress).toString() + "px"
            }
        
            // if the progress is 1 (so all of the modules have finished loading)
            if (Progress == 1) {
                setTimeout(() => {
                    // clear loading screen so you can actually hover over and click stuff
                    loadingScreen.remove()
                }, 600);
            
                loadingScreen.style.opacity = "0"
                contentHolder.style.opacity = "1"
            
                // no need to update
                clearInterval(loadingInterval)
            }
        }, 100)
        
        //#endregion
        
        //#region Status
        
        var Lanyard: WebSocket;
        
        function SendMessageToLanyard(OP:number, data: any) {
            if (Lanyard.readyState != Lanyard.OPEN) return; 
        
            Lanyard.send(JSON.stringify({
                op: OP,
                d: data,
            }))
        }
        
        var HeartbeatInterval: number;
        
        const USER_ID = "526120594929090561";
        
        const OPCodeHandlers: {[op: number]: Function} = {
            1: function(data: LanyardSocketResponse) {
                HeartbeatInterval = <unknown>setInterval(()=>{
                    SendMessageToLanyard(3, {})
                }, data.d.heartbeat_interval) as number     
            
                SendMessageToLanyard(2, {
                    subscribe_to_id: USER_ID,
                })
            },
        
            0: function(data: LanyardSocketResponse) {
                HandleStatus(data.d)
            },
        }
        
        const OuterStatus = <HTMLDivElement>document.getElementById("OuterStatus")
        const Status = <HTMLDivElement>document.getElementById("Status")
        const PFP = <HTMLImageElement>document.getElementById("PFP")
        
        function HandleStatus(data: unknown) {
            const discordData = data as DiscordData
        
            // Sets the color for the current status, effects status circle and drop shadow
            OuterStatus.style.setProperty("--status-color", COLORS[discordData.discord_status])
            // Sets the status on the Circle so it can be used in css selectors
            Status.setAttribute("data-status", discordData.discord_status)
        
            if (!LOADING_PROGRESS["DiscordIntergration"]) LOADING_PROGRESS["DiscordIntergration"] = true
        }
        
        function SetupLanyard() {
            OuterStatus.style.top = "5px"
            // 7 is just a random magic number that I divide the width by to get it in a place I like lmao
            OuterStatus.style.left = (PFP.clientWidth - PFP.clientWidth/7).toString()+"px"
        
            Lanyard = new WebSocket("wss://api.lanyard.rest/socket")
        
            Lanyard.onopen = ()=>{
                console.log("[LANYARD] LANYARD CONNECTION ACTIVE... AWAITING DATA...")
            }
        
            Lanyard.onmessage = (data: any) => {
                data = JSON.parse(data.data)
                OPCodeHandlers[(data.op as number)](data)
            }
        }
        
        if (PFP.complete) {
            SetupLanyard()
        }
        else {
            PFP.addEventListener("load", ()=>{
                SetupLanyard()
            })
        }
        
        //#endregion
        
        //#region ACCESS GRANTED
        
        const accessGranted = <HTMLTextAreaElement>document.getElementById("accessGranted")!
        const accessGrantedDefault = accessGranted.innerText 
        var accessGrantedDots = "."
        
        accessGranted.innerText = accessGrantedDefault + accessGrantedDots
        
        setInterval(() => {
            if (accessGrantedDots.length == 3) {
                accessGrantedDots = "."
            }
            else {
                accessGrantedDots += "."
            }
        
            accessGranted.innerText = accessGrantedDefault + accessGrantedDots
        }, 1000);
        
        //#endregion
        
        //#region Listening To...
        const AlbumImage = <HTMLImageElement>document.getElementById!("AlbumImage")
        const BlurImage = <HTMLImageElement>document.getElementById!("BlurImage")
        const SongName = <HTMLTextAreaElement>document.getElementById!("SongName")
        const AlbumName = <HTMLTextAreaElement>document.getElementById!("AlbumName")
        const ArtistName = <HTMLTextAreaElement>document.getElementById!("ArtistName")
        const NowListening = <HTMLTextAreaElement>document.getElementById!("NowListening")
        const Bars = Array.from(document.getElementsByClassName("bar") as HTMLCollectionOf<HTMLDivElement>)
        
        var lastTrack: string;
        var barInterval: Array<number> = [];
        var lastListeningStatus: string;
        
        function HandleFMData(data: LastFMData) {
        //  me explaining check so my brain doesn't shut down 
        //                                 @attr exists      AND       @attr has the "nowplaying"              AND  lastListeningStatus was true OR            @attr doesn't exist         AND  lastListeningStatus was false
        //  console.log((data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying && lastListeningStatus == 'true') ||  (!data.recenttracks.track[0]["@attr"] && lastListeningStatus == "false"))
        
            if ((lastTrack == data.recenttracks.track[0].name) && (data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying && lastListeningStatus == 'true') ||  (!data.recenttracks.track[0]["@attr"] && lastListeningStatus == "false")) return
        
            lastTrack = data.recenttracks.track[0].name
        
            // Random stuff for Goonies/Boonies to make it look better lmao
            if (data.recenttracks.track[0].name == "Goonies/Boonies (Prod. lil Judas)") {
                data.recenttracks.track[0].album["#text"] = "Goonies/Boonies (Prod. lil Judas) - Single"
                data.recenttracks.track[0].name = "Goonies/Boonies"
            }
        
            // More random stuff to make methhead freestyle look better
            if (data.recenttracks.track[0].name == "Methhead Freestyle (feat. Eric North, JOHNNASCUS, Half Metal Kaiba, BLCKK, Bruhmanegod, LiL CUBENSiS, Royalty the Kidd, Afourteen & WENDIGO)") {
                data.recenttracks.track[0].album["#text"] = "Methhead Freestyle (feat. Spider Gang) - Single"
                data.recenttracks.track[0].name = "Methhead Freestyle"
            }
        
            SongName.innerText = data.recenttracks.track[0].name
            AlbumName.innerText = data.recenttracks.track[0].album["#text"]
        
            if (data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying) {
                lastListeningStatus = data.recenttracks.track[0]["@attr"].nowplaying
            
                NowListening.innerText = "NOW LISTENING TO..."
            
                Bars.forEach(el => {
                    el.style.display = "block"
                
                    if (barInterval.length < 3) {
                        el.style.height = getRandomNumber(1,24).toString() + "px"
                    
                        barInterval.push((<unknown>setInterval(()=>{
                            el.style.height = getRandomNumber(1,24).toString() + "px"
                        }, 700) as number))
                    }
                })
            }
            else {
                lastListeningStatus = "false"
                
                NowListening.innerText = "RECENTLY LISTENED TO..."
            
                barInterval.forEach(interval=>{
                    clearInterval(interval)
                })
            
                barInterval = []
                Bars.forEach(el => {
                    el.style.display = "none"
                })
            }
        
            checkSongNameWithCover(SongName.innerText, data)
            checkAlbumNameWithCover(AlbumName.innerText, data)
        
            ArtistName.innerText = data.recenttracks.track[0].artist["#text"]
            AlbumImage.src = data.recenttracks.track[0].image[2]["#text"]
            BlurImage.src = data.recenttracks.track[0].image[2]["#text"]
        
            if (AlbumImage.complete) {
                Vibrant.from(AlbumImage.src).getPalette().then((palette: any) => {
                    var rgb = palette.Vibrant.rgb
                
                    var color: string = 'rgb('+rgb[0].toString()+' '+rgb[1].toString()+ ' '+rgb[2].toString() + ')'
                
                    SongName.style.color = color
                
                    LOADING_PROGRESS["LastFMIntergration"] = true
                })   
            } else {
                AlbumImage.addEventListener('load', function() {
                    Vibrant.from(AlbumImage.src).getPalette().then((palette: any) => {
                        var rgb = palette.Vibrant.rgb
                    
                        var color: string = 'rgb('+rgb[0].toString()+' '+rgb[1].toString()+ ' '+rgb[2].toString() + ')'
                    
                        SongName.style.color = color
                    
                        LOADING_PROGRESS["LastFMIntergration"] = true
                    })   
                });
            }
        }
        
        fetch("/api/getListeningData").then(data => data.json()).then((data: LastFMData) => {
            HandleFMData(data)
        })
        
        setInterval(()=>{
            console.log("[LAST.FM] UPDATING LAST.FM DATA")

            fetch("/api/getListeningData").then(data => data.json()).then((data: LastFMData) => {
                HandleFMData(data)
            })
        }, 60*1000)
        
        //#endregion
        
        //#region Home Positioning
        
        const MainContent = <HTMLDivElement>document.getElementById("MainContent")
        
        var fullHeight = 0;
        
        Array.from(MainContent.children).forEach(el => {
            fullHeight += el.getBoundingClientRect().height
        })
        
        //! please lord help me fix this stupid positioning bug 
        // when you open the page and then open dev tools then close it it'll be different for sum reason
        // holy shit I fixed it
        // I actually fixed it
        
        MainContent.style.paddingTop = (innerHeight - fullHeight - 150).toString() + "px"
        
        addEventListener("resize", ()=>{
            MainContent.style.paddingTop = (innerHeight - fullHeight - 150).toString() + "px"
        })
        
        //#endregion
        
        //#region Rotating Module
        
        // yea fuck that
        // my brain doesn't have enough capacity to understand whats happening :-(
        // the rotation is really laggy for some reason
        // like I have to stop moving my mouse for it to actually rotate to my mouse
        // I hate javascript sometimes
        
        //const Rotates = Array.from(document.getElementsByClassName("rotates")) as Array<HTMLDivElement>
        //
        //const MAX_X_ROTATION = 40
        //const MAX_Y_ROTATION = 40
        //
        //Rotates.forEach((el: HTMLDivElement) => {
        //    console.log("Got here")
        //
        //    var interval = -1;
        //    var xOffset: number;
        //    var yOffset: number;
        //
        //    // not setting transform when I add the prespective variable
        //    // I hate this so much :D
        //    // just straight up removed the variable
        //
        //    el.style.transform = `prespective(500px)`
        //
        //    el.addEventListener("mousemove", (mouseMove) => {
        //        const x = mouseMove.clientX 
        //        const y = mouseMove.clientY
        //
        //        var middleX = el.getBoundingClientRect().x + (el.clientWidth /2)
        //        var middleY = el.getBoundingClientRect().y + (el.clientHeight /2)
        //
        //        xOffset = ((x - middleX) / middleX)  * MAX_X_ROTATION
        //        yOffset = ((y - middleY) / middleY) * MAX_Y_ROTATION
        //
        //        console.log(xOffset/MAX_X_ROTATION, -yOffset/MAX_Y_ROTATION)
        //
        //        el.style.setProperty("--xRotate", xOffset.toString()+'deg')
        //        el.style.setProperty("--yRotate", -yOffset.toString()+'deg')
        //        el.style.setProperty("--scale", '1.02')
        //
        //
        //        //if (interval < 0) {
        //        //    interval = setInterval(()=>{
        //        //        el.style.transform = `perspective(500px) rotateX(${-yOffset}deg) rotateY(${xOffset}deg) scale(1.02)`
        //        //    }, 1)
        //        //}
        //
        //    })
        //
        //    el.addEventListener("mouseleave", () => {
        //        console.log("Mouse Left")
        //        clearInterval(interval)
        //        interval = -1
        //        el.style.setProperty("--xRotate", '0deg')
        //        el.style.setProperty("--yRotate", '0deg')
        //        el.style.setProperty("--scale", '1')
        //    })
        //})
        
        //#endregion
    })
</script>

<svelte:head>
    <meta property="og:title" content="ACCESS GRANTED">
    <meta property="og:description" content="FOREIGN CONNECTION DETECTED.">
    <meta property="og:image" content="https://littlepriceonu.com/PFP.gif">
    <meta property="og:image:alt" content="Too Late... They're in...">

    <meta name="twitter:description" content="Did you SERIOUSLY not terminate the connection?">
</svelte:head>

<div id="loadingScreen" class="flex flex-col justify-center items-center absolute z-20 top-0 left-0 w-full h-full">
    <!-- svelte-ignore a11y-missing-content -->
    <h2 id="lennyFace" class="text-xl text-white text-center w-96" ></h2>

    <h1 class="text-4xl font-mono text-center pb-2 pt-1">! Loading !</h1>

    <div id="loadingBarBackground" class="h-6 w-96 bg-slate-700 rounded-md">
        <div id="loadingBar" class="h-full w-0 z-30 rounded-md"></div>
    </div>
</div>

<div id="contentHolder" class="w-full h-full bg-slate-900 opacity-0">
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <header class="sticky top-0 bg-transparent w-full h-headerHeight flex flex-row items-center justify-end space-x-12">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <h1 id="accessGranted" class="hidden xl:block font-mono mr-auto text-xl text-green-500 font-semibold cursor-pointer select-none" on:click={function () {console.log('%cUSER SEEMS TO HAVE INTERACTED WITH THE TERMINAL... HOW... ' + '%cSTRANGE' + '%c...', 'color: red; font-family: monospace;', 'font-family: monospace; font-weight: 800; color: green;', 'font-family: monospace; color: red;')}} >ACCESS GRANTED</h1>
        
        <a class="text-3xl font-bold text-transparent bg-clip-text bg-gradientSize bg-gradient-to-r from-cyan-500 to-blue-900 animate-fastScrollingGradient motion-reduce:animate-none motion-reduce:bg-auto" href="/">Home</a>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="text-3xl" href="">More Soon ™️</a>
        <!-- <a class="text-3xl" href="">Projects</a>
        <a class="text-3xl" href="">Something Else</a> -->
    </header>

    <div id="MainContent" class="h-full pt-[4.5rem] pl-0 xl:pl-24">
        <img id="PFP" class="h-44 rounded-lg relative top-[40px]" src="/img/PFP.gif" alt="Vault Boy Being Tired :>">
        
        <div id="OuterStatus" class="rounded-full h-12 w-12 bg-slate-900 z-10 relative flex items-center justify-center">
                <div id="Status" data-status="offline" class="transition-all duration-300 rounded-full w-6 h-6 bg-green-500">
                    <div id="dndBar" class="w-4 h-[4px] bg-red-900 class hidden opacity-0 transition-[opacity] duration-700"></div>
                    <div id="idleCircle" class="w-6 h-6 rounded-full bg-slate-900 class hidden opacity-0 transition-[opacity] duration-1000"></div>
                </div>
        </div>

        <h1 class="text-5xl font-bold">Littlepriceonu</h1>
        <h2 class="text-2xl pt-1">Full Stack <mark id="developerText" class="font-bold text-transparent bg-miniGradientSize animate-straightScrollingGradient bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-900 motion-reduce:animate-none motion-reduce:bg-auto">Web Developer</mark></h2>

        <div id="Socials" class="flex flex-row items-center justify-start space-x-6 pt-5">
            <a target="_blank" href="https://github.com/Littlepriceonu">
                <img class="h-12 select-none" src="/img/github.png" alt="Github Logo">
            </a>

            <a target="_blank" href="https://discord.com/users/526120594929090561">
                <img class="h-12 select-none" src="/img/discord.png" alt="Discord Logo">
            </a>

            <a target="_blank" href="https://steamcommunity.com/id/littlepriceonu/">
                <img class="h-12 select-none" src="/img/steam.png" alt="Steam Logo">
            </a>

            <a target="_blank" href="https://twitter.com/littlepriceonu">
                <img class="h-12 select-none" src="/img/twitter.png" alt="Steam Logo">
            </a>

            <a target="_blank" href="https://www.last.fm/user/littlepriceonu">
                <img class="h-12 select-none" src="/img/lastfm.png" alt="Steam Logo">
            </a>
        </div>

        <div id="ListeningTo" class="relative z-50 flex flex-col items-center justify-start mt-5 3xl:mt-10 w-fit min-w-[85%] md:min-w-[60%] lg:max-w-[45%] lg:min-w-[40.333333%] 2xl:max-w-[30%] 2xl:min-w-[25%] h-fit min-h-[28%] 2xl:min-h-[26%]  bg-gray-800 rounded-md">
            <div class="w-full flex flex-row justify-start items-center"> <h1 id="NowListening" class="font-bold pt-2 w-full text-left pl-3 font-mono" >Loading Module...</h1> 
                <div class="bar w-[3px] h-6 bg-blue-600 mr-1 mt-2"></div>
                <div class="bar w-[3px] h-3 bg-blue-600 mr-1 mt-2"></div>
                <div class="bar w-[3px] h-5 bg-blue-600 mr-2 mt-2"></div>
            </div>
            <div class="flex w-full flex-row mt-4 justify-start items-center pl-6 relative">
                <img id="BlurImage" crossorigin="anonymous" class="top-0 mb-auto h-[8.5rem] blur-lg rounded-md absolute" src="" alt="Loading Album Blur...">
                <img id="AlbumImage" crossorigin="anonymous" class="ml-1.5 mb-auto h-32 rounded-md z-10" src="" alt="Loading Album...">
                <div class="w-full flex flex-col items-center justify-center ml text-xl pl-5 text-center">
                    <h1 id="SongName" class="pr-5 font-bold"> Loading... </h1>
                    <p  id="AlbumName" class="text-sm pt-1 text-gray-400 pr-5">Loading...</p> 
                    <p  id="ArtistName" class="text-sm pt-3 text-gray-400 pb-3 pr-5">Loading...</p>
                </div>
            </div>
        </div>
    </div>
</div>
