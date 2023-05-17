
// ! WARNING WARNING WARNING !
// USER ACCESSED INTERAL OPERATIONS
// ! MONITORING HAS BEEN ESCALATED TO A LEVEL *2* !

console.log("USER AUTHORIZED. Unknown datascale, attemping to search again")

// TODO
//

//#region Variables

const SONGS = [
    ["iamsuicidal", "https://images.genius.com/28bff45b39ecc8c7b6f26bef075d3600.500x500x1.jpg"],
    ["COCKNBALLTORTURE", "https://images.genius.com/d11ccddb4dbc5d7964e54102cbfe5525.1000x1000x1.png"],
    ["B*******E (feat. Lil D****e)", "https://cdns-images.dzcdn.net/images/cover/d4de137520fee181a4d3d89e453290a5/500x500.jpg"],
    ["warm rain", "https://i.scdn.co/image/ab67616d0000b2735b3e06096b1604016b729a93"],
    ["when the world end", "https://i1.sndcdn.com/artworks-0xZLnKADQJHhFEoI-06nAKw-t500x500.jpg"],
    ["RUN", "https://i1.sndcdn.com/artworks-Mbwvi7htzOpNHV7o-kixKIw-t500x500.jpg"],
    ["Hall of Fame (feat. Lake Kyle & Lil D****e)", "https://i.scdn.co/image/ab67616d00001e023f3a016617a325b1dfc4dd5d"],
    ["frick suckaz", "/fricksuckaz.jpg"],
    ["stardust", "/stardust.jpg"],
    ["No Hook, Pt. 2", "https://i.scdn.co/image/ab67616d00001e02d3800d40e3f17986fd0a4f9f"]
]

//#endregion

//#region Misc. Functions

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function checkSongNameWithCover(name, data) {
    SONGS.forEach(cover => {
        if (name == cover[0]) {
            data.recenttracks.track[0].image[2]["#text"] = cover[1]
            return
        }
    })
}

//#endregion

//#region ACCESS GRANTED

const accessGranted = document.getElementById("accessGranted")
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

//#region Listening To..

const colorThief = new ColorThief()
const AlbumImage = document.getElementById("AlbumImage")
const SongName = document.getElementById("SongName")
const AlbumName = document.getElementById("AlbumName")
const ArtistName = document.getElementById("ArtistName")
const NowListening = document.getElementById("NowListening")
const ListeningTo = document.getElementById("ListeningTo")
const Bars = Array.from(document.getElementsByClassName("bar"))

fetch("/api/getListeningData").then(data => data.json()).then(data => {

    SongName.innerText = data.recenttracks.track[0].name

    if (data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying) {
        NowListening.innerText = "NOW LISTENING TO..."
        Bars.forEach(el => {
            el.style.height = getRandomInt(1,24).toString() + "px"
            setInterval(()=>{
                el.style.height = getRandomInt(1,24).toString() + "px"
            }, 700)
        })
    }
    else {
        NowListening.innerText = "RECENTLY LISTENED TO..."
        Bars.forEach(el => {
            el.remove()
        })
    }

    checkSongNameWithCover(SongName.innerText, data)

    AlbumName.innerText = data.recenttracks.track[0].album["#text"]
    ArtistName.innerText = data.recenttracks.track[0].artist["#text"]
    AlbumImage.src = data.recenttracks.track[0].image[2]["#text"]

    if (AlbumImage.complete) {
        var avg = colorThief.getColor(AlbumImage)
        var color = 'rgb('+avg[0].toString()+' '+avg[1].toString()+ ' '+avg[2].toString() + ')'
        var filter = "drop-shadow(0px 0px 10px "+ color+ ")"
    
        AlbumImage.style.filter = filter
        SongName.style.color = color
    } else {
        AlbumImage.addEventListener('load', function() {
            var avg = colorThief.getColor(AlbumImage)
            var color = 'rgb('+avg[0].toString()+' '+avg[1].toString()+ ' '+avg[2].toString() + ')'
            var filter = "drop-shadow(0px 0px 10px "+ color+ ")"
        
            AlbumImage.style.filter = filter
            SongName.style.color = color
        });
    }
})

//#endregion
