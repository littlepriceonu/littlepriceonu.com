
// ! WARNING WARNING WARNING !
// USER ACCESSED INTERAL OPERATIONS
// ! MONITORING HAS BEEN ESCALATED TO A LEVEL *2* !

console.log("USER AUTHORIZED. Unknown datascale, attemping to search again")

// TODO
//

//#region Misc. Functions

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

    if (SongName.innerText == "iamsuicidal") {
        data.recenttracks.track[0].image[2]["#text"] = "https://images.genius.com/28bff45b39ecc8c7b6f26bef075d3600.500x500x1.jpg"
    }

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
