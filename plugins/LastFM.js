module.exports = (LSApi) => {
    const app = LSApi.expressApp

    const fetch = require("node-fetch")

    require('dotenv').config();
    const LASTFM_KEY = process.env.LASTFM_KEY

    var payload = {
        'method': 'user.getRecentTracks',
        'user': 'littlepriceonu',
        'limit': '1'
    }
    
    // Request = time in milliseconds since last request
    // Response = response of last request
    // Debounce = time in seconds to wait unil the server is allowed to make another request
    var lastFMRequest = 0
    var lastFMResponse = ""
    const lastFMDebounce = 2
    
    // rate limiting when >1 request : second
    // so I made the timeout before an update 5 secs just in case :shrug:
    function LastFMFetch(payload) {
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
                }).then(data => data.text()).then(data => {
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

    app.get("/api/getListeningData", (_req, res) => {
        LastFMFetch(payload).then(data => {
            res.type('json')
            res.send(data)
        })
    })
    
}