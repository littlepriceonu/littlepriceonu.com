// ! WARNING WARNING WARNING !
// USER ACCESSED INTERAL OPERATIONS
// ! MONITORING HAS BEEN ESCALATED TO A LEVEL *2* !
console.log("%cUSER AUTHORIZED. ! Y-Yo, this dude doesn't have permissions! how did you get in? !", "color: red;");
//#endregion
//#region Variables
const SONGS = {
    "iamsuicidal": "https://images.genius.com/28bff45b39ecc8c7b6f26bef075d3600.500x500x1.jpg",
    "COCKNBALLTORTURE": "https://images.genius.com/d11ccddb4dbc5d7964e54102cbfe5525.1000x1000x1.png",
    "B*******E (feat. Lil D****e)": "https://cdns-images.dzcdn.net/images/cover/d4de137520fee181a4d3d89e453290a5/500x500.jpg",
    "warm rain": "https://i.scdn.co/image/ab67616d0000b2735b3e06096b1604016b729a93",
    "when the world end": "https://i1.sndcdn.com/artworks-0xZLnKADQJHhFEoI-06nAKw-t500x500.jpg",
    "RUN": "https://i1.sndcdn.com/artworks-Mbwvi7htzOpNHV7o-kixKIw-t500x500.jpg",
    "Hall of Fame (feat. Lake Kyle & Lil D****e)": "https://i.scdn.co/image/ab67616d00001e023f3a016617a325b1dfc4dd5d",
    "frick suckaz": "/fricksuckaz.jpg",
    "stardust": "/stardust.jpg",
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
};
const ALBUMS = {
    "SUPER DARK VR": "https://i1.sndcdn.com/artworks-000475938783-ej4tvp-t500x500.jpg",
    "WE ARE BEHIND AN OBJECT (a spider gang thing)": "https://images.genius.com/80460f1ef4675f4231c9f80932b04ef6.1000x1000x1.png"
};
const COLORS = {
    online: "rgb(67, 181, 129)",
    dnd: "rgb(244, 70, 72)",
    idle: "rgb(248, 166, 25)",
    offline: "rgb(115, 126, 141)",
};
var LOADING_PROGRESS = {
    LastFMIntergration: false,
    DiscordIntergration: false,
};
const LENNYS = [
    "<mark style='background-color:transparent; color:blue;'>◑</mark>.<mark style='background-color:transparent; color:blue;'>◑</mark>",
    "<mark style='background-color:transparent; color:saddlebrown;'>ʕ•́ᴥ•̀ʔっ</mark><mark style='background-color:transparent; color:red;'>♡</mark>",
    "<mark style='background-color:transparent; color:red;'>( ◥◣_◢◤ )</mark>",
    "<mark style='background-color:transparent; color:blue;'>（◞‸◟）</mark>",
    "<mark style='background-color:transparent; color:green;'>(•‿•)</mark>",
    "<mark style='background-color:transparent; color:yellow;'>(◑‿◐)</mark>",
    "<mark style='background-color:transparent; color:green;'>┗(^o^　)┓</mark>三"
];
//#endregion
//#region Misc. Functions
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInterger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function checkSongNameWithCover(name, data) {
    if (SONGS[name]) {
        data.recenttracks.track[0].image[2]["#text"] = SONGS[name];
    }
}
function checkAlbumNameWithCover(name, data) {
    if (ALBUMS[name]) {
        data.recenttracks.track[0].image[2]["#text"] = ALBUMS[name];
    }
}
function getDiscordData() {
    return new Promise(res => {
        fetch("https://api.lanyard.rest/v1/users/526120594929090561").then(body => body.json()).then(data => {
            if (data.success) {
                res(data);
            }
            else {
                throw Error("Lanyard API had and error grabbing Discord data");
            }
        });
    });
}
//#endregion
//#region Loading Screen
const loadingScreen = document.getElementById("loadingScreen");
const contentHolder = document.getElementById("contentHolder");
const lennyFace = document.getElementById("lennyFace");
const loadingBarBackground = document.getElementById("loadingBarBackground");
const loadingBar = document.getElementById("loadingBar");
lennyFace.innerHTML = LENNYS[getRandomInterger(0, LENNYS.length)];
const PROGRESS_DEFAULT = Object.keys(LOADING_PROGRESS).length + 1;
var loadingInterval = setInterval(() => {
    // WARNING code ahead is very odd, but it works
    // heres how it works, the Progress variable is the length of all the items in the "LOADING_PROGRESS" variable plus one, I check to see how many of the entries in the LOADING_PROGRESS is complete and minus 1 from
    // progress for each that is complete
    // then I check if the progress is equal to the value it was at that start (length of LOADING_PROGRESS + 1), if it is then we haven't loaded anything yet so the bar stays at 0px, if its changed then I divide the
    // i make the length of the bar to the length of the background bar divived by the Progress variable (i.e. if Progress was 3 and one thing was loaded, progress would become 2, so the bar would be background / 2 pixels)
    // long) if progress is 1, meaning that all of the entires are loaded, I fade out the loading screen and fade in all of the actual content on the page
    let Progress = PROGRESS_DEFAULT;
    Object.entries(LOADING_PROGRESS).forEach(isFinished => {
        if (isFinished[1]) {
            Progress -= 1;
        }
    });
    // if the progress is the same as the length (so no progress has been made)
    if (Progress == PROGRESS_DEFAULT) {
        loadingBar.style.width = "0px";
    }
    // make loadingBar's width the background's size / by the amount of progress we've made (i.e. if we had made it half way through (progress = 2) and the background was 50px, the bar would be 25px (half of 50px))
    else {
        loadingBar.style.width = (loadingBarBackground.clientWidth / Progress).toString() + "px";
    }
    // if the progress is 1 (so all of the modules have finished loading)
    if (Progress == 1) {
        setTimeout(() => {
            // clear loading screen so you can actually hover over and click stuff
            loadingScreen.remove();
        }, 600);
        loadingScreen.style.opacity = "0";
        contentHolder.style.opacity = "1";
        // no need to update
        clearInterval(loadingInterval);
    }
}, 100);
//#endregion
//#region Status
var Lanyard;
function SendMessageToLanyard(OP, data) {
    if (Lanyard.readyState != Lanyard.OPEN)
        return;
    Lanyard.send(JSON.stringify({
        op: OP,
        d: data,
    }));
}
var HeartbeatInterval;
const USER_ID = "526120594929090561";
const OPCodeHandlers = {
    1: function (data) {
        HeartbeatInterval = setInterval(() => {
            SendMessageToLanyard(3, {});
        }, data.d.heartbeat_interval);
        SendMessageToLanyard(2, {
            subscribe_to_id: USER_ID,
        });
    },
    0: function (data) {
        HandleStatus(data.d);
    },
};
const OuterStatus = document.getElementById("OuterStatus");
const Status = document.getElementById("Status");
const PFP = document.getElementById("PFP");
function HandleStatus(data) {
    const discordData = data;
    // Sets the color for the current status, effects status circle and drop shadow
    OuterStatus.style.setProperty("--status-color", COLORS[discordData.discord_status]);
    // Sets the status on the Circle so it can be used in css selectors
    Status.setAttribute("data-status", discordData.discord_status);
    if (!LOADING_PROGRESS["DiscordIntergration"])
        LOADING_PROGRESS["DiscordIntergration"] = true;
}
function SetupLanyard() {
    OuterStatus.style.top = "5px";
    // 7 is just a random magic number that I divide the width by to get it in a place I like lmao
    OuterStatus.style.left = (PFP.clientWidth - PFP.clientWidth / 7).toString() + "px";
    Lanyard = new WebSocket("wss://api.lanyard.rest/socket");
    Lanyard.onopen = () => {
        console.log("[LANYARD] LANYARD CONNECTION ACTIVE... AWAITING DATA...");
    };
    Lanyard.onmessage = (data) => {
        data = JSON.parse(data.data);
        OPCodeHandlers[data.op](data);
    };
}
if (PFP.complete) {
    SetupLanyard();
}
else {
    PFP.addEventListener("load", () => {
        SetupLanyard();
    });
}
//#endregion
//#region ACCESS GRANTED
const accessGranted = document.getElementById("accessGranted");
const accessGrantedDefault = accessGranted.innerText;
var accessGrantedDots = ".";
accessGranted.innerText = accessGrantedDefault + accessGrantedDots;
setInterval(() => {
    if (accessGrantedDots.length == 3) {
        accessGrantedDots = ".";
    }
    else {
        accessGrantedDots += ".";
    }
    accessGranted.innerText = accessGrantedDefault + accessGrantedDots;
}, 1000);
//#endregion
//#region Listening To...
const Vibrant = window.Vibrant;
const AlbumImage = document.getElementById("AlbumImage");
const BlurImage = document.getElementById("BlurImage");
const SongName = document.getElementById("SongName");
const AlbumName = document.getElementById("AlbumName");
const ArtistName = document.getElementById("ArtistName");
const NowListening = document.getElementById("NowListening");
const Bars = Array.from(document.getElementsByClassName("bar"));
var lastTrack;
var barInterval = [];
var lastListeningStatus;
function HandleFMData(data) {
    //  me explaining check so my brain doesn't shut down 🥲
    //                                 @attr exists      AND       @attr has the "nowplaying"              AND  lastListeningStatus was true OR            @attr doesn't exist         AND  lastListeningStatus was false
    //  console.log((data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying && lastListeningStatus == 'true') ||  (!data.recenttracks.track[0]["@attr"] && lastListeningStatus == "false"))
    if ((lastTrack == data.recenttracks.track[0].name) && (data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying && lastListeningStatus == 'true') || (!data.recenttracks.track[0]["@attr"] && lastListeningStatus == "false"))
        return;
    lastTrack = data.recenttracks.track[0].name;
    // Random stuff for Goonies/Boonies to make it look better lmao
    if (data.recenttracks.track[0].name == "Goonies/Boonies (Prod. lil Judas)") {
        data.recenttracks.track[0].album["#text"] = "Goonies/Boonies (Prod. lil Judas) - Single";
        data.recenttracks.track[0].name = "Goonies/Boonies";
    }
    SongName.innerText = data.recenttracks.track[0].name;
    AlbumName.innerText = data.recenttracks.track[0].album["#text"];
    if (data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying) {
        lastListeningStatus = data.recenttracks.track[0]["@attr"].nowplaying;
        NowListening.innerText = "NOW LISTENING TO...";
        Bars.forEach(el => {
            el.style.display = "block";
            if (barInterval.length < 3) {
                el.style.height = getRandomNumber(1, 24).toString() + "px";
                barInterval.push(setInterval(() => {
                    el.style.height = getRandomNumber(1, 24).toString() + "px";
                }, 700));
            }
        });
    }
    else {
        lastListeningStatus = "false";
        NowListening.innerText = "RECENTLY LISTENED TO...";
        barInterval.forEach(interval => {
            clearInterval(interval);
        });
        barInterval = [];
        Bars.forEach(el => {
            el.style.display = "none";
        });
    }
    checkSongNameWithCover(SongName.innerText, data);
    checkAlbumNameWithCover(AlbumName.innerText, data);
    ArtistName.innerText = data.recenttracks.track[0].artist["#text"];
    AlbumImage.src = data.recenttracks.track[0].image[2]["#text"];
    BlurImage.src = data.recenttracks.track[0].image[2]["#text"];
    if (AlbumImage.complete) {
        Vibrant.from(AlbumImage.src).quality(1).clearFilters().getPalette().then((palette) => {
            var rgb = palette.Vibrant.rgb;
            var color = 'rgb(' + rgb[0].toString() + ' ' + rgb[1].toString() + ' ' + rgb[2].toString() + ')';
            SongName.style.color = color;
            LOADING_PROGRESS["LastFMIntergration"] = true;
        });
    }
    else {
        AlbumImage.addEventListener('load', function () {
            Vibrant.from(AlbumImage.src).quality(1).clearFilters().getPalette().then((palette) => {
                var rgb = palette.Vibrant.rgb;
                var color = 'rgb(' + rgb[0].toString() + ' ' + rgb[1].toString() + ' ' + rgb[2].toString() + ')';
                SongName.style.color = color;
                LOADING_PROGRESS["LastFMIntergration"] = true;
            });
        });
    }
}
fetch("/api/getListeningData").then(data => data.json()).then((data) => {
    HandleFMData(data);
});
setInterval(() => {
    fetch("/api/getListeningData").then(data => data.json()).then((data) => {
        HandleFMData(data);
    });
}, 2500);
//#endregion
//#region Home Positioning
const MainContent = document.getElementById("MainContent");
var fullHeight = 0;
Array.from(MainContent.children).forEach(el => {
    fullHeight += el.getBoundingClientRect().height;
});
//! please lord help me fix this stupid positioning bug 
// when you open the page and then open dev tools then close it it'll be different for sum reason
// holy shit I fixed it
// I actually fixed it
MainContent.style.paddingTop = (innerHeight - fullHeight - 150).toString() + "px";
addEventListener("resize", () => {
    MainContent.style.paddingTop = (innerHeight - fullHeight - 150).toString() + "px";
});
export {};
//#endregion
//#region Rotating Module
// yea fuck that
// my brain doesn't have enough capacity to understand whats happening 🥲
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
//# sourceMappingURL=index.js.map