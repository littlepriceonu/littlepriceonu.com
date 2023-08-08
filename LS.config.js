/** @type {import("@littlepriceonu/littleserver/types/LS.d.ts").Config} */ 
module.exports = {
    siteName: "littlepriceonu.com",

    killOpenPort: true,
    port: 3000,

    folders: {
        "/img": ["png", "jpg", "gif"],
        "/img/AlbumCovers": ["png", "jpg"],
        "/dist/scripts": ["js", "map"],
    },

    files: [
        // Pages
        ["", "/src/index.html"],

        // Other Files
        ["index.css", "/dist/output.css"],

        ["favicon.ico", "/img/favicon.ico"],
    ],

    directoryHide: ["dist", "src"],

    do404Page: true,

    pathFor404: "/src/404.html",

    plugins: [
        require("./plugins/LastFM.js"),
        require("./plugins/SpecialStuff.js"),
    ],

    faviconPath: "./img/favicon.ico",

    logSentFiles: false,    

}