
// ! WARNING WARNING WARNING !
// USER ACCESSED INTERAL OPERATIONS
// ! MONITORING HAS BEEN ESCALATED TO A LEVEL *2* !

// TODO
//

//#region Misc. Functions

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

fetch("/api/getListeningData").then(data => data.json()).then(data => {

    SongName.innerText = data.recenttracks.track[0].name

    if (data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying) {
        NowListening.innerText = "NOW LISTENING TO..."
    }
    else {
        NowListening.innerText = "RECENTLY LISTENED TO..."
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
