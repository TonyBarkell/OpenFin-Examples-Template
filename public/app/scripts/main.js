

async function minimiseWindow(){
    const finWindow = await fin.desktop.Window.getCurrent();
    return await finWindow.minimize();
};

async function restoreWindow(){
    const finWindow = await fin.desktop.Window.getCurrent();
    return await finWindow.restore();
};

async function closeWindow(){
    const finWindow = await fin.desktop.Window.getCurrent();
    return await finWindow.close();
};

async function maximiseWindow(){
    const finWindow = await fin.desktop.Window.getCurrent();
    return await finWindow.maximize();
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof fin != 'undefined') {
	    fin.desktop.main(onMain);
    } else {
        ofVersion.innerText = 'OpenFin is not available';
    }
});

function openDevTools(){
    const app = fin.desktop.Application.getCurrent();
    fin.desktop.System.showDeveloperTools(app.uuid, app.uuid);
};

async function setTrayIcon() {
    const iconUrl = "favicon.ico";
    const app = await fin.Application.getCurrent();
    return await app.setTrayIcon(iconUrl);
};

function openBrowser(){
    fin.desktop.System.launchExternalProcess({ 
        path: `http://www.google.com` 
    }, function(){}, function(err){console.log(err)}); 
};

//Once the DOM has loaded and the OpenFin API is ready
function onMain() {
    fin.System.getVersion()
    .then(version => {
        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = version;	
    }).catch(err => {
        console.log("Error Retrieving Runtime version: " + err);
    });
    setTrayIcon()
    .then(
        clickInfo => console.log(clickInfo)).catch(err => console.log(err)
    );
    buildContent();
};



