var openfinLauncher = require('hadouken-js-adapter');
var portfinder = require('portfinder');
var express = require('express');
var exec = require('child_process').execFile;
var path = require('path');
var app = express();
var target;

app.use(express.static(__dirname + '/public'));

portfinder.getPortPromise().then((port) => {
    target = "http://localhost:" + port;
    app.listen(port, () =>{ 
        console.log("Server started at: " + target);
        openfinLauncher.launch({manifestUrl: target + "/app.json?manifest=" + encodeURI(JSON.stringify(buildManifest()))});
    });
    
}).catch((err) => {
    console.log("Unable to discover a free port: " + err);
    console.log("-- Exiting --");
});

// Express Routes
app.get('/app.json', (req, res) => {
    var manifest = JSON.parse(req.query.manifest);
    console.log("Serving Manifest:");
    console.log(manifest)
    res.send(manifest);
});

app.get('/index.html', (req, res) => {
    index = path.resolve("./public/app/index.html");
    console.log("Serving index.html:");
    console.log(index);
    res.sendFile(index);
});

app.get('/favicon.ico', (req, res) => {
    icon = path.resolve("./public/app/favicon.ico");
    res.sendFile(icon );
});

function buildManifest(){
    manifest = require("./public/app/config/app.json");
    manifest.startup_app.url = target + "/index.html";
    manifest.startup_app.applicationIcon = target + "/favicon";
    manifest.shortcut = target + "/favicon";
    return manifest;
};