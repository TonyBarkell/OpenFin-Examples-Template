
async function buildContent(){
    sections = new URLSearchParams(window.location.search).get('sections');

    const map = {
        1: {url: "overview", title: "overview", lastThing:"overview"},
        2: {url: "defaultBehavior", title: "Default Acnchour Tag Behaviour", lastThing:""},
        3: {url: "openUrlWithDefaultBrowserOUB", title: "Open URLs with the default browser using openUrlWithBrowser()", lastThing:"defaultBrowserOUB"},
        4: {url: "openUrlWithDefaultBrowserLEP", title: "Open URLs with the default browser using launchExternalProcess", lastThing:"defaultBrowserLEP"}
    };

   if( sections ){
       console.log(sections);
        sections.split(';').forEach(async section => {
            console.log(section);
            const something = map[section]
            await buildSectionFromFile("./app/sections/" + something.url + ".html", something.title, something.url);
        });
       /*
        sections.forEach(section=>{

        });
        */
   }else{
    await buildSectionFromFile("./app/sections/overview.html", "Overview", "overview");
    await buildSectionFromFile("./app/sections/defaultBehavior.html", "Default Anchour Tag Behaviour", "defaultBehaviour");
    await buildSectionFromFile("./app/sections/openUrlWithDefaultBrowserOUB.html", "Open URLs with the default browser using openUrlWithBrowser()", "defaultBrowserOUB");
    await buildSectionFromFile("./app/sections/openUrlWithDefaultBrowserLEP.html", "Open URLs with the default browser using launchExternalProcess", "defaultBrowserLEP");
   }
};