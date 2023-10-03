import { LASTFM_KEY } from "$env/static/private";
import type { LastFMData } from "$lib/types/LastFMTypes";
import { json } from "@sveltejs/kit";

var payload = {
    'method': 'user.getRecentTracks',
    'user': 'littlepriceonu',
    'limit': '1'
}

// Request = time in milliseconds since last request
// Response = response of last request
// Debounce = time in seconds to wait unil the server is allowed to make another request
var lastFMRequest = 0
var lastFMResponse: LastFMData
const lastFMDebounce = 2

// rate limiting when >1 request : second
// so I made the timeout before an update 5 secs just in case :shrug:
function LastFMFetch(payload: any): Promise<LastFMData> {
    payload['api_key'] = LASTFM_KEY
    payload['format'] = 'json'

    let params = "?"
    
    Object.entries(payload).forEach(load => {
        let key = load[0]
        let data = load[1]

        params += key + "=" + data + "&" 
    })
    
    return new Promise((resolve, _reject) => {
        if (FMTimeoutComplete()) {
            fetch("https://ws.audioscrobbler.com/2.0/" + params, {
                method: "GET",
                mode: "cors",
            }).then(data => data.json()).then(data => {
                lastFMResponse = data; 
                lastFMRequest = Date.now();

                resolve(data)
            })
        }
        else {
            resolve(lastFMResponse)
        }
    })
}

function FMTimeoutComplete() {
    if (Date.now() - lastFMRequest > lastFMDebounce * 1000) return true;
    
    return false
}

export async function GET() {
    var data = await LastFMFetch(payload)
    
    return json(data)
}