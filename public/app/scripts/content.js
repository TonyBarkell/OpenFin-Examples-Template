
async function buildContent(){
    await buildSectionFromFile("./app/sections/overview.html", "Overview", "overview");
    await buildSectionFromFile("./app/sections/openUrlWithDefaultBrowserOUB.html", "Open URLs with the default browser using openUrlWithBrowser()", "defaultBrowserOUB");
    await buildSectionFromFile("./app/sections/openUrlWithDefaultBrowserLEP.html", "Open URLs with the default browser using launchExternalProcess", "defaultBrowserLEP");
};