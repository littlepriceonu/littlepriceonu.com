const express = require('express')
const favicon = require('serve-favicon')
const app = express()
const path = require('path')
const port = 3000

var options = {
    root: path.join(__dirname)
};

app.get('/', (req, res) => { 
    res.sendFile("src/home.html", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("home.html delivered")
        }
    })
})

app.get('/about', (req, res) => {
    res.sendFile("src/about/about.html", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("about.html delivered")
        }
    })
})

app.get('/projects', (req, res) => {
    res.sendFile("src/projects/projects.html", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("projects.html delivered")
        }
    })
})

app.get('/snuke', (req, res) => {
    res.sendFile("snuke/index.html", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("snuke/index.html delivered")
        }
    })
})


app.get('/index.css', (req, res) => {
    res.sendFile("/dist/output.css", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("index.css delivered")
        }
    })
})

app.get('/snuke.js', (req, res) => {
    res.sendFile("snuke/index.js", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("index.css delivered")
        }
    })
})

app.get('/discord.png', (req, res) => {
    res.sendFile("/img/discord.png", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("discord.png delivered")
        }
    })
})

app.get('/email.png', (req, res) => {
    res.sendFile("/img/email.png", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("email.png delivered")
        }
    })
})

app.get('/github.png', (req, res) => {
    res.sendFile("/img/github.png", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("github.png delivered")
        }
    })
})

app.get('/PFP.gif', (req, res) => {
    res.sendFile("/img/PFP.gif", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("PFP.gif delivered")
        }
    })
})

app.get('/Snuke.png', (req, res) => {
    res.sendFile("/img/Snuke.png", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("Snuke.png delivered")
        }
    })
})

app.get('/steam.png', (req, res) => {
    res.sendFile("/img/steam.png", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("steam.png delivered")
        }
    })
})

app.get('/twitter.png', (req, res) => {
    res.sendFile("/img/twitter.png", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("twitter.png delivered")
        }
    })
})

app.get('/web.png', (req, res) => {
    res.sendFile("/img/web.png", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("web.png delivered")
        }
    })
})

app.get('/settings.png', (req, res) => {
    res.sendFile("/img/settings.png", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("settings.png delivered")
        }
    })
})

app.get('/favico.ico', (req, res) => {
    res.sendFile("/favicon/favico.ico", options, function(err) {
        if (err) {
            warn("Error Occured!")
        }
        else {
            console.log("favico.ico delivered")
        }
    })
})

app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')))

app.listen(port, () => {
    console.log(`Littlepriceonu.com listening at port 3000`)
})