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

app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')))

app.listen(port, () => {
    console.log(`Littlepriceonu.com listening at port 3000`)
})