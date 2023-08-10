module.exports = (LSApi) => {
    const app = LSApi.expressApp

    require('dotenv').config();
    const secret = process.env.SECRET

    const execSync = require('child_process').execSync

    app.get("/UPGIT", (req, res) => {
        console.log("[UP_GIT] Server Update Requested...")
        if (req.query.SEC == secret) {
            
            console.log("[UP_GIT] Security key confirmed")
    
            execSync("git pull", {
                cwd: LSApi.LSDirectory
            })
    
            console.log("[UP_GIT] Finished Updating!")
    
            res.send("Server Has Updated!")
    
            process.exit(0)
        }
        else {
            res.send("Security Key Invalid...")
        }
    })
}