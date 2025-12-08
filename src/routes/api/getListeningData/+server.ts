import { LASTFM_KEY } from "$env/static/private";
import type { LastFMData } from "$lib/types/LastFMTypes";
import { json } from "@sveltejs/kit";

const payload = {
    'method': 'user.getRecentTracks',
    'user': 'littlepriceonu',
    'limit': '1'
}

/**
 * Time in MS since last request to Last.FM
 */
var lastFMRequest = 0
/**
 * Response of the last request
 */
var lastFMResponse: LastFMData
/**
 * Time in seconds to wait until the server is allowed to make another request to the Last.FM API.
 */
const lastFMDebounce = 2

// rate limiting when >1 request : second
function LastFMFetch(payload: any, fetch: any): Promise<LastFMData> {
    payload['api_key'] = LASTFM_KEY
    payload['format'] = 'json'

    let params = "?"
    
    Object.entries(payload).forEach(load => {
        let key = load[0]
        let data = load[1]

        params += key + "=" + data + "&" 
    })
    
    return new Promise((resolve, _reject) => {
        if (Date.now() - lastFMRequest > lastFMDebounce * 1000) {
            fetch("https://ws.audioscrobbler.com/2.0/" + params, {
                method: "GET",
                mode: "cors",
            }).then((data: any) => data.json()).then((data: any) => {
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

export async function GET({ fetch }) {
    var data = await LastFMFetch(payload, fetch)
    
    return json(data)
}