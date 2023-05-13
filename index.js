const express = require('express')
const favicon = require('serve-favicon')
const app = express()
const path = require('path')

const util = require("node:util")
const exec_ = require('child_process').exec
const exec = util.promisify(exec_);
const fs = require('fs');

const port = 3000

require('dotenv').config();

// its not really a secret but whatever why not :shrug:
const secret = process.env.SECRET

var options = {
    root: path.join(__dirname)
};

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

app.get('/', (req, res) => { 
    res.sendFile("src/home.html", options, function(err) {
        if (err) {
            console.log("Error Occured!: home.html")
        }
        else {
            console.log("home.html delivered")
        }
    })
})

app.get('/about', (req, res) => {
    res.sendFile("src/about/about.html", options, function(err) {
        if (err) {
            console.log("Error Occured!: about.html")
        }
        else {
            console.log("about.html delivered")
        }
    })
})

app.get('/projects', (req, res) => {
    res.sendFile("src/projects/projects.html", options, function(err) {
        if (err) {
            console.log("Error Occured!: projects.html")
        }
        else {
            console.log("projects.html delivered")
        }
    })
})

// #region files
app.get('/index.css', (req, res) => {
    res.sendFile("/dist/output.css", options, function(err) {
        if (err) {
            console.log("Error Occured!: index.css")
        }
        else {
            console.log("index.css delivered")
        }
    })
})

app.get('/about.js', (req, res) => {
    res.sendFile("/src/about/about.js", options, function(err) {
        if (err) {
            console.log("Error Occured!: about.js")
        }
        else {
            console.log("about.js delivered")
        }
    })
})

app.get('/discord.png', (req, res) => {
    res.sendFile("/img/discord.png", options, function(err) {
        if (err) {
            console.log("Error Occured!: discord.png")
        }
    })
})

app.get('/email.png', (req, res) => {
    res.sendFile("/img/email.png", options, function(err) {
        if (err) {
            console.log("Error Occured!: email.png")
        }
    })
})

app.get('/github.png', (req, res) => {
    res.sendFile("/img/github.png", options, function(err) {
        if (err) {
            console.log("Error Occured!: github.png")
        }
    })
})

app.get('/PFP.gif', (req, res) => {
    res.sendFile("/img/PFP.gif", options, function(err) {
        if (err) {
            console.log("Error Occured!: PFP.gif")
        }
    })
})

app.get('/Snuke.png', (req, res) => {
    res.sendFile("/img/Snuke.png", options, function(err) {
        if (err) {
            console.log("Error Occured!: Snuke.png")
        }
    })
})

app.get('/steam.png', (req, res) => {
    res.sendFile("/img/steam.png", options, function(err) {
        if (err) {
            console.log("Error Occured!: steam.png")
        }
    })
})

app.get('/twitter.png', (req, res) => {
    res.sendFile("/img/twitter.png", options, function(err) {
        if (err) {
            console.log("Error Occured!: twitter.png")
        }
    })
})

app.get('/web.png', (req, res) => {
    res.sendFile("/img/web.png", options, function(err) {
        if (err) {
            console.log("Error Occured!: web.png")
        }
    })
})

app.get('/favico.ico', (req, res) => {
    res.sendFile("/favicon/favico.ico", options, function(err) {
        if (err) {
            console.log("Error Occured!: favico.ico")
        }
    })
})

//#endregion

app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')))

app.listen(port, () => {
    console.log(`Littlepriceonu.com listening at port 3000`)
})