
// ! WARNING WARNING WARNING!
// FALSE 404 BYPASSED
// USER HAS BREACHED SERVER AND IS BROWSING SERVER FILES
// FAILURE TO TERMINATE CONNECTION WILL LEAD TO BREACH OF CONTRACT
// ITS ALL UP TO YOU NOW. DO YOUR JOB
// ! MONITORING HAS BEEN ESCALATED TO A LEVEL *3* !

//#region Express imports
const express = require('express')
const favicon = require('serve-favicon')
const app = express()
//#endregion

//#region Misc. imports
const path = require('path')
const util = require("node:util")
const exec_ = require('child_process').exec
const exec = util.promisify(exec_);
const fs = require('fs');
require('dotenv').config();
//#endregion


// MAIN PORT ASSIGNED
const port = 3000

// DATA DETECTED UNDER PROCESS... MANAGING...
const secret = process.env.SECRET
const LASTFM_KEY = process.env.LASTFM_KEY
// DATA MANAGED AND ASSIGNED

var options = {
    root: path.join(__dirname)
};

//#region Functions

function HandlePostDelivering(err) {
    if (err) {
        console.warn("Error occured during file delivery!")
        console.log(err)
    }
}

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
const lastFMDebounce = 5

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
    
    return new Promise((resolve, reject) => {
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

//#endregion

//#region Network Functions

app.get("/senddata", async (req, res) => {
    console.log("Data Append Requested...")
    if (req.query.SEC == secret && req.query.u) {
        console.log("SEC confirmed")
        console.log("Data Received: " + req.query.u)
        try {
            fs.appendFileSync(`${options.root}/data.txt`, req.query.u+"\n");
            console.log("Data Save Succesful!")
            res.send("SAVED!")
        }
        catch (err) {
            console.log("Error occured during file write attempt!", err)
            res.send("ERROR!")
        }
    }
    else {
        res.send("SEC Returned False Or No U Queried")
    }
})

app.get("/UPGIT", async (req, res) => {
    console.log("UP Git requested")
    if (req.query.SEC == secret) {
        console.log("SEC confirmed")
        await exec("git pull", {
            cwd: "/home/ec2-user/site/littlepriceonu.com/"
        } )
        console.log("Pull Finished!")
        res.send("Git Pulled!")
        process.exit(0)
    }
    else {
        res.send("SEC Returned False")
    }
})

app.get("/api/getListeningData", (req, res) => {
    LastFMFetch(payload).then(data => {
        res.type('json')
        res.send(data)
    })
})

//#endregion

// #region File Delivery

var FILES = [
    // Pages
    ["", "/src/home.html"],

    // Other Files
    ["index.css", "/dist/output.css"],

    ["favicon.ico", "/favicon/favicon.ico"],
]

const FOLDERS = {
    "/img": ["png", "jpg"],
    "/img/AlbumCovers": ["png", "jpg"],
    "/dist/scripts": ["js", "map"],
}

Object.entries(FOLDERS).forEach(folder => {
    fs.readdirSync(options.root + folder[0]).forEach(file=>{

        const endings = file.split(".")
        const fileEnding = endings[endings.length-1]

        if (folder[1].find((ending) => {
            if (ending == fileEnding) {
                return true
            }
        })) {
            FILES.push([file, "" + folder[0] + "/" + file])
        }
    })
})

FILES.forEach((file) => {
    let networkName = file[0]
    let localName = file[1]

    app.get('/'+networkName, (req, res) => {
        res.sendFile(localName, options, HandlePostDelivering)
    })
})

//#endregion

app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')))

app.listen(port, () => {
    console.log(`Littlepriceonu.com listening at port 3000`)
})