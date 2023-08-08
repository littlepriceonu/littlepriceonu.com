/** @type {import("@littlepriceonu/littleserver/types/LS.js").Config} */ 
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
    //
        ["", "/dist/index.html"], //
    //
        ["index.css", "/dist/output.css"],  //
        ["favicon.ico", "/favicon/favicon.ico"],
    ],

    directoryHide: ["dist", "src"],

    do404Page: true,

    pathFor404: "/dist/404.html",

    //plugins: [
    //    require("./dist/testPlugin.js")  
    //],

    faviconPath: "./img/favicon.ico",
    
    logSentFiles: false,

    vercelSupport: true,
}